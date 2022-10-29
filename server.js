const Order = require("./order.js");
var express = require("express");
var app = express();
const bodyParser = require("body-parser");
const multer = require("multer"); // v1.0.5
const upload = multer(); // for parsing multipart/form-data
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

let orders = {};

app.get("/test", function (req, res, next) {
  let results = { success: true, message: "Hello World!" };
  res.status(200).json(results);
});

app.get("/addSimpleData", function (req, res, next) {
  let order = new Order("name", "coffeeName", 1, "Large");
  orders[order.id] = order;

  res.status(200).json(order);
});

app.post("/new-order", upload.array(), function (req, res) {
  console.log("NEW ORDER");
  console.log(req.body);
  let name = req.body.name;
  let coffeeName = req.body.coffeeName;
  let total = parseFloat(req.body.total);
  let size = req.body.size;

  if (name && coffeeName && total && size) {
    let order = new Order(name, coffeeName, total, size);
    orders[order.id] = order;

    res.status(200).json(order);
  } else {
    res.status(400).json({ success: false, message: "Missing fields" });
  }
});

//UPDATE ORDER
app.put("/orders/:id", upload.array(), function (req, res) {
  const orderId = req.params["id"];
  console.log("UPDATE");
  console.log(req.body);

  let name = req.body.name;
  let coffeeName = req.body.coffeeName;
  let total = parseFloat(req.body.total);
  let size = req.body.size;

  const updateOrder = orders[orderId];
  if (updateOrder) {
    orders[orderId].name = name;
    orders[orderId].coffeeName = coffeeName;
    orders[orderId].total = total;
    orders[orderId].size = size;

    res.status(200).json(updateOrder);
  } else {
    res.status(400).json({ success: false, message: "Wrong ID" });
  }
});

app.delete("/orders/:id", function (req, res) {
  const orderId = req.params["id"];
  console.log(req.body);

  const updateOrder = orders[orderId];
  if (updateOrder) {
    delete orders[orderId];
    res.status(200).json(updateOrder);
  } else {
    res.status(400).json({ success: false, message: "Wrong ID" });
  }
});

//GET ALL ORDER
app.get("/orders", function (req, res) {
  res.json(orders);
});

//CLEAR ALL DATA
app.get("/clear-orders", function (req, res) {
  orders = {};
  res.status(200).json({ message: "Order have been cleared!" });
});

app.listen(3334, function () {
  console.log("Web server listening on port 3334");
});
