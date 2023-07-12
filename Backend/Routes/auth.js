const expr = require("express")
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const router = expr.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "iamdevesh"


//Route 1 for creating user
//creating new user with post method on /api/auth/createuser
router.post("/createuser",
   [body('name', "enter valid name").isLength({ min: 3 }),
   body('Email', "enter valid email").isEmail(),
   body('Password', "password length must be 5").isLength({ min: 5 })],
   async (req, res) => {
      let success = false;
      //if there are errors in validation then return the errors


      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() })
      }

      try {
         //check wether this email is already exists or not 
         let user = await User.findOne({ Email: req.body.Email })
         if (user) {
            return res.status(400).json({ success, error: "sorry a user with this email already exists" })
         }


         //generating hash password 
         const salt = await bcrypt.genSalt(10)
         const securepass = await bcrypt.hash(req.body.Password, salt)

         //create a new user
         user = await User.create({
            name: req.body.name,
            Email: req.body.Email,
            Password: securepass
         })

         const data = { user: { id: user.id } }
         const authtoken = jwt.sign(data, JWT_SECRET)

         //response the body data on web page
         // res.json(user)
         success = true
         res.json({ success, authtoken })

      }

      //if any error in try block code or any error in db then catch block will run and give the error 
      catch (error) {
         console.error(error)
         res.status(500).send("some error occured")
      }

   })



//Route 2 for login
//Authenticate a user on /api/auth/login using post
router.post("/login",
   [body('Email', "enter valid email").isEmail(),
   body('Password', "password can not be blank").exists()],
   async (req, res) => {
      let success = false;
      //if there are errors in validation then return the errors

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() })
      }


      try {

         let user = await User.findOne({ Email: req.body.Email })

         //check the user exists or not
         if (!user) {
            return res.status(400).json({ success, error: 'try to login with correct credntials' })
         }

         //matches the db password and user password
         const passwordfetch = await bcrypt.compare(req.body.Password, user.Password)
         if (!passwordfetch) // if password not match then give bad requests
         {
            return res.status(400).json({ success, error: 'try to login with correct credntials' })
         }

         //fetch the user id and give authentication token
         const data = { user: { id: user.id } }
         const authtoken = jwt.sign(data, JWT_SECRET)
         console.log(authtoken)

         //response the body data on web page
         // res.json(user)
         success = true
         res.json({ success, authtoken })
      }

      catch (error) {
         console.error(error)
         res.status(500).send("some error occured")
      }

   })


//Route 3 for get a loggedin user details using post method /api/auth/getuser

//fetchuser middleware fetch th user by authtoken and give the user 
router.post("/getuser", fetchuser, async (req, res) => {


   try {
      //by fetching user by fetchuser middleware it give user by auth token then b=from user id pint the all details of user 
      userId = req.user.id
      const user = await User.findById(userId).select("-Password")
      res.send(user)
   }


   catch (error) {
      console.error(error)
      res.status(500).send("some error occured")
   }


})

module.exports = router