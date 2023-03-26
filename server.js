const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config({ path: 'MONGO_URL' });

const { MONGO_URL, PORT = 5001 } = process.env;
mongoose.set('strictQuery', true);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('Database connection successful');
    console.log('Server running. Use our API on port: 5001');
    app.listen(PORT);
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
