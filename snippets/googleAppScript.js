/**
 * --------------------------------
 * COMMANDS
 * --------------------------------
 */
const commands = [];

/**
 * Update or create row
 * @param {Sheet} sheet, the sheet where you want to update or add
 * @param {Object} data, the data you want to update or add, eg: {name: "John"}
 * @param {Object} where, the condition to find an existing row, eg: {id: 1}
 */
const UPDATE_OR_CREATE_ROW_COMMAND = ({ sheet, data, where }) => {
  const headers = getSheetHeaders(sheet);
  addNewColumnsIfNeeded(sheet, headers, data);

  const whereColumn = Object.keys(where)?.[0];
  const allColumns = headers.map((header) => header);

  if (whereColumn && !allColumns.includes(whereColumn)) {
    return {
      message: `Column ${whereColumn} not found in headers`,
    };
  }

  const rowIndex = findRowIndex(sheet, whereColumn, where[whereColumn]);

  if (rowIndex !== -1) {
    updateRow(sheet, rowIndex, headers, data);
    return { message: "Row updated successfully" };
  } else {
    createRow(sheet, headers, data);
    return { message: "Row created successfully" };
  }
};
commands.push({
  name: "UPDATE_OR_CREATE_ROW_COMMAND",
  command: UPDATE_OR_CREATE_ROW_COMMAND,
});

/**
 * Get headers from the sheet
 * @param {Sheet} sheet - The sheet object
 * @returns {Array} - Array of headers
 */
const getSheetHeaders = (sheet) => {
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();

  // Nếu sheet không có bất kỳ cột nào hoặc không có bất kỳ hàng dữ liệu nào
  if (lastRow === 0 || lastColumn === 0) {
    return []; // Trả về mảng rỗng nếu sheet trống
  }

  return sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
};

/**
 * Add new columns to the sheet if they don't already exist in the headers
 * @param {Sheet} sheet - The sheet object
 * @param {Array} headers - Array of headers
 * @param {Object} data - Data containing new fields to add as columns
 */
const addNewColumnsIfNeeded = (sheet, headers, data) => {
  const allColumns = headers.map((header) => header);

  for (const key in data) {
    if (!allColumns.includes(key)) {
      const newColumnIndex = headers.length + 1;
      sheet.getRange(1, newColumnIndex).setValue(key);
      headers.push(key);
      allColumns.push(key);
    }
  }
};

/**
 * Find the row index based on the where condition
 * @param {Sheet} sheet - The sheet to search in
 * @param {string} whereColumn - The column to search for the condition
 * @param {string} whereValue - The value to search for
 * @returns {number} - The row index if found, -1 otherwise
 */
const findRowIndex = (sheet, whereColumn, whereValue) => {
  if (!whereColumn || !whereValue) return -1;

  const headers = getSheetHeaders(sheet);
  const targetColumnIndex = headers
    .map((header) => header)
    .indexOf(whereColumn);

  if (targetColumnIndex === -1) return -1;

  const range = sheet.getRange(
    2,
    targetColumnIndex + 1,
    sheet.getLastRow() - 1,
    1
  );
  const values = range.getValues();

  for (let i = 0; i < values.length; i++) {
    if (values[i][0] === whereValue) {
      return i + 2; // Row index is 1-based, so adding 2 accounts for header and 0-based index
    }
  }

  return -1;
};

/**
 * Update an existing row with new data
 * @param {Sheet} sheet - The sheet to update the row in
 * @param {number} rowIndex - The row index to update
 * @param {Array} headers - The headers of the sheet
 * @param {Object} data - The new data to update
 */
const updateRow = (sheet, rowIndex, headers, data) => {
  const existingRow = sheet
    .getRange(rowIndex, 1, 1, headers.length)
    .getValues()[0];
  const rowData = arrCombine(headers, data, existingRow);
  sheet.getRange(rowIndex, 1, 1, rowData.length).setValues([rowData]);
};

/**
 * Create a new row with the given data
 * @param {Sheet} sheet - The sheet to add the row to
 * @param {Array} headers - The headers of the sheet
 * @param {Object} data - The data to create a new row
 */
const createRow = (sheet, headers, data) => {
  const rowData = arrCombine(headers, data);
  sheet.appendRow(rowData);
};

/**
 * List rows from the sheet that match the given conditions with pagination (limit and offset)
 * @param {Sheet} sheet - The sheet you want to get data from
 * @param {Object} where - The conditions to filter rows, e.g., {id: 1}
 * @param {number} limit - Maximum number of rows to return (optional)
 * @param {number} offset - Number of rows to skip from the start (optional)
 * @returns {Object} - JSON response with matching rows or a message
 */
const LIST_ROW_COMMAND = ({ sheet, where, limit, offset }) => {
  const headers = getSheetHeaders(sheet);
  const rows = getSheetData(sheet);

  if (!headers || rows.length === 0) {
    return { message: "No data available in the sheet." };
  }

  // Lọc các hàng dựa trên điều kiện
  const matchingRows = filterRowsByCondition(headers, rows, where);

  // Thiết lập giá trị mặc định cho limit và offset
  const finalOffset = offset ? Math.max(0, offset) : 0; // Nếu không có offset, mặc định là 0
  const finalLimit = limit ? Math.min(matchingRows.length, limit) : matchingRows.length; // Nếu không có limit, lấy tất cả

  // Áp dụng offset và limit
  const paginatedRows = matchingRows.slice(finalOffset, finalOffset + finalLimit);

  if (paginatedRows.length > 0) {
    return {
      message: "Rows found",
      data: paginatedRows,
    };
  } else {
    return { message: "No matching rows found" };
  }
};

commands.push({
  name: "LIST_ROW_COMMAND",
  command: LIST_ROW_COMMAND,
});

/**
 * Find a single row based on the given condition
 * @param {Sheet} sheet - The sheet to search in
 * @param {Object} where - The condition to find the row, e.g., {id: 1}
 * @returns {Object} - JSON response with the matching row or a message
 */
const FIND_ROW_COMMAND = ({ sheet, where }) => {
  const headers = getSheetHeaders(sheet);
  const rows = getSheetData(sheet);

  if (!headers || rows.length === 0) {
    return { message: "No data available in the sheet." };
  }

  const conditionKeys = Object.keys(where);

  for (const row of rows) {
    const rowObject = objectCombine(headers, row);
    if (isRowMatchingConditions(rowObject, conditionKeys, where)) {
      return {
        message: "Row found",
        data: rowObject,
      };
    }
  }

  return { message: "No matching row found" };
};

commands.push({
  name: "FIND_ROW_COMMAND",
  command: FIND_ROW_COMMAND,
});
/**
 * Delete rows from the sheet based on a condition.
 * If the sheet has only one row of data left, clear its content instead of deleting.
 * @param {Sheet} sheet - The sheet to delete rows from.
 * @param {Object} where - The condition to find rows to delete, e.g., {id: 1}.
 * @returns {Object} - JSON response with success or failure message.
 */
const DELETE_ROW_COMMAND = ({ sheet, where }) => {
  const headers = getSheetHeaders(sheet);
  const rows = getSheetData(sheet);

  if (!headers || rows.length === 0) {
    return { message: "No data available in the sheet." };
  }

  const conditionKeys = Object.keys(where);
  const rowsToDelete = [];

  // Find all rows matching the condition
  rows.forEach((row, index) => {
    const rowObject = objectCombine(headers, row);
    if (isRowMatchingConditions(rowObject, conditionKeys, where)) {
      rowsToDelete.push(index + 2); // Adjust for 0-based index and header row
    }
  });

  if (rowsToDelete.length === 0) {
    return { message: "No matching rows found to delete" };
  }

  // Special case: Only one row of data left after deletion
  const totalDataRows = rows.length;
  const remainingRows = totalDataRows - rowsToDelete.length;
  const shouldClearContentOnLastRow = remainingRows === 0;

  // Delete rows from bottom to top to avoid index shifting
  rowsToDelete.reverse().forEach((rowIndex, index) => {
    if (sheet.getLastRow() > 1) {
      if (shouldClearContentOnLastRow && index === 0) {
        sheet.getRange(rowIndex, 1, 1, headers.length).clearContent();
      } else {
        sheet.deleteRow(rowIndex);
      }
    }
  });

  return {
    message: "Rows deleted successfully",
    deletedRows: rowsToDelete.length,
  };
};

commands.push({
  name: "DELETE_ROW_COMMAND",
  command: DELETE_ROW_COMMAND,
});

/**
 * Get all data rows from the sheet (excluding headers)
 * @param {Sheet} sheet - The sheet object
 * @returns {Array} - Array of data rows
 */
const getSheetData = (sheet) => {
  const numRows = sheet.getLastRow() - 1;
  const numColumns = sheet.getLastColumn();

  if (numRows <= 0) return [];

  return sheet.getRange(2, 1, numRows, numColumns).getValues();
};

/**
 * Filter rows by given conditions
 * @param {Array} headers - Array of headers
 * @param {Array} rows - Array of data rows
 * @param {Object} where - Conditions to filter rows, e.g., {id: 1}
 * @returns {Array} - Array of matching rows
 */
const filterRowsByCondition = (headers, rows, where) => {
  const filteredRows = [];
  const conditionKeys = Object.keys(where);

  for (const row of rows) {
    const rowObject = objectCombine(headers, row);
    if (isRowMatchingConditions(rowObject, conditionKeys, where)) {
      filteredRows.push(rowObject);
    }
  }

  return filteredRows;
};

/**
 * Check if a row matches the given conditions
 * @param {Object} rowObject - The row object created from headers and row data
 * @param {Array} conditionKeys - Keys of conditions
 * @param {Object} where - Conditions to match
 * @returns {boolean} - True if the row matches all conditions, false otherwise
 */
const isRowMatchingConditions = (rowObject, conditionKeys, where) => {
  for (const key of conditionKeys) {
    if (rowObject[key] === undefined || rowObject[key] != where[key]) {
      return false;
    }
  }
  return true;
};

/**
 * Combine headers and row data into an object
 * @param {Array} headers - The sheet headers
 * @param {Array} row - The row data
 * @returns {Object} - An object where keys are headers and values are row data
 */
const objectCombine = (headers, row) => {
  const formattedData = {};

  for (let i = 0; i < headers.length; i++) {
    const column = headers[i];
    formattedData[column] = row[i];
  }

  return formattedData;
};

/**
 * Create an array from headers and data
 * The order of items in the array will be the same as headers
 * @param {Array} headers
 * @param {Object} data
 * @param {Array} existingRow - The existing row data
 * @returns {Array} - The combined array
 */
const arrCombine = (headers, data, existingRow = []) => {
  const formattedData = [];

  for (let i = 0; i < headers.length; i++) {
    const column = headers[i];
    formattedData.push(
      data[column] !== undefined ? data[column] : existingRow[i]
    );
  }

  return formattedData;
};

/**
 * Send a JSON response
 * @param {Object} object
 * @returns {ContentService}
 */
const responseJson = (object) => {
  return ContentService.createTextOutput(JSON.stringify(object)).setMimeType(
    ContentService.MimeType.JSON
  );
};

/**
 * --------------------------------
 * Routing
 * --------------------------------
 */
function doGet(e) {
  return ContentService.createTextOutput("Use POST request to submit data.");
}

function executeCommand(payload, index) {
  const { sheet: sheetTitle, command: commandName, data, where, limit, offset } = payload;

  if (!commandName) {
    return {
      message: `Command ${index}: Missing command param`,
    };
  }

  const command = commands.find((c) => c.name === commandName);

  if (!command) {
    return {
      message: `Command ${index}: Command ${commandName} not found`,
    };
  }

  if (!sheetTitle) {
    return {
      message: `Command ${index}: Missing sheet_title param`,
    };
  }

  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(sheetTitle);

  // Nếu sheet không tồn tại, tạo một sheet mới và sử dụng nó
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetTitle);
  }

  const commandCallback = command.command;

  const result = commandCallback({
    sheet,
    data: data || {},
    where: where || {},
    limit: limit || 0,
    offset: offset || 0,
  });

  return result
}

function doPost(e) {
  const commands = JSON.parse(e.postData.contents) || e.parameter;
  const response = []

  for (let i = 0; i < commands.length; i++) {
    const payload = commands[i]
    const output = executeCommand(payload, i);
    response.push(output)
  }

  return responseJson(response);
}
