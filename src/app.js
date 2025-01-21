require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const productsRouter = require("./routes/productRouter")
const employeeRouter = require("./routes/employeeRouter")

app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).send({message: "Welcome to the Supermarket API"})
})

app.use(productsRouter)
app.use(employeeRouter)

app.use((req, res) => {
    res.status(404).send({message: "Route not found!"})
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})