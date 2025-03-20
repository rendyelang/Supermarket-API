require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const productsRouter = require("./routes/productRouter")
const employeeRouter = require("./routes/employeeRouter")
const customerRouter = require("./routes/customerRouter")
const transactionOrderRouter = require("./routes/transactionOrderRouter")
const cors = require("cors")

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).send({message: "Welcome to the Supermarket API"})
})

app.use(productsRouter)
app.use(employeeRouter)
app.use(customerRouter)
app.use(transactionOrderRouter)

app.use((req, res) => {
    res.status(404).send({message: "Route not found!"})
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})