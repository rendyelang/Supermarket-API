const router = require("express").Router()
const {employeeSignIn} = require("../controllers/userAuth")
const {addEmployee, getAllEmployees, getEmployeeByRole, editEmployee, deleteEmployee} = require("../controllers/employeeController")
const {empSignupValidationMiddleware, signInValidationMiddleware} = require("../middleware/userAuthAccValidation")
const {isAuthToken} = require("../middleware/verifyToken")
const isAdmin = require("../middleware/isAdmin")
const isEmployeeToken = require("../middleware/isEmployee")
const {getAllCustomers} = require("../controllers/customerController")
const {getAllTransactions} = require("../controllers/transactionController")

// POST - Sign in employee
router.post("/employee/sign-in", signInValidationMiddleware, employeeSignIn)

// GET - Get all employees
router.get("/admin/employees", isAuthToken, isAdmin, getAllEmployees)

// POST - Add a new employee
router.post("/admin/add-employee", isAuthToken, isAdmin, empSignupValidationMiddleware, addEmployee) // PR tambah middleware isAuth, isAauthorize, isAdmin

// GET - Get employees by role
router.get("/admin/employee/search", isAuthToken, isAdmin, getEmployeeByRole)

// PATCH - Edit employee data by ID
router.patch("/admin/edit-employee/:id", isAuthToken, isAdmin, editEmployee)

// DELETE - Delete employee data by ID
router.delete("/admin/employee/delete/:id", isAuthToken, isAdmin, deleteEmployee)

// GET - Get all customers
router.get("/employee/customer-data", isAuthToken, isEmployeeToken, getAllCustomers)

// GET - Get all transactions
router.get("/employee/transactions-history", isAuthToken, isEmployeeToken, getAllTransactions)

module.exports = router