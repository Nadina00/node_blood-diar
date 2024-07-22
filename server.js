const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const { MONGO_URL, PORT = 10000 } = process.env;
mongoose.set('strictQuery', true);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });