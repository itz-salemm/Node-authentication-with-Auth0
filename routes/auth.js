const router = require("express").Router()
const User = require('../model/User');
const Joi = require('joi');

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
    const {error} = schema.validate({name: req.body.name, email:req.body.email, password:req.body.password})
    if(error) return res.send(error.details[0].message)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    try {
        const savedUser = await user.save()
        res.send(savedUser)
    }
    catch(err) {
        res.status(400).send(err)
    }
    
	
})

module.exports = router