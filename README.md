# 🧸 Toy Kingdom - MERN Stack Toy Store Website

Toy Kingdom is a full-stack MERN (MongoDB, Express, React, Node.js) based toy store web application.
It allows users to browse, save toys to their wishlist, manage their cart, and place orders.
Admins can add or manage toy products via a dedicated admin panel.

🚀 Features
User Side
🔐 Authentication (JWT / Google Sign-In)
❤️ Wishlist – save & remove favorite toys
🛒 Cart & Orders – add to cart and track purchases
⭐ Ratings & Reviews for toys
📱 Fully Responsive UI (TailwindCSS + animations)
Admin Side
➕ Add new toy products
🛠 Manage and update toy details
🗑 Remove products from the catalog
🛠 Tech Stack
Frontend: React, TypeScript, TailwindCSS, Vite
Backend: Node.js, Express.js, MongoDB, JWT
Database: MongoDB (Mongoose ODM)
State Management: React hooks & Context API
Authentication: JWT + Google Auth
Other Tools: Axios, Lucide Icons, Toastify
⚙️ Setup & Installation
Clone the Repository
git clone https://github.com/Haris8x-dev/Mern-stack-Toy-store-website.git
cd Mern-stack-Toy-store-website

Backend Setup
cd backend
npm install


Create a .env file in /backend and add:

PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id


Run backend:

npm run dev

Frontend Setup
cd ../frontend
npm install
npm run dev

Open the app in your browser at:
👉 http://localhost:5173
📂 Project Structure
Toy-Kingdom/
│── backend/      # Express + MongoDB REST API
│── frontend/     # React + Tailwind UI
│── .env          # Environment variables (ignored in git)
│── README.md

🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to improve.

📜 License

This project is licensed under the MIT License – feel free to use and modify.

✨ Built with ❤️ by Haris
