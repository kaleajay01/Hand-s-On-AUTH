const express = require("express"); 
const cors = require("cors");
const path = require("path");

const userRoutes = require("./router/authRouter");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

// Show HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});

// API routes
app.use("/api", userRoutes);

const PORT = 7788;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});