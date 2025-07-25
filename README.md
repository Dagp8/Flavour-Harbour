# Flavour Harbour – Recipe Sharing Platform

**Description**  
Flavour Harbour is a recipe sharing web application developed as a university project at Goldsmiths, University of London. Users can register, log in, and manage their own recipes. Guests can browse public recipes or discover new ideas with the random recipe feature powered by Spoonacular API.

---

## Main Features

- User registration and login with password encryption
- Personal dashboard to view and delete your recipes
- Add new recipes with title, description, ingredients, and instructions
- Browse all public recipes
- Search recipes by title or description
- Discover random recipes from Spoonacular API
- Secure session management and input validation

---

## Technologies Used

- Node.js
- Express.js
- MySQL
- EJS (Embedded JavaScript templates)
- bcrypt
- express-session
- express-validator / express-sanitizer
- Spoonacular API
- dotenv

---

## Installation and Usage

1. Clone the repository:

```bash
git clone https://github.com/Dagp8/flavour-harbour.git
cd flavour-harbour
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root folder with the following content:

```env
DB_HOST=localhost
DB_USER=reciapp
DB_PASSWORD=asde
DB_NAME=myFlavour
SESSION_SECRET=tastyrecipe
SPOONACULAR_API_KEY=your_api_key_here
```

> Replace `your_api_key_here` with your actual Spoonacular API key.

4. Start the server:

```bash
node index.js
```

Then visit `http://localhost:8000` in your browser.

---

## Database Structure

- **users** table:  
  `user_id`, `first_name`, `last_name`, `email`, `username`, `hashedPassword`

- **recipes** table:  
  `recipe_id`, `user_id`, `title`, `description`, `ingredients`, `instructions`

---

## Security

- Passwords hashed with `bcrypt`
- Sessions managed with `express-session`
- Input sanitisation using `express-sanitizer`
- Validation using `express-validator`
- Access control for logged-in users
- SQL injection prevention using parameterised queries

---

## Project Status

This is a working academic project. Future plans include improving the design and deploying the application online.

---

## Author

Dario Guerrero  
[GitHub](https://github.com/Dagp8)  
[LinkedIn](https://www.linkedin.com/in/dario-guerrero/)
