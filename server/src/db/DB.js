const mongoose = require("mongoose");
const DB = process.env.DB_Connect;
const dotenv = require("dotenv");

/* Creating a Database */
mongoose
  .connect(
    "mongodb+srv://tkashi328:Talha328@cluster0.xjste.mongodb.net/ShoppingApp?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log(`Connected To Online Db Successfully...... `.inverse.yellow);
  })
  .catch((err) => {
    console.log(`Connection failed`.inverse.red);
  });
