const Destination = require("../models/Destination");
const router = require("express").Router();

const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  // Get the JWT token from the request headers
  const token = req.headers.authorization.split(' ')[1];;


  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify and decode the JWT token
    const decodedToken = jwt.verify(token, 'your-secret-key');
    // Set the decoded user information to the request object
    req.user = {sub: decodedToken.userId}

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

router.get('/', async (req, res) => {
  try{
    const destinations = await Destination.find();
    res.json(destinations)
  } catch (error) {
    console.log(error)
    res.status(500).json({error: 'Server error'})
  }
})


router.post('/create', authenticate, (req, res)=> {
    const { title, imageUrl, description } = req.body; 
   
  // Create a new Post instance
  const post = new Destination({
    title,
    imageUrl,
    description,
    owner: req.user.sub
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