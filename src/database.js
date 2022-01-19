const mongoose = require("mongoose");

mongoose
  .connect('mongodb+srv://gonzalo:rocanroles092@cluster0.iqnmz.mongodb.net/instame?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((db) => console.log("Mongodb is connected to", db.connection.host))
  .catch((err) => console.error(err));
