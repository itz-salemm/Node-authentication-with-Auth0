const router = require("express").Router()
const verifyauth = require('../verifyauth')


router.get('/', verifyauth, (req, res) => {
	res.send("Random post you shouldnt acesss")
})


module.exports = router