const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require('../models/User')

router.post('/register', async (req, res) => {
    try{
        const  salt = await bcrypt.genSalt(10); 
        const hashedPass  = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        })

        const user = await newUser.save();
        res.status(200).json(user)

    } catch(err){
        res.status(500).json(err)
    }
});


router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    User.findOne({username})
    .then((user) => {
        if(!user){
            return res.status(401).json({error: 'Invalid credentials'})
        }

        bcrypt.compare(password, user.password)
        .then((isMatch)=> {
                if(!isMatch){
                    return res.status(401).json({error: 'Invalid credentials'})
                }
        })
    })
    .catch((error) => {
        console.error('Failed to find user:', error)
        res.status(500).json({error: 'Login failed'})
    })
})

router.post('/logout', (req,res)=> {
    User.deleteOne({username})
})

module.exports = router;


