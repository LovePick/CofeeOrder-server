const { v4: uuidv4 } = require("uuid");

class Order {
  constructor(name, coffeeName, total, size) {
    this.id = uuidv4();
    this.name = name;
    this.coffeeName = coffeeName;
    this.total = total;
    this.size = size;
  }
}
module.exports = Order; // 👈 Export class
