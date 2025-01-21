const router = require("express").Router()
const {signIn} = require("../controllers/employeeAuth")
const {addEmployee, getAllEmployees, getEmployeeByRole, editEmployee, deleteEmployee} = require("../controllers/employeeController")
const {empSignupValidationMiddleware, empSignInValidationMiddleware} = require("../middleware/employeeAuthAccValidation")
const {isAuthToken} = require("../middleware/employeeAuthProtect")
const isAdmin = require("../middleware/isAdmin")

// POST - Sign in employee
router.post("/employee/sign-in", empSignInValidationMiddleware, signIn)

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

module.exports = router