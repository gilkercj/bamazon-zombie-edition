// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.

const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rich2545",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected on: " + connection.threadId);

});

// First displays all of the items available for sale. Include the ids, names, prices, and stock left of products for sale.

function displayItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {

            console.log(res[i].item_id + " " + res[i].product_name + ": $" + res[i].price + "   ||  Quantity: " + res[i].stock_quantity);
        }
        customerChoice(res)
    });

}

function customerChoice(res) {
    inquirer
        .prompt([
            {
                name: "choice",
                type: "input",
                message: "What item would you like to search for? (use id #)"
            },
        ]).then(function (ansChoice) {
            var itemChoice = ansChoice.choice;
            inquirer.prompt([
                {
                    name: "amount",
                    type: "input",
                    message: "how many?"
                }
            ]).then(function (ansAmount) {
                if (res[itemChoice - 1].stock_quantity > ansAmount.amount) {
                    connection.query(`UPDATE products SET stock_quantity = stock_quantity - ${ansAmount.amount} WHERE item_id = ${itemChoice}`),
                        function (err, result) {
                            if (err) throw err;
                            console.log("items bought.");
                            displayItems();
                        };
                        connection.query(`UPDATE products SET product_sales = product_sales + (price * ${ansAmount.amount}) WHERE item_id = ${itemChoice}`),
                        function (err, result) {
                            if (err) throw err;
                            console.log("sales updated.");
                            displayItems();
                        };
                } else { console.log("too many selected.") }

            })

        })


}


displayItems();
// {
//     name: "userAmount",
//     type: "input",
//     message: "how many?"
// }

// customerChoice();



// if(results[answer.userChoice].stock_quantity > answer.userAmount ){
//     connection.query(
//         `UPDATE products SET stock_quantity = stock_quantity - ${answer.userAmount} WHERE item_id = ${answer.userChoice} AND stock_quantity >= ${answer.userAmount}`,
//         function (err, res) {

//     console.log(`you bought ${answer.userAmount}.`);

// });