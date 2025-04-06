# 🌟 **Postopia** - *Where Your Ideas Take Flight* ✨

Postopia is a full-stack blogging platform built with React, Node.js, and MongoDB. It features user authentication, post creation & editing, dark/light mode toggle, and dynamic related post suggestions. Ideal for personal blogging, portfolio integration, and learning full-stack development. 🚀

---

## 🌈 **Features**

### 🖌️ **Frontend**
- 🌐 **Responsive Design**: Tailored for all devices with Tailwind CSS.
- ✍️ **Rich Text Editor**: Create stunning blogs with a powerful editor.
- 🌙 **Dark Mode**: Write comfortably, day or night.
- 🔒 **User Authentication**: Secure login and registration with JWT.
- 📝 **Blog Management**: Create, edit, and delete blogs with ease.
- 🔍 **Category & Search**: Filter blogs by category or search for specific content.

### ⚙️ **Backend**
- 🛠️ **RESTful API**: Built with Express.js for seamless communication.
- 🗄️ **MongoDB Integration**: Securely store user and blog data.
- 🔑 **Authentication**: JWT-based authentication for secure access.
- 📂 **File Uploads**: Upload and manage images effortlessly.

### 📱 **Mobile App**
- 📲 **React Native**: Access Postopia on the go.
- 🌟 **Expo**: Simplified development and deployment for iOS and Android.

---

## 🏗️ **Project Structure**

The project is organized into three main directories: `backend`, `frontend`, and `postoPiaApp` (mobile app). Below is an overview of the structure:

```
📂 backend/
├── 📄 .env                # Environment variables
├── 📄 app.js              # Main server file
├── 📂 config/             # Configuration files
│   └── mongo-connection.js # MongoDB connection setup
├── 📂 controllers/        # API controllers
│   ├── authController.js   # Authentication logic
│   └── postController.js   # Blog post logic
├── 📂 models/             # Mongoose models
├── 📂 routes/             # API routes
└── 📂 middleware/         # Middleware (e.g., authentication)

📂 frontend/
├── 📂 src/
│   ├── 📂 components/      # Reusable UI components
│   ├── 📂 pages/           # Application pages (e.g., Login, Dashboard)
│   ├── 📂 context/         # React context for state management
│   ├── 📂 utils/           # Utility functions
│   └── 📂 assets/          # Static assets (e.g., images, icons)
├── 📂 public/             # Public files (e.g., index.html)
└── 📄 .env                # Environment variables for the frontend

📂 postoPiaApp/
├── 📂 src/
│   ├── 📂 components/      # Reusable components for the mobile app
│   ├── 📂 screens/         # App screens (e.g., Home, Profile)
│   ├── 📂 navigation/      # Navigation setup (React Navigation)
│   └── 📂 assets/          # Static assets for the mobile app
└── 📄 App.js              # Main entry point for the mobile app
```

### Key Highlights:
- **`backend/`**: Contains the server-side logic, including API routes, controllers, and database models.
- **`frontend/`**: Houses the React-based web application with reusable components and pages.
- **`postoPiaApp/`**: The mobile app built with React Native and Expo for iOS and Android platforms.

---

## 🚀 **Getting Started**

### 🛠️ **Backend Setup**
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add:
   ```
   MONGODB_URI=<your-mongodb-uri>
   ACCESS_JWT_KEY=<your-access-jwt-key>
   REFRESH_JWT_KEY=<your-refresh-jwt-key>
   ```
4. Start the server:
   ```bash
   npm start
   ```

### 🎨 **Frontend Setup**
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` directory and add:
   ```
   VITE_API_URL=http://localhost:3000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### 📱 **Mobile App Setup**
1. Navigate to the `postoPiaApp` directory:
   ```bash
   cd postoPiaApp
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Expo development server:
   ```bash
   npm start
   ```

---

## 🌍 **Deployment**

### 🖥️ **Backend**
The backend is configured for deployment on Vercel. Ensure the `vercel.json` file is present in the `backend` directory:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "app.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/app.js"
    }
  ]
}
```

### 🌐 **Frontend**
The frontend is built using Vite and can be deployed on platforms like Vercel or Netlify. Build the project with:
```bash
npm run build
```

---

## 🛠️ **Technologies Used**

### 💻 **Frontend**
- React
- Tailwind CSS
- React Router
- React Quill

### ⚙️ **Backend**
- Node.js
- Express.js
- MongoDB
- Multer
- JWT

### 📱 **Mobile App**
- React Native
- Expo

---

## 🤝 **Contributing**

We welcome contributions! Follow these steps to get started:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## 👩‍💻 **Authors**

- [Kritik Hedau](https://github.com/kritikhedau)
- [Shakti Tamrakar](https://github.com/shakti177)

---

🎉 **Thank you for visiting Postopia! We can't wait to see what you'll create.**
