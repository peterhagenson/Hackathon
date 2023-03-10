let mongodb = require("mongodb");
const url = "mongodb://localhost:27017";

let company;
let employees;
//DB Name: companydb
//collection: employee
mongodb.MongoClient.connect(url, (err, db) => {
    if (err || !db) {
        console.log("Not working bud");
    } else {
        company = db.db("companydb");
        employees = company.collection("employee");
        console.log("Successfully connected to employee in Mongo");
    }
});


module.exports.getAllEmployees = function (callback) {
    employees.find().toArray((err, result) => {
        if (err) {
            callback("Failed to find films", undefined);
        } else {
            callback(undefined, result);
        }
    });
};


let index = 1;
module.exports.getEmployeeByIdNoSalary = (employeeID, callback) => {
    index = parseInt(employeeID);
    employees.find({employee_id: index}).project({Salary: 0}).toArray((err, result) => {
        if (err) {
            callback("Failed to find employee", undefined);
        } else {
            console.log(result);
            callback(undefined, result);
        }
    });
}

module.exports.getEmployeeByIdWithSalary = (employeeID, callback) => {
    index = parseInt(employeeID);
    employees.find({employee_id: index}).toArray((err, result) => {
        if (err) {
            callback("Failed to find employee", undefined);
        } else {
            console.log(result);
            callback(undefined, result);
        }
    });
}

module.exports.getEmployeeByUserPass = (user, pass, callback) => {
    employees.find({Username: user, Password: pass}).toArray((err, result) => {
        if (err) {
            callback("Failed to find employee", undefined);
        } else {
            console.log(result);
            callback(undefined, result);
        }
    });
}

module.exports.updateEmployeeSalary = (employeeID, salary, callback) => {
    let newVals = {$set: {Salary: salary}};
    index = parseInt(employeeID);
    employees.updateOne({employee_id: index}, newVals, (err, result) => {
        if (err) {
            callback("Failed to find employee", undefined);
        } else {
            console.log(result);
            callback(undefined, result);
        }
    });
}

module.exports.getManagers = function(callback) {
    let manager = "Manager";
    employees.find({role: manager}).project({employee_id: 1, name: 1, Reports:1 }).toArray((err, result) => {
        if (err) {
            callback("Failed to find films", undefined);
        } else {
            callback(undefined, result);
        }
    });
}

module.exports.getReports = (reportsArray, callback) => {
    employees.find({employee_id: {$in: reportsArray}}).project({employee_id: 1, name: 1, Reports:1 }).toArray((err, result) => {
        if (err) {
            callback("Failed to find films", undefined);
        } else {
            console.log(result);
            callback(undefined, result);
        }
    });
}