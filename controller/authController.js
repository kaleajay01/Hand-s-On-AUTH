const jwt = require("jsonwebtoken");
const userService = require("../services/authServices");
const { JWT_SECRET } = require("../middleware/authMiddleware");

exports.addUser = (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ message: "Please provide both a name and a password." });
    }

    userService.addUser(name, password, (error, result) => {
        if (error) {
            return res.status(500).json({ message: "Database error", details: error });
        }

        console.log("New user saved to the database!");

        res.json({
            message: "User added successfully!",
            id: result.insertId
        });
    });
};

exports.loginUser = (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ message: "Please provide both a name and a password." });
    }

    userService.loginUser(name, password, (error, result) => {
        if (error) {
            console.error("Login error:", error);
            return res.status(500).json({ message: "Something went wrong on our end." });
        }

        if (!result || !result.success) {
            return res.status(401).json({ message: "Wrong name or password. Please try again." });
        }

        const payload = { 
            userId: result.userId, 
            name: result.name 
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

        res.json({
            message: "Login successful!",
            token: token,
            userId: result.userId,
            name: result.name
        });
    });
};

exports.getMe = (req, res) => {
    res.json({
        userId: req.user.userId,
        name: req.user.name
    });
};