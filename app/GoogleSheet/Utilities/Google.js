const gSheetRow = (data) => {
  return {
    values: data.map((item) => ({ userEnteredValue: { stringValue: item } })),
  };
};

const gSheetRows = (rowData) => {
  return [
    {
      startRow: 0,
      startColumn: 0,
      rowData,
    },
  ];
};

const gSheet = ({ title, data }) => {
  return {
    properties: {
      title: title,
    },
    data: data,
  };
};

module.exports = {
  gSheet,
  gSheetRow,
  gSheetRows,
};
