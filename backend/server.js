const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./api/database/connections/mongodbConnection');

dotenv.config();
connectDB();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
