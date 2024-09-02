const FinancialControllers = require( "../controllers/financial.controllers");
const express = require("express");
const router = express.Router();

// create a new financial
// http://localhost:3000/api/v1/financial
router.post("/", FinancialControllers.create);
// Retrieve all financial record
// http://localhost:3000/api/v1/financial
router.get("/", FinancialControllers.getAll);
//Retrieve all financial record By UserId
// http://localhost:3000/api/v1/financial/:userId
router.get("/user/:userId", FinancialControllers.getByUserId);
// Retrieve a single financial record with id
// http://localhost:3000/api/v1/financial/1
router.get("/:id", FinancialControllers.getById);
//Retrieve update record By id
// http://localhost:3000/api/v1/financial/edit/1
router.put("/edit/:id", FinancialControllers.update);
//Retrieve delete record By id
// http://localhost:3000/api/v1/financial/delete/1
 router.delete("/delete/:id", FinancialControllers.delete);




module.exports = router
