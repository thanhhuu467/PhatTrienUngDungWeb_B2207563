const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
// Định tuyến API
app.use("/api/contacts", contactsRouter);
// Handle 404 response
app.use((req, res, next) => {
    next(new ApiError(404, "Resource not found"));
});

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

// Route mặc định
app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact" });
});

module.exports = app;
