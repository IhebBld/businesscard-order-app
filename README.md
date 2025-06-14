# Business Card Project

A business card website where users can fill out a form, choose a design from various categories, and save it to their profile. Includes an admin dashboard to manage user submissions, designs, and profiles.

---

## Features

- User registration and login
- Fill out business card details
- Choose from multiple design categories
- Save and manage your cards
- Admin dashboard for managing users, designs, and submissions

---

### Prerequisites

- Node.js & npm
- Yarn (optional)
- XAMPP or MySQL server

### Database Setup

- Start MySQL (e.g., via XAMPP)
- Create the database and tables using the following SQL:

```sql
CREATE DATABASE IF NOT EXISTS mycardmaker;
USE mycardmaker;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    useremail VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS order_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    job VARCHAR(100),
    company VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100),
    website VARCHAR(100),
    design VARCHAR(255),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(255) NOT NULL,
    user_order_id INT,
    FOREIGN KEY (user_order_id) REFERENCES order_details(id) ON DELETE CASCADE
);