require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");



const donorRoutes = require("./routes/donorRoutes");
const requestRoutes = require("./routes/requestRoutes");
const Donor = require("./models/Donor");

const app = express(); // ✅ app MUST be initialized first

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: "bloodDonationSecret",
  resave: false,
  saveUninitialized: true
}));

app.use(express.static("public"));

/* ================= DATABASE ================= */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/* ================= ROUTES ================= */
app.use("/donors", donorRoutes);
app.use("/requests", requestRoutes);

/* ================= DONOR PROFILE API ================= */
app.get("/donor/me", async (req, res) => {
  if (!req.session.donor) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const donor = await Donor.findById(req.session.donor);
  res.json(donor);
});

/* ================= ADMIN LOGIN ================= */
app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {
    req.session.admin = true;
    res.redirect("/admin.html");
  } else {
    res.send("Invalid Admin Credentials");
  }
});

/* ================= ADMIN LOGOUT ================= */
app.get("/admin/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/admin-login.html");
  });
});

/* ================= DONOR LOGOUT ================= */
app.get("/donor/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/index.html");
  });
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running");
});
