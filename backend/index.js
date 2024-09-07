const express = require("express");
const app = express();
require ("dotenv").config();
const PORT = process.env.PORT || 3000
const FinancialRouter = require("./router/finanacial.router");


const cors = require("cors");
const corsOptions = {
    origin:"*"
};

//use Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//Route
app.use("/api/v1/financial", FinancialRouter);

app.get("/",(req,res) =>{
    res.send("<h1>Financial Tracker API</h1>")
});

app.listen(PORT, ()=>{
    console.log("Listening to port "+PORT);
})