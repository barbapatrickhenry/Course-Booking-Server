// [SECTION] Dependencies and Modules
const bcrypt = require('bcrypt');

const User = require("../models/User");
const auth = require("../auth");


//[SECTION] Check if the email already exists
module.exports.checkEmailExists = (req,res) => {

	if(req.body.email.includes("@")){

		return User.find({ email: req.body.email })
				.then(result => {

					if (result.length > 0) {

						return res.status(409).send({ error: "Duplicate Email Found" });

					} else {


						return res.status(404).send({ message: "Email not found" });
					}


				}).catch(err => {
					console.error("Error in find", err)
					return res.status(500).send({ error: "Error in find"});
				});

	} else {

		//res.status(400).send(false);
		res.status(400).send({ error: "Invalid Email"});
	}
};


//[SECTION] Retrieve all users
module.exports.getAllUsers = (req, res) => {

	return User.find({ isAdmin: false })
	.then(users => {

		if(users.length > 0){

		    return res.status(200).send(users);

		}
		else{
		    
		    return res.status(200).send({ message: 'No users found.' });

		}
	})
	.catch(err => {

		console.error("Error in finding all users", err);

		return res.status(500).send({ error: "Error finding users"});

	});
};


//[SECTION] User registration
module.exports.registerUser = (req,res) => {

	if (!req.body.email.includes("@")){
	    
	    //return res.status(400).send(false);
	    return res.status(400).send({ error: "Email invalid" });
	}

	else if (req.body.mobileNo.length !== 11){
	    
	    //return res.status(400).send(false);
	    return res.status(400).send({ error: "Mobile number invalid" });
	}
	
	else if (req.body.password.length < 8) {
	    
	    //return res.status(400).send(false);
	    return res.status(400).send({ error: "Password must be atleast 8 characters" });
	
	} else {

		let newUser = new User({
			firstName : req.body.firstName,
			lastName : req.body.lastName,
			email : req.body.email,
			mobileNo : req.body.mobileNo,
			password : bcrypt.hashSync(req.body.password, 10)
		});

		return newUser.save()
				//.then(result => res.status(201).send(result))
				.then((user) => res.status(201).send({ message: "Registered Successfully" }))
				//.catch(err => res.status(500).send(err));
				.catch(err => {
					console.error("Error in saving: ", err)
					return res.status(500).send({ error: "Error in save"})
				});
	}
};


