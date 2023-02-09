const express = require("express");
const cors = require('cors');
const dao = require("./mongo_func");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/employees", (req, res) => {
    dao.getAllEmployees((err, employees) => {
        if(employees) {
            console.log(employees);
            res.send(employees);
        } else {
            res.statusCode = 500;
            res.end();
        }
    });
});

app.get("/employees/:employeeID", (req, res) => {
    console.log(req.query.role);
    console.log(req.query.manager);  
    if (req.query.role === "Employee") {
        dao.getEmployeeByIdNoSalary(req.params.employeeID, (err, employee) => {
            if (employee) {
              console.log("GET single employee: " +  req.params.employeeID );
              res.send(employee[0]);
            } else {
              res.statusCode = 404;
              res.end();
            }
        });
    } else if (req.query.role === "Manager") {
        const arr = [];
        for (let rep of req.query.reports) {
            arr.push(parseInt(rep));
        }
        if (arr.indexOf(parseInt(req.params.employeeID))>=0 && 
                parseInt(req.query.manager) !== req.params.employeeID) {
            console.log("Manager view salary");
            dao.getEmployeeByIdWithSalary(req.params.employeeID, (err, employee) => {
                if (employee) {
                console.log("GET single employee: " +  req.params.employeeID );
                res.send(employee[0]);
                } else {
                res.statusCode = 404;
                res.end();
                }
            });
        } else {
            dao.getEmployeeByIdNoSalary(req.params.employeeID, (err, employee) => {
                if (employee) {
                  console.log("GET single employee: " +  req.params.employeeID );
                  res.send(employee[0]);
                } else {
                  res.statusCode = 404;
                  res.end();
                }
            });
        }
    } else if (req.query.role === "HR") {
        console.log("HR View")
        dao.getEmployeeByIdWithSalary(req.params.employeeID, (err, employee) => {
            if (employee) {
              console.log("GET single employee: " +  req.params.employeeID );
              res.send(employee[0]);
            } else {
              res.statusCode = 404;
              res.end();
            }
        });
    }
});

app.get("/employees/hr/:employeeID", (req, res) => {
    
    dao.getEmployeeByIdWithSalary(req.params.employeeID, (err, employee) => {
        if (employee) {
          console.log("GET single employee: " +  req.params.employeeID );
          res.send(employee[0]);
        } else {
          res.statusCode = 404;
          res.end();
        }
    });
});

app.get("/employees/login/:user/:pass", (req, res) => {
    dao.getEmployeeByUserPass(req.params.user, req.params.pass, (err, employee) => {
        if (employee) {
            if (employee.length == 0) {
                res.send({});
            } else {
                res.send(employee[0]);
            }
         
        } else {
          console.log("Didn't work as intended")
          res.statusCode = 404;
          res.end();
        }
    });
});

app.put("/employees/update/:employeeID", (req, res) => {
    dao.updateEmployeeSalary(req.params.employeeID, parseInt(req.query.salary), (err, employee) => {
        if (employee) {
            res.send("Updated document sucessfully");
         
        } else {
          console.log("Didn't work as intended")
          res.statusCode = 404;
          res.end();
        }
    });
});

const port = 5000;
console.log("Server listening on port 5000...");
app.listen(port);