import errorHandler from "../utils/error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../models/connection.js";

const authController = {
  health: (req, res, next) => {
    //console.log("Inhere");
    res.send("Successfully running");
  },
  save: async (req, res, next) => {
    try {
      // console.log("Inside save");
      const { data } = req.body;

      // console.log(data);
      data.shift(); // Assuming the first row contains headers and needs to be removed

      const promises = data.map(async (row) => {
        const [name, salary] = row;
        // Execute SQL query to insert data into MySQL table
        await pool.query(
          "INSERT INTO excel_data (name, salary) VALUES (?, ?)",
          [name, salary]
        );
      });

      await Promise.all(promises);

      res.status(200).json({ message: "Excel data saved successfully." });
    } catch (error) {
      next(error);
    }
  },
  signUp: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      // Check if user already exists
      const [existingUser] = await pool.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
      if (existingUser.length > 0) {
        return next(errorHandler(400, "User Already Exists."));
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      // Insert new user into the database
      await pool.query("INSERT INTO users (email, password) VALUES (?, ?)", [
        email,
        hashedPassword,
      ]);

      // Respond with success message
      res.status(201).json({ message: "User signed up successfully" });
    } catch (error) {
      next("Error in controller", error.message);
    }
  },
  login: async (req, res, next) => {
    // console.log("In signin");
    const { email, password } = req.body;
    if (!email || !password) {
      return next(errorHandler(400, "Please fill all the fields"));
    }

    try {
      // Check if user exists
      const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);
      const user = users[0];

      if (user) {
        // Compare passwords
        const passwordVerify = bcrypt.compareSync(password, user.password);
        if (passwordVerify) {
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
          const { password, ...rest } = user;
          res.cookie("access_token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          return res.status(200).json(rest);
        } else {
          return next(errorHandler(400, "Invalid Password"));
        }
      } else {
        return next(errorHandler(400, "User doesn't Exist."));
      }
    } catch (error) {
      return next(error);
    }
  },
  uploadFile: async (req, res, next) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    // File is uploaded successfully, save details to MySQL table
    const filename = req.file.originalname;
    const filepath = req.file.path;
    const project = req.body.project;
    const sub_project = req.body.sub_project;

    const sql =
      "INSERT INTO uploaded_files (filename, filepath,project,sub_project) VALUES (?, ?,?,?)";
    await pool.query(sql, [filename, filepath, project, sub_project]);

    res.send("File uploaded successfully.");
  },
};

export default authController;
