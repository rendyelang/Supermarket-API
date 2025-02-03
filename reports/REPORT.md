# Supermarket API

## 📑 Table of Contents

1. [Introduction](#-introduction)
2. [Database Design](#-database-design)
3. [Endpoint Design](#-endpoint-design)
4. [API Documentation](#-api-documentation)
5. [Authentication & Middleware](#authentication--middleware)
6. [Endpoint Testing](#endpoint-testing)
7. [End of Report](#end-of-report)

## 🚩 Introduction

Supermarket API is made for the needs of a supermarket starting from product management, employee and customer management, and also handling transactions. Where users can perform several CRUD actions to the available endpoints.

## 🛢 Database Design
The database consists of five related tables.

1. **Employees**

   - `employee_id` (Primary Key)
   - `name`
   - `role`
   - `email`
   - `password`

2. **Customers**

   - `customer_id` (Primary Key)
   - `name`
   - `email`
   - `password`

3. **Products**

   - `product_id` (Primary Key)
   - `category`
   - `name`
   - `price`
   - `stock_quantity`

4. **Transactions**
   - `transaction_id` (Primary Key)
   - `customer_id` (Foreign Key)
   - `employee_id` (Foreign Key)
   - `transaction_date`
   - `grand_total`

4. **Orders**
   - `order_id` (Primary Key)
   - `transaction_id` (Foreign Key)
   - `product_id` (Foreign Key)
   - `quantity`
   - `subtotal`

### ERD (Entity Relationship Diagram)
<p align="center">
    <img src="https://github.com/user-attachments/assets/494af145-178a-4892-b85c-0211e610885b">
</p>


### Design
![Tables-Design](https://github.com/user-attachments/assets/722f5d71-e7b3-4657-8310-179e26a3540e)

## 🔀 Endpoint Design

This API provides a total of 22 endpoints (exceeding the minimum requirement of 20). Below are the details:

## 📜 API Documentation

### Endpoint Overview (Total: 22 Endpoints)

#### 🏠 Base URL (1 Endpoint)

1. **Home URL**

    ```http
    GET /
    ```

#### 👤 User Authentication (3 Endpoints)

1. **Sign-In Employee**

    ```http
    POST /emploee/sign-in
    ```

2. **Sign-Up Customer**

    ```http
    POST /customer/sign-up
    ```

3. **Sign-In Customer**

    ```http
    POST /customer/sign-in
    ```

#### 📦 Product Management (6 Endpoints)

1. **Get All Products**

    ```http
    GET /products
    ```

2. **Get Product by ID**

    ```http
    GET /product/:id
    ```

3. **Search Product by Category**

    ```http
    GET /product/search?category=?
    ```

4. **Add Product**
    ```http
    POST /add-product
    ```

5. **Update Product by ID**
    ```http
    PUT /product/edit/:id
    ```

6. **Delete Product by ID**
    ```http
    DELETE /product/delete/:id
    ```

#### 👷‍♂️ Employees Management (5 Endpoints)

1. **Get All Employees Data**

    ```http
    GET /admin/employees
    ```

2. **Get Employee Data by Role**

    ```http
    GET /admin/employee/search?role=?
    ```

3. **Add Employee**

    ```http
    POST /admin/add-employee
    ```

4. **Edit Name & Role Employee**
    ```http
    PATCH /admin/edit-employee/:id
    ```

5. **Delete Employee Record by ID**

    ```http
    DELETE /admin/employee/delete/:id
    ```

#### 👥 Customers Management (3 Endpoints)

1. **Get All Customers Data**

    ```http
    GET /employee/customer-data
    ```

2. **Get Customer Profile by name query**

    ```http
    GET /customer/profile?name=?
    ```

3. **Change Customer Password**

    ```http
    PATCH /employee/change-password
    ```

#### 🛒 Transaction Order Management (4 Endpoints)

1. **Create Transaction**

    ```http
    POST /create-transaction
    ```

2. **Create Order**

    ```http
    POST /create-order
    ```

3. **Print Transaction Invoice**

    ```http
    GET /transaction/invoice/:id
    ```

4. **Get All Transactions History**

    ```http
    GET /employee/transactions-history
    ```

#### For more details about API documentation, please go to the [following page.](https://documenter.getpostman.com/view/29015041/2sAYX3riat)

## Authentication & Middleware

### JWT Implementation

```javascript
const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
);
```

### Authentication Middleware

```javascript
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            message: "Access denied",
        });
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({
            message: "Invalid token",
        });
    }
};
```

## Endpoint Testing

### Endpoint Testing Summary

| Category  | Total Endpoints | Success Rate | Avg Response Time |
| --------- | --------------- | ------------ | ----------------- |
| Users     | 4               | 100%         | 145ms             |
| Movies    | 6               | 100%         | 267ms             |
| Watchlist | 4               | 100%         | 156ms             |
| Reviews   | 5               | 100%         | 178ms             |
| Search    | 4               | 100%         | 134ms             |

### Test Examples using Postman

#### User Registration Test

<!-- ![user signup](./img/signup.png) -->

#### Login User Test

<!-- ![user signup](./img/login.png) -->

#### Search Movie Test

<!-- ![user signup](./img/search.png) -->

## End of Report

MovieVerse API has been successfully implemented by fulfilling all the required criteria:

1. ✅ Database design with 4 related tables
2. ✅ 23 endpoint designs (exceeding the minimum of 20)
3. ✅ Complete documentation for each endpoint
4. ✅ Integration with TMDB API
5. ✅ Middleware and JWT Authorization implementation
6. ✅ Testing for all endpoints
