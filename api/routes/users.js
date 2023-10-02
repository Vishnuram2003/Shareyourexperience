const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
//Bcrypt
const bcrypt = require("bcrypt");

//UPDATE
router.put("/:id", async (req, res) => {
  console.log("inside put")
  if (req.body.userId === req.params.id) {
    console.log(req.params.id);
    console.log("inside settings update put ")
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    console.log("Correct pass")
    try {
      console.log(req.body);
      console.log(typeof req.body);
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body, //To update the fields mentioned in the req.body i.e only updating required fields
        },
        { new: true }
        );
        console.log(updatedUser)
        console.log("Updated user");
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        try {
          await Post.deleteMany({ username: user.username });
          await User.findByIdAndDelete(req.params.id);
          res.status(200).json("User has been deleted");
          const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body, //To update the fields mentioned in the req.body i.e only updating required fields
            },
            { new: true }
          );
          res.status(200).json(updatedUser);
        } catch (error) {
          res.status(500).json(error);
        }
      }
    } catch (error) {
      res.status(400).json("User not found");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});
//GETUSER
router.get("/:id",async(req,res)=>{
  try{
    const user = await User.findById(req.params.id);
    const {password,...others}=user._doc;
    res.status(200).json(others)
  }
  catch(err){
    res.status(500).json(err)
  }
})

module.exports = router;
