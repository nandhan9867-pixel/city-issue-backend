const dotenv = require("dotenv");

dotenv.config();

const app = require("./src/app");

const testConnection = require("./src/config/testConnection");

const PORT = process.env.PORT || 5000;

testConnection();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});