const router = require("express").Router()

const {custSignUpValidationMiddleware, signInValidationMiddleware} = require("../middleware/userAuthAccValidation")
const {custSignUp, custSignIn} = require("../controllers/userAuth")
const {isAuthToken, authorizeCustToken} = require("../middleware/verifyToken")
const {getCustByName,changePasswordCust} = require("../controllers/customerController")

// POST - sign up customer
router.post("/customer/sign-up", custSignUpValidationMiddleware, custSignUp)

// POST - sign in customer
router.post("/customer/sign-in", signInValidationMiddleware, custSignIn)

// GET - display customer data by name
router.get("/customer/profile", isAuthToken, getCustByName)

// PATCH - change customer password
router.patch("/customer/change-password", isAuthToken, authorizeCustToken, changePasswordCust)

module.exports = router