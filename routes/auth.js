const router = require("express").Router()
const User = require('../model/User');
const jwt = require('jsonwebtoken')
const Joi = require('joi');
const { registerValidation, loginValidation } = require('../validate')
const bcrypt = require('bcryptjs')

const schema = Joi.object({
    name: Joi.string()
        .min(5)
        .required(),
    email: Joi.string()
      .min(5)
        .email()
        .required(),
    password: Joi.string()
        .min(5)
        .required(),

})

router.post('/register', async (req, res) => {
    const {error} = registerValidation({name: req.body.name, email:req.body.email, password:req.body.password})
    if(error) return res.send(error.details[0].message)

    // Check if email exist
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).send("Email already exist")

    // hashing password
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashpassword
    })

    try {
        const savedUser = await user.save()
        res.send(savedUser)
    }
    catch(err) {
        res.status(400).send(err)
    }
    
	
})

router.post('/login', async (req, res) => {
    const {error} = loginValidation({email:req.body.email, password:req.body.password})
    if(error) return res.send(error.details[0].message)

     // Check if email exist
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send("Email does not exist")
    //check password
    const validpass = await bcrypt.compare(req.body.password, user.password)
    if(!validpass) return res.status(400).send("Wrong password")

    const token = jwt.sign({_id: user._id}, process.env.SECRET_TOKEN)
    res.header('auth-token', token).send(token)
})

module.exports = router