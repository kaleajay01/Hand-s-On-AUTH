const jwt = require("jsonwebtoken");
const userService = require("../services/authServices");
const { JWT_SECRET } = require("../middleware/authMiddleware");

exports.addUser = (req, res) => {
    const { name, password } = req.body;
    if (!name || !password) {
        return res.status(400).json({ message: "name and password are required" });
    }
    userService.addUser(name, password, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({
            message: "User added successfully!!!!!!!",
            id: result.insertId
        });
        console.log("Data Inserted...");
    });
};

exports.loginUser = (req, res) => {
    const { name, password } = req.body;
    if (!name || !password) {
        return res.status(400).json({ message: "name and password are required" });
    }

    userService.loginUser(name, password, (err, result) => {
        if (err) {
            console.error("Login error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (!result || !result.success) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const payload = { userId: result.userId, name: result.name };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

        res.json({
            message: "Login successful",
            token,
            userId: result.userId,
            name: result.name
        });
    });
};

/** Protected: return current user from JWT (middleware attaches req.user). */
exports.getMe = (req, res) => {
    res.json({
        userId: req.user.userId,
        name: req.user.name
    });
};