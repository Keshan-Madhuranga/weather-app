const app = require("./app");
const dotenv = require("dotenv");
const socketIo = require("socket.io");
const axios = require("axios");
const http = require("http");
const connectDB = require("./api/database/connections/mongodbConnection");
const { authenticate } = require("./api/middlewares/socket");

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_SERVER_URL || "http://localhost:4200",
    methods: ["GET", "POST", "OPTIONS"],
  },
});

io.use(authenticate).on("connection", (socket) => {
  console.log(`New client connected - ${socket.id}`);
  let interval;

  socket.on("getWeather", async (latitude, longitude) => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&forecast_days=14&daily=temperature_2m_max,temperature_2m_min,rain_sum,snowfall_sum,wind_speed_10m_max,wind_direction_10m_dominant,sunrise,sunset&timezone=GMT`
        );
        socket.emit("weatherUpdate", response.data);
      } catch (error) {
        console.error(`Error: ${error.code}`);
        return error;
      }
    };

    fetchWeather();
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(fetchWeather, 30000);

    socket.on("disconnect", () => {
      clearInterval(interval);
      console.log("Client disconnected");
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
