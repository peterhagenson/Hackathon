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
    
    dao.getEmployeeById(req.params.employeeID, (err, employee) => {
        if (employee) {
          console.log("GET single employee: " +  req.params.employeeID );
          res.send(employee[0]);
        } else {
          res.statusCode = 404;
          res.end();
        }
    });
});

app.get("/employees/hr/:employeeID", (req, res) => {
    
    dao.getEmployeeByIdHR(req.params.employeeID, (err, employee) => {
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
    console.log(req.method);
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

const port = 5000;
console.log("Server listening on port 5000...");
app.listen(port);