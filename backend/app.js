
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (replace with your MongoDB URI)
mongoose.connect('mongodb://localhost:27017/blogpost')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define a Post schema
const postSchema = new mongoose.Schema({
  title: String,
  desc: String,
  date: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);

// Routes
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find(); // Fetch all posts
    res.json(posts);
  } catch (err) {
    res.status(500).send('Error fetching posts');
  }
});

app.post('/posts', async (req, res) => {
  const { title, desc } = req.body;
  const newPost = new Post({ title, desc });
  
  try {
    const savedPost = await newPost.save(); // Save post to DB
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).send('Error saving post');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
