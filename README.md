# Postopia - Where Your Ideas Take Flight

Postopia is a full-stack blogging platform that allows users to create, edit, and share blogs seamlessly. It features a modern frontend built with React and Tailwind CSS, a robust backend powered by Express and MongoDB, and a mobile app built with React Native.

---

## Features

### Frontend
- **Responsive Design**: Built with Tailwind CSS for a seamless experience across devices.
- **Rich Text Editor**: Create and edit blogs with a rich text editor powered by `react-quill`.
- **Dark Mode**: Fully supports light and dark themes.
- **User Authentication**: Secure login and registration with JWT.
- **Blog Management**: Create, edit, and delete blogs with image uploads.
- **Category and Search**: Filter blogs by category and search functionality.

### Backend
- **RESTful API**: Built with Express.js for handling user authentication, blog management, and more.
- **MongoDB Integration**: Stores user and blog data securely.
- **Authentication**: Implements JWT-based authentication for secure access.
- **File Uploads**: Supports image uploads using Multer.

### Mobile App
- **React Native**: A mobile app for accessing Postopia on the go.
- **Expo**: Simplified development and deployment for iOS and Android.

---

## Project Structure

```
backend/
    .env
    app.js
    config/
        mongo-connection.js
    controllers/
        authController.js
        postController.js
    models/
    routes/
frontend/
    src/
        components/
        pages/
        context/
        utils/
    public/
postoPiaApp/
    src/
    assets/
```

---

## Installation

### Backend
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add the following:
   ```
   MONGODB_URI=<your-mongodb-uri>
   ACCESS_JWT_KEY=<your-access-jwt-key>
   REFRESH_JWT_KEY=<your-refresh-jwt-key>
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` directory and add the following:
   ```
   VITE_API_URL=http://localhost:3000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Mobile App
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

## Deployment

### Backend
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

### Frontend
The frontend is built using Vite and can be deployed on platforms like Vercel or Netlify. Run the following command to build the project:
```bash
npm run build
```

---

## Technologies Used

### Frontend
- React
- Tailwind CSS
- React Router
- React Quill

### Backend
- Node.js
- Express.js
- MongoDB
- Multer
- JWT

### Mobile App
- React Native
- Expo

---

## Contributing

Contributions are welcome! Please follow these steps:
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

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Authors

- [Kritik Hedau](https://github.com/kritikhedau)
- [Shakti Tamrakar](https://github.com/shakti177)
