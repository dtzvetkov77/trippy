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

// GET /api/destinations/:id - Get destination details
router.get('/:id', async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    res.json(destination);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT /api/destinations/:id - Update destination
router.put('/:id', async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    destination.title = req.body.title;
    destination.description = req.body.description;
    destination.imageUrl = req.body.imageUrl;

    await destination.save();
    res.json(destination);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE /api/destinations/:id - Delete destination
router.delete('/:id', async (req, res) => {
  try {
    await Destination.findByIdAndDelete(req.params.id);
    res.json({ message: 'Destination deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;