const Destination = require("../models/Destination");

const router = require("express").Router();

router.post('/create', (req, res)=> {
    const { title, imageUrl, description, author } = req.body;

  // Create a new Post instance
  const post = new Destination({
    title,
    imageUrl,
    description,
    author
  });

  // Save the post to the database
  post
    .save()
    .then((savedPost) => {
      res.status(201).json(savedPost);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to create post' });
    });
})

module.exports = router;