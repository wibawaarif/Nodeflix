const app = require('./app/app')
const fs = require('fs');
const https = require('https');
const mongoose = require('mongoose');
require("dotenv").config();   

const PORT = process.env.PORT;

mongoose.connect(
  process.env.MONGODB_URI, 
  {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }
)
  .then(() => {
  console.log("MongoDB Connection Successfull")
})
  .catch((err) => {
    console.log(err)
  })

https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
}, app).listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
}); 