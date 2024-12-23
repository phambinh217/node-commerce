const CustomerRepository = require("@/app/Repositories/CustomerRepository");

class CustomerController {
  constructor() {
    this.customerRepository = new CustomerRepository();
  }

  async index(req, res) {
    const customers = await this.customerRepository.getWhere({});

    return res.json(customers.map(CustomerController.getResource));
  }

  static getResource(customer) {
    return {
      id: customer.getId(),
      name: customer.getName(),
    };
  }
}

module.exports = new CustomerController();
