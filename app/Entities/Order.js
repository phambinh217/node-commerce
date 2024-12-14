const { v4: uuidv4 } = require("uuid");
const { PAYMENT_STATUS } = require("@/app/Consts/Order");
const { now } = require("@/app/Utilities/Datetime");

class Order {
  constructor(data) {
    this.id = data.id || uuidv4();

    /**
     * Get & set properties
     */
    this.billingName = data.billingName;
    this.billingPhone = data.billingPhone;
    this.billingEmail = data.billingEmail;
    this.lineItems = data.lineItems || [];
    this.billingAddress = data.billingAddress;
    this.orderNumber = data.orderNumber;
    this.customerNote = data.customerNote;
    this.customerId = data.customerId;

    /**
     * Timestamps
     */
    this.createdAt = data.createdAt || now().format("YYYY-MM-DD HH:mm:ss");
    this.updatedAt = data.updatedAt || now().format("YYYY-MM-DD HH:mm:ss");

    /**
     * Payment properties
     */
    this.paymentStatus = data.paymentStatus || PAYMENT_STATUS.UNPAID;
    this.paidAt = data.paidAt;

    /**
     * Shippings
     */
    this.shippingLines = data.shippingLines || [];

    /**
     * Custom fees
     */
    this.feeLines = data.feeLines || [];

    /**
     * Discounts
     */
    this.discountLines = data.discountLines || [];

    /**
     * Total
     */
    this.discount = data.discount || 0;
    this.subtotal = data.subtotal || 0;
    this.total = data.total || 0;
    this.discount = data.discount || 0;

    /**
     * Status
     */
    this.status = data.status;
  }

  static make(data) {
    return new Order(data);
  }

  getId() {
    return this.id;
  }

  getStatus() {
    return this.status;
  }

  setStatus(value) {
    this.status = value;
  }

  getBillingName() {
    return this.billingName;
  }

  setBillingName(value) {
    this.billingName = value;
  }

  getBillingPhone() {
    return this.billingPhone;
  }

  setBillingPhone(value) {
    this.billingPhone = value;
  }

  getBillingEmail() {
    return this.billingEmail;
  }

  setBillingEmail(value) {
    this.billingEmail = value;
  }

  getBillingAddress() {
    return this.billingAddress;
  }

  setBillingAddress(value) {
    this.billingAddress = value;
  }

  getLineItems() {
    return this.lineItems;
  }

  setLineItems(value) {
    this.lineItems = value;
  }

  getShippingLines() {
    return this.shippingLines;
  }

  setShippingLines(value) {
    this.shippingLines = value;
  }

  getCustomerNote() {
    return this.customerNote;
  }

  setCustomerNote(value) {
    this.customerNote = value;
  }

  getCustomerId() {
    return this.customerId;
  }

  setCustomerId(value) {
    this.customerId = value;
  }

  getFeeLines() {
    return this.feeLines;
  }

  setFeeLines(value) {
    this.feeLines = value;
  }

  getDiscountLines() {
    return this.discountLines;
  }

  setDiscountLines(value) {
    this.discountLines = value;
  }

  getDiscount() {
    return this.discount;
  }

  getOrderNumber() {
    return this.orderNumber;
  }

  setOrderNumber(value) {
    this.orderNumber = value;
  }

  getPaymentStatus() {
    return this.paymentStatus;
  }

  setPaymentStatus(value) {
    this.paymentStatus = value;
  }

  getPaidAt() {
    return this.paidAt;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }

  getSubtotal() {
    return this.subtotal;
  }

  getTotal() {
    return this.total;
  }

  calculateTotal() {
    this.lineItems.forEach((item) => item.calculateTotal());
    this.discount = this.discountLines.reduce((acc, item) => acc + item.getDiscount(), 0);

    this.subtotal =
      this.lineItems.reduce((acc, item) => acc + item.getSubtotal(), 0) +
      this.feeLines.reduce((acc, item) => acc + item.getPrice(), 0) +
      this.shippingLines.reduce((acc, item) => acc + item.getPrice(), 0);

    this.total = this.subtotal - this.discount;
  }
}

module.exports = Order;
