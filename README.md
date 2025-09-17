## This project is a Wallet Management System built with Express.js, Mongoose, and MongoDB as part of my backend assignment.
## I implemented it step by step, starting from project setup and finishing with advanced role-based transactions and admin features.

# 🛠️ My Workflow (How I Built It)
1️⃣ Project Setup

Started with Express.js project initialization.

Connected to the MongoDB database using Mongoose.

Installed and configured all required tools and packages (dotenv, bcrypt, jsonwebtoken, cors, nodemon, etc.).

Set up environment configuration for secure keys and the database.

2️⃣ User Registration & Authentication

Implemented user registration with hashed passwords.

Added login and logout functionalities using JWT.

Designed the system so that each user automatically gets a wallet after registration.

3️⃣ User Wallet & Transactions

Built user wallet operations:

Send Money to other users.

Withdraw Money through agents.

Add Money via agents.

Added validation and checks to keep transactions secure.

4️⃣ Agent Transactions

Implemented Agent role for handling user requests:

Cash-In: Add balance to user wallets.

Cash-Out: Withdraw money on behalf of users.

Designed transaction flow so agents also have their own transaction history.

5️⃣ Admin Operations

Created Admin role with full system control.

Admin can view and monitor all transactions.

Implemented pagination for transactions to handle large datasets.

Built separate views for user transactions and agent transactions.

Added core business logic to ensure smooth and secure workflow.

6️⃣ Final Logic & Enhancements

Completed overall transaction system combining Users, Agents, and Admins.

Added role-based security for APIs.

Ensured proper error handling and response structure.

Finalized assignment with a fully functional wallet system including registration, authentication, transactions, and role management.

📊 Summary of Features I Built

✅ Project setup with Express, MongoDB, and Mongoose.

✅ Registration, Login, Logout with JWT.

✅ User Wallet with Send, Withdraw, and Add Money.

✅ Agent role with Cash-In & Cash-Out.

✅ Admin role with transaction monitoring & pagination.

✅ Role-based access and business logic.

🧑‍💻 Author

Developed by Md Junayed as part of my backend assignment.
This project demonstrates how I built a complete wallet management system from scratch, step by step.

### Api end point

-- Authentication --

Registration : https://my-cash-wallet.vercel.app/api/v1/wallet/register
Login : https://my-cash-wallet.vercel.app/api/v1/auth/login
Logout : https://my-cash-wallet.vercel.app/api/v1/auth/logout

-- User Transaction --

Send Money : https://my-cash-wallet.vercel.app/api/v1/user/send-money
Withdraw Money : https://my-cash-wallet.vercel.app/api/v1/user/cash-out
Add Money : https://my-cash-wallet.vercel.app/api/v1/user/add-money

-- Agent Transaction --

Cash IN : https://my-cash-wallet.vercel.app/api/v1/agent/cash-in
Cash Out : https://my-cash-wallet.vercel.app/api/v1/agent/cash-out

-- Transaction Report --

Transaction by user number : https://my-cash-wallet.vercel.app/api/v1/transactions/user/:number
Transaction by agent number : https://my-cash-wallet.vercel.app/api/v1/transactions/agent/:number

-- Admin Track --

Get all wallets : https://my-cash-wallet.vercel.app/api/v1/wallet/all-wallets
Get all transaction : https://my-cash-wallet.vercel.app/api/v1/transactions/all
Block User : https://my-cash-wallet.vercel.app/api/v1/wallet/block/:number
Active Block user : https://my-cash-wallet.vercel.app/api/v1/wallet/active/:number
Block Agent : https://my-cash-wallet.vercel.app/api/v1/agent/block/:number
Active agent : https://my-cash-wallet.vercel.app/api/v1/agent/active/:number


