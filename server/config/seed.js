
var User = require('../apis/user/userModel');

var user = {
    name: "Admin User",
    email: "admin@gmail.com",
    password:"$2b$10$tbSZP8IZYfEw/3FcZZhSLOsuQhxBSw.2dHYcofSnXU9m1fdE.manK",
    phone: "000000"
}

obj = new User(user)
obj.save().then(data=>{
  console.log(data)
})
router.get('/', function (req, res) {
  res.status(200).send("Welcome to AAdmin Routes of ECommerce");
})

