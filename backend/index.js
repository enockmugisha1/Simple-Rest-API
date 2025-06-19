// Import required modules
const express = require('express'); // Express framework for building the API
const { v4: uuidv4 } = require('uuid'); // UUID for generating unique user IDs
const fs = require('fs'); // File system module for reading/writing user data
const path = require('path'); // Path module for file paths

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3000; // Server will run on port 3000 by default

// Middleware to parse JSON bodies in requests
app.use(express.json());

// Path to the users data file
const USERS_FILE = path.join(__dirname, 'users.json');

// In-memory storage for users
let users = {};

// Load users from file if it exists
if (fs.existsSync(USERS_FILE)) {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    users = JSON.parse(data);
  } catch (err) {
    console.error('Failed to load users from file:', err);
    users = {};
  }
}

// Helper function to save users to file
function saveUsersToFile() {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('Failed to save users to file:', err);
  }
}

/**
 * POST /users
 * Create a new user with a unique ID.
 * Expects JSON: { "name": "John Doe", "email": "john@example.com" }
 * Returns: The created user object with an auto-generated id.
 */
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  // Basic validation for required fields
  if (!name || !email) {
    return res.status(400).json({ error: 'Missing required fields: name and email.' });
  }

  // Generate a unique ID for the new user
  const id = uuidv4();
  const user = { id, name, email };
  users[id] = user;

  // Save updated users to file
  saveUsersToFile();

  // Respond with the created user object
  res.status(201).json(user);
});

/**
 * GET /users/:id
 * Retrieve a user by their unique ID.
 * Returns: The user object if found, or 404 if not found.
 */
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users[id];

  if (!user) {
    // User not found
    return res.status(404).json({ error: 'User not found.' });
  }

  // Respond with the user object
  res.json(user);
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 