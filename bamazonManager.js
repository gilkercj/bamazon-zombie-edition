var inquirer = require("inquirer");
var mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rich2545",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;

});



function start() {
    inquirer.prompt([
        {
            type: "list",
            message: "Supervisor options...",
            choices: ["View Products", "Low Inventory", "Add to Inventory", "Add new Product"],
            name: "choice"
        }
    ]).then((answer) => {
        switch (answer.choice) {
            case "View Products":
                viewProducts();
                break;
            case "Low Inventory":
                lowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add new Product":
                newProduct();
                break;
        }
    })
}

var viewProducts = function() {
    connection.query(
        `SELECT * FROM products`,
        function (err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {

                console.log(res[i].item_id + " " + res[i].product_name + ": $" + res[i].price + "   ||  Quantity: " + res[i].stock_quantity + "   ||  Sales: " + res[i].product_sales);
            }
            start();
        });
        
}

function lowInventory() {
    connection.query(
        `SELECT * FROM products WHERE stock_quantity < 5`,
        function (err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {

                console.log(res[i].item_id + " " + res[i].product_name + ": $" + res[i].price + "   ||  Quantity: " + res[i].stock_quantity);
            }
            start();
        });
}

function addInventory() {
    inquirer.prompt([
        {
            type: "input",
            message: "which item?",
            name: "choice"
        },
        {
            type: "input",
            message: "how many?",
            name: "amount"
        }
    ]).then((answer) => {
        connection.query(
            `UPDATE products SET stock_quantity = stock_quantity + ${answer.amount} WHERE item_id = ${answer.choice}`,
            function (err, res) {
                if (err) throw err;
                console.log("items added.")
                viewProducts();
            });
            start();
    })
}

function newProduct() {
    inquirer.prompt([
        {
            type: "input",
            message: "which item?",
            name: "name"
        },
        {
            type: "input",
            message: "how many?",
            name: "amount"
        },
        {
            type: "input",
            message: "department?",
            name: "department"
        },
        {
            type: "input",
            message: "price?",
            name: "price"
        }
    ]).then((answer) => {
        connection.query(
            "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('" + answer.name + "','" + answer.department + "'," + answer.price + "," + answer.amount + ")",
            function (err, res) {
                if (err) throw err;
                console.log("Product added.");
                viewProducts();
                start();
            }
        )
    })
}

start();