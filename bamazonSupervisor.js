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


});


function start() {
    inquirer.prompt([
        {
            type: "list",
            message: "Supervisor options...",
            choices: ["View Departments", "Add a Department"],
            name: "choice"
        }
    ]).then((answer) => {
        switch (answer.choice) {
            case "View Departments":
                viewDepartments();
                break;
            case "Add a Department":
                addDepartments();
                break;
        }
    })
}





function viewDepartments() {
    connection.query(
        "SELECT departments.department_id, departments.department_name, departments.over_head_cost, products.product_sales, SUM(products.product_sales - departments.over_head_cost) AS total_profit FROM departments INNER JOIN products ON departments.department_name = products.department_name GROUP BY departments.department_name ORDER BY total_profit DESC",
        function (err, res) {
            if (err) throw err;
            console.log("ID   ||  Dept Name   ||  Over Head   ||  Profit");
            console.log("-----------------------------------------------");
            for (var i = 0; i < res.length; i++) {

                console.log(res[i].department_id + "    ||  " + res[i].department_name + "  ||  " + res[i].over_head_cost + "   ||  " + res[i].total_profit);
            }
        }
    )
}

function addDepartments() {
    inquirer.prompt([
        {
            type: "input",
            message: "what Department?",
            name: "name"
        },
        {
            type: "input",
            message: "how much is over head",
            name: "cost"
        }
    ]).then((answer) => {
        connection.query(
            "INSERT INTO departments(department_name, over_head_cost) Values ('" + answer.name + "','" + answer.cost + "')",
            function (err, res) {
                if (err) throw err;
            }
        )
        viewDepartments();
    })
}

start();