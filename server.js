require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 1000;
const sequelize = require('./database/database');
const productRouter = require("./routes/product")

const app = express();
app.use(express.json());
app.use(productRouter);

const dbConnect = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully")
    } catch (error) {
        console.log(`Failed to connect to Database`, error.message)
    }
};

dbConnect();

app.listen(PORT, ()=>{
    console.log(`Server is listening on PORT: ${PORT}`);
    
});