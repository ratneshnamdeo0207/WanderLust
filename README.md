# WanderLust 🌍

A travel accommodation booking web application inspired by Airbnb.  
Built with **Node.js, Express, MongoDB, Passport, and EJS**, this app allows users to browse, add, edit, review, and manage listings.  

---

## 🌍 Live Demo

Check out the deployed version of the project here:  
👉 [Live Demo on Render] https://wanderlust-k17h.onrender.com/

---

## Table of Contents

- [Features](#features)  
- [Technologies Used](#technologies-used)
- [Screenshots](#-screenshots)    
- [Setup & Installation](#setup--installation)  
- [Environment Variables](#environment-variables)  
- [Usage](#usage)  
- [Project Structure](#project-structure)  
- [Error Handling](#error-handling)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Features

- User authentication with **Passport (Local Strategy)**  
- Secure session handling using **connect-mongo** and **MongoDB Atlas**  
- Flash messages for success/error notifications
- Review & rating system with validation 
- Users can:  
  - Browse listings  
  - Create new listings  
  - Edit or delete their own listings  
  - Add reviews to listings  
- **Interactive Map Integration**  
  - Each listing displays its location on an interactive map  
  - Powered by Mapbox (or a compatible map API)  Friendly UI with **EJS templates** and **Bootstrap**  
- Error handling for invalid routes or database issues  

---

## Technologies Used

- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Atlas for production, local MongoDB for dev)  
- **Authentication**: Passport.js, express-session, connect-mongo  
- **Templating**: EJS with ejs-mate  
- **Other**: dotenv, flash messages, method-override  

---

## 📸 Screenshots

### Homepage
![Homepage](./screenshots/homepage.png)

### All Listings
![All Listings](./screenshots/AllListing.png)

### Single Listing
![Listing](./screenshots/listing.png)

### Map Integration
![Map](./screenshots/UsingMapAPI.png)

---

## Setup & Installation

1. Clone the repository  
   ```bash
   git clone https://github.com/ratneshnamdeo0207/WanderLust.git


2. Navigate into the project directory

   ```bash
   cd WanderLust
   ```

3. Install dependencies

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the following (see [Environment Variables](#environment-variables)):

   ```env
   NODE_ENV=development
   PORT=4000
   ATLASDB_URL=your_mongodb_atlas_connection_uri
   SECRET=your_session_secret
   ```

5. Start the server

   ```bash
   node app.js
   ```

   or if you use nodemon:

   ```bash
   nodemon app.js
   ```

6. Open your browser at:

   ```
   http://localhost:4000/
   ```

---

## Environment Variables

You **must** set the following environment variables in your `.env` file:

| Name          | Description                           | Example                                  |
| ------------- | ------------------------------------- | ---------------------------------------- |
| `NODE_ENV`    | Set to `development` or `production`  | `development`                            |
| `PORT`        | Port to run the server on             | `4000`                                   |
| `ATLASDB_URL` | MongoDB Atlas connection string       | `mongodb+srv://user:pass@cluster/dbname` |
| `SECRET`      | Secret for encrypting session cookies | `supersecretstring`                      |

---

## Usage

* Visit `/` → Welcome page
* Visit `/listings` → See all listings
* Sign up / log in to:

  * Add new listings
  * Edit / delete your listings
  * Review other listings
* Flash messages will appear for actions like successful login, errors, etc.

---

## Project Structure

```
project-root/
├── controller/ # Route controllers (business logic)
│ ├── listings.js
│ ├── review.js
│ └── user.js
│
├── init/ # Initial data & scripts
│ ├── data.js
│ └── index.js
│
├── models/ # Mongoose schemas
│ ├── listing.js
│ ├── review.js
│ └── user.js
│
├── node_modules/ # Installed dependencies (ignored in Git)
│
├── public/ # Static files
│ ├── css/
│ │ ├── rating.css
│ │ └── style.css
│ └── js/
│ └── script.js
│
├── routes/ # Express route definitions
│ ├── listings.js
│ ├── reviews.js
│ └── user.js
│
├── utils/ # Utility/helper functions
│ ├── asyncWrap.js
│ ├── CustomError.js
│ ├── validateListing.js
│ └── validateReview.js
│
├── views/ # EJS templates (server-side rendering)
│ ├── includes/ # Shared UI components
│ │ ├── flash.ejs
│ │ ├── footer.ejs
│ │ └── navbar.ejs
│ │
│ ├── layouts/ # Layout templates
│ │ └── boilerplate.ejs
│ │
│ ├── listings/ # Listings-related pages
│ │ ├── edit.ejs
│ │ ├── error.ejs
│ │ ├── index.ejs
│ │ ├── new.ejs
│ │ ├── show.ejs
│ │ └── welcome.ejs
│ │
│ └── users/ # User authentication pages
│ ├── login.ejs
│ └── signup.ejs
│
├── .env # Environment variables (not pushed to GitHub)
├── .gitignore # Git ignore rules
├── app.js # Main server entry point
├── cloudConfig.js # Cloudinary / cloud storage config
├── middleware.js # Custom middleware functions
├── package.json # Dependencies & project metadata
├── package-lock.json # Dependency lock file
└── scheme.js # Database schema setup / seeding script
```

---

## Error Handling

* All async routes are wrapped in a custom `asyncWrap` utility
* Custom error pages are rendered for invalid routes or server issues (`views/listings/error.ejs`)
* MongoDB session errors are logged via `connect-mongo` error events

---

## Contributing

Contributions are welcome! 🎉

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes
4. Push to your fork and open a Pull Request

---

## License

This project is licensed under the **MIT License**.

---

## Acknowledgments

* Inspired by **Airbnb**
* Thanks to Express, Mongoose, Passport, and all open-source libraries used
