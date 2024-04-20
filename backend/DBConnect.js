const mongoose = require("mongoose");
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log(`Mongo Database Connected Sucessfully!! \nAll Good to Rock and Roll!!`))
  .catch((e) => console.log("Mongo Database Error"));
