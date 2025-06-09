// =======================
// Imports and Middleware
// =======================
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const multer = require("multer");

const app = express();
const saltRounds = 10;
const port = 5000;

// Static files
app.use(express.static(path.join(__dirname, "public")));

// CORS and parsing middleware
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// =======================
// Database Connection
// =======================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mycardmaker",
});

// =======================
// Session Configuration
// =======================
app.use(
  session({
    key: "userId",
    secret: "test",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 60 * 24,
    },
  })
);

// =======================
// Orders Section
// =======================

// Add new order
app.post("/add_user", (req, res) => {
  const sql =
    "INSERT INTO order_details (`name`,`job`,`company`,`phone`,`email`,`website`,`design`,`user_id`) VALUES (?, ?, ?, ?, ?, ?,?,?)";
  const values = [
    req.body.name,
    req.body.job,
    req.body.company,
    req.body.phone,
    req.body.email,
    req.body.website,
    req.body.design,
    req.body.userId,
  ];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "order added successfully" });
  });
});

// Get all orders
app.get("/mycardmaker", (req, res) => {
  const sql = "SELECT * FROM order_details";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});

// Get order by ID
app.get("/get_order/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM order_details WHERE `id`= ?";
  db.query(sql, [id], (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});

// Edit order
app.post("/edit_user/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "UPDATE order_details SET `name`=?, `job`=?, `company`=?, `phone`=?, `email`=?, `website`=?, `design`=? WHERE id=?";
  const values = [
    req.body.name,
    req.body.job,
    req.body.company,
    req.body.phone,
    req.body.email,
    req.body.website,
    req.body.design,
    id,
  ];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "order updated successfully" });
  });
});

// Delete order
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM order_details WHERE id=?";
  const values = [id];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "order updated successfully" });
  });
});

// =======================
// User Authentication Section
// =======================

// Register new user
app.post("/register", (req, res) => {
  const username = req.body.username;
  const useremail = req.body.useremail;
  const password = req.body.password;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "INSERT INTO users (`username`,`useremail`,`password`) VALUES (?, ?, ?)",
      [username, useremail, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

// Check login status
app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user, userId: req.session.user.id });
  } else {
    res.send({ loggedIn: false });
  }
});

// Login user
app.post("/login", (req, res) => {
  const useremail = req.body.useremail;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE useremail=?",
    useremail,
    (err, result) => {
      if (err) {
        console.log({ err: err });
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            console.log(req.session.user);
            res.send(result);
          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});

// Logout user
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: "Error logging out" });
    }
    res.clearCookie("userId");
    res.send({ message: "Successfully logged out" });
  });
});

// =======================
// Customers Section
// =======================

// Get number of customers
app.get("/mycardmaker/customers", (req, res) => {
  const sql = "SELECT COUNT(*) AS customerCount FROM users WHERE role = 'user'";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result[0]);
  });
});

// Get customers list
app.get("/customors", (req, res) => {
  const sql = "SELECT * FROM users WHERE role='user' ";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});

// =======================
// Products Section
// =======================

// Multer storage config for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Upload product image
app.post("/upload", upload.single("image"), (req, res) => {
  const image = req.file.filename;
  const user_order_id = req.body.user_order_id;
  const sql = "INSERT INTO products (`image`, `user_order_id`)  VALUES (?, ?)";
  db.query(sql, [image, user_order_id], (err, result) => {
    if (err) return res.json({ Message: "Error" });
    return res.json({ Status: "Success" });
  });
});

// Get all products (raw)
app.get("/display", (req, res) => {
  const sql = 'SELECT * FROM products';
  db.query(sql, (err, result) => {
    if (err) res.json("Error");
    return res.json(result);
  });
});

// Get all products (list)
app.get("/productsList", (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});

// Delete product by ID
app.delete("/deleteProduct/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM products WHERE id=?";
  const values = [id];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "product updated successfully" });
  });
});

// Get products for preference (async/await style)
app.get("/displayProducts", async (req, res) => {
  try {
    const sql = "SELECT id, image, user_order_id FROM products";
    // NOTE: mysql package does not support promises by default. Use mysql2 or wrap in a promise.
    // Suggestion: Use mysql2/promise for async/await support.
    db.query(sql, (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error fetching products" });
      }
      res.json(rows);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// Get all products for a specific user order
app.get("/user-images/:userId", (req, res) => {
  const userId = req.params.userId;
  const sql = "SELECT * FROM products WHERE user_order_id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) res.json({ message: "Server error" });
    return res.json(result);
  });
});

// =======================
// Server Start
// =======================
app.listen(port, () => {
  console.log(`listening on port ${port} `);
});

