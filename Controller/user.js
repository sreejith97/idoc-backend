const User = require("../models/user");

exports.addUser = async (req, res) => {
  try {
    const newUser = new User({
      finger_id: req.body.finger_id,
      user_name: req.body.user_name,
      user_number: req.body.user_number,
      user_mail: req.body.user_mail,
      user_address: req.body.user_address,
      user_role: req.body.user_role,
    });
    const user = await newUser.save();
    res.status(200).json({ sucess: true });
  } catch (err) {
    res.status(500).json({ sucess: false, err });
  }
};



exports.userLogin = async (req, res) => {
  try {
    const details = req.body;
    //console.log(details,"detailzzz");
    const userFromDatabase = await User.findOne({
      user_mail: details.user_mail,
    });
    console.log("user from database", userFromDatabase);
    // console.log("*****************************");
    //console.log(user);
    res.status(200).json({
      sucess: true,
      data: {
        user_name: userFromDatabase.user_name,
        user_number: userFromDatabase.user_number,
        user_mail: userFromDatabase.user_mail,
        user_address: userFromDatabase.user_address,
        user_feed: userFromDatabase.user_feed,
      },
    });
  } catch (err) {
    res.status(500).json({ sucess: false, err });
  }
};



exports.userFeed = async (req, res) => {
  const {id,user_feed} = req.body;
    await User.findOne({ _id: id })
    .then((savedUser)=>{
	if (!savedUser) res.status(404).json({success: false})
   	else {
        var myquery = {_id : id};
        var newvalues = {$set: {user_feed: user_feed}};
        User.updateOne(myquery,newvalues,function(err,res){
          if(err)throw err;
          console.log("updated feedback"); 
        })
        return res.status(200).json({ sucess: true }); 
      }
    })     
};


exports.checkFeed = async (req, res) => {
  try {
    const details = req.body;
    const userFromDatabase = await User.findOne({
      _id: details.id,
    });
    console.log("user from database", userFromDatabase);

    res.status(200).json({
      sucess: true,
      data: {
        user_feed: userFromDatabase.user_feed,
      },
    });
  } catch (err) {
    res.status(500).json({ sucess: false, err });
  }
};