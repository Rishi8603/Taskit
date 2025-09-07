const cors = require('cors');

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://to-do-brown-five.vercel.app",
    "https://to-r76avxbfy-rishis-projects-24bf552.vercel.app"
  ],
  credentials:true
};

module.exports = cors(corsOptions);