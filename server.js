const express = require('express');
const inquirer = require('inquirer');

// Import and require mysql2
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 3001;

//connection with database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'employee_db'
    },
);
db.connect(function (err) {
    if (err) throw err;
    console.log("succesfully Connected with database!");
});

//create list for all activites
const listAll = [
    {
        name: "activity",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View Department",
            "Add Department",
            "View Employee",
            "View Role",
            "Add Role",
            "Add Employee",
            "Edit Employee",
                  ]
    }
]

//inquirer ask question from user for selection activity
let result = () => {
    inquirer.prompt(listAll)
        .then(function (result) {

            if (result.activity === "View Department") {
                viewAllDepartment();
            }
            else if (result.activity === "View Employee") {
                viewAllEmployess();
            }
            else if (result.activity === "Add Employee") {
                addEmployee();
            }
            else if (result.activity === "Edit Employee") {
                EditEmployess();
            }
            else if (result.activity === "View Role") {
                viewAllrole();
            }
             else if (result.activity === "Add Role") {
                addRole();
            }
            else if (result.activity === "Add Department") {
                addDepartment();
            }

        })
}


result()

//view for all department
let viewAllDepartment = () => {
    let query = "SELECT id as dep_id,name as department FROM department";
    db.query(query, function (err, res) {
        if (err) {
            console.log("internal error", err);
            return;

        }
        console.table(res);
        console.log(`you can view all department!`);
        result();
    });
}
//view for all employees
let viewAllEmployess = () => {
    let query = "SELECT emP.id as employeeId, first_name as firstName , last_name as lastName, title as employeeTitle , name AS departmentName, salary FROM employee as emP INNER JOIN role ON emP.role_id = role.id INNER JOIN department as dept ON role.department_id = dept.id ;"
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res)
        console.log(`you can view all emplyees!`);

        result();
    });
}
//view for all role
let viewAllrole = () => {
    let query = "SELECT role .*,department.name  FROM role INNER JOIN department ON department.id = role.department_id";
console.log(query)
    db.query(query, function (err, res) {
        console.log(res)
        if (err) throw err;
        console.table(res);
        console.log(`you can view all emplyee roles!`);
        result();
    });
}


//add emploee in  emplopyee table
let addEmployee = () => {
    db.query("SELECT * FROM role", function (err, res) {
        let roleList = res;
        inquirer
            .prompt([
                {
                    name: "firstName",
                    type: "input",
                    message: "What is the employee's first name"
                },
                {
                    name: "lastName",
                    type: "input",
                    message: "What is the employee last name."
                },
                {
                    name: "role",
                    type: "list",
                    message: "What is the employee's role?",
                    choices: function () {
                        rolesTitle = roleList.map((v, i) => {
                            return v.id + ": " + v.title
                        })

                        return rolesTitle;
                    },

                }
            ])
            .then(function (answer) {
                console.log(answer)

                let query = "INSERT INTO employee SET ?";

                db.query(query,
                    {
                        first_name: answer.firstName,
                        last_name: answer.lastName,
                        role_id: parseInt(answer.role.split(":")[0])

                    }, function (err, res) {
                        if (err) throw err;
                    });

                  console.log(`Added ${answer.firstName} ${answer.lastName} to the database`)
                result();

            });

    })

}

//edit employee
let EditEmployess = () => {
    db.query("SELECT * from employee", function (err, res) {
        let employeelist = res;

        db.query("SELECT * FROM role", function (err, res) {
            let roleList = res;
            inquirer
                .prompt([
                    {
                        name: "first",
                        type: "list",
                        message: "What is the employee name for update?.",
                        choices: function () {

                            employess = employeelist.map((v, i) => {
                                return v.id + ": " + v.first_name
                            })
                            return employess;
                        },
                       
                    },

                    {
                        name: "role",
                        type: "list",
                        message: "What is the title of the employee you want to update?.",
                        choices: function () {
                            rolesTitle = roleList.map((v, i) => {
                                return v.id + ": " + v.title
                            })


                            return rolesTitle;
                        },
                     
                    }
                ]).then(function (answer) {
                    console.log(answer)
                   
                    let emplyeeID = parseInt(answer.first.split(":")[0])
                    let query = "UPDATE employee SET ? WHERE employee.id = " + emplyeeID;
                    let roleId = parseInt(answer.role.split(":")[0]);
                   
                    db.query(query,
                        {
                         role_id: roleId,
                        },

                        function (err, res) {
                            if (err) throw err;
                            console.log(`Updated title to the database`)
                            result();
                        });
                })
        })
    })

}

//add role in role table
let addRole = () => {
     let query2 = "SELECT dept.id,dept.name FROM department as dept";
     db.query(query2, function (err, res) {

        if (err) throw err;

        let departmentList = res;

        let finalData = function () {
            departments = departmentList.map((v, i) => {
                return v.id + ": " + v.name
            })
            return departments;

        }

        let addRolePrompt = [
            {
                name: "role",
                type: "input",
                message: "What is the name of role?."
            },

            {
                name: "salary",
                type: "input",
                message: "What is the salary of the roll?"

            },
            {
                name: "select_department",
                type: "list",
                message: "Which department does the role belong to?",
                choices: finalData()
            }
        ];
        inquirer.prompt(addRolePrompt)
            .then(function (answer) {
                console.log(answer);
                let query = "INSERT INTO role SET ?";
                db.query(query,
                    {
                        title: answer.role,
                        salary: answer.salary,
                        department_id: parseInt(answer.select_department.split(":")[0])

                    }, function (err, res) {
                        if (err) throw err;
                        console.log("New role added to the database!")
                        result();
                    });
                            

            });

    });

}


//add department
let addDepartment = () => {
    inquirer.prompt([
        {
            name: "department",
            type: "input",
            message: "which department would you like to add",
        },
    ])
        .then(function (response) {
            db.query("INSERT INTO department SET ?", {
                name: response.department
            },
                function (err, res) {
                    // throw error 
                    if (err) throw err;

                });
            console.log(`${response.department} departmet added in the department table`)
            result()
        })

}
