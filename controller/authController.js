const userService = require("../services/authServices");
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