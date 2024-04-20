const { Authadmin } = require("../models/AuthModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

// check if user is logged in and provide JWT token if he is.

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isThere = await Authadmin.findOne({ email });

    if (isThere === null) {
      res.json("Admin does not exist, register admin before trying"); //.status(400)
    } else {
      const userId = isThere._id;
      if (isThere.email === email) {
        if (await bcrypt.compare(password, isThere.password)) {
          const accesstoken = JWT.sign({ email, userId }, process.env.JWTACCESSTOKENSECRET, {
            expiresIn: "10h",
          });
          const refreshtoken = JWT.sign({ email, userId }, process.env.JWTREFRESHTOKENSECRET, {
            expiresIn: "12h",
          });

          res.cookie("accesstoken", accesstoken, {
            // maxAge: 60000,
            httpOnly: true,
            secure: true,
            // sameSite: "Strict",
          });

          res.cookie("refreshtoken", refreshtoken, {
            // maxAge: 300000,
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
          });
          res.status(200).json("Login Sucessfull!");
        } else {
          res.json("Incorrect Credentials");
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

//  add new admin
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isThere = await admin.findOne({ email }); //check if user exists returns an object|null
    if (name && email && password) {
      if (isThere === null) {
        //if null then then user does not exist
        const hashPass = await bcrypt.hash(password, 12);
        const data = await admin.create({ name, email, password: hashPass }).then((dt) => {
          //create user user
          // console.log(dt); // remove later
          res.status(201).json("Admin Created Sucessfully");
        });
      } else {
        if (isThere.email === email) {
          res.json(`Admin already exist using email ${email}`);
        }
      }
    } else {
      res.json("Name, Email and Password required.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
};

// check if admin is valid using jwt tokens

const isAdminValid = async (req, res, next) => {
  try {
    const accesstoken = req.cookies.accesstoken;
    const refreshtoken = req.cookies.refreshtoken;

    if (!accesstoken) {
      if (!refreshtoken) {
        return res.status(401).json({ message: "Admin not logged in" });
      } else {
        JWT.verify(refreshtoken, process.env.JWTREFRESHTOKENSECRET, (err, decode) => {
          if (err) {
            console.log(err);
            return res.status(401).json({ valid: false, message: "Invalid refresh token" });
          } else {
            const email = decode.useremail;
            const userId = decode.userId;
            const newAccessToken = JWT.sign({ email, userId }, process.env.JWTACCESSTOKENSECRET, {
              expiresIn: "10m",
            });

            res.cookie("accesstoken", newAccessToken, {
              maxAge: 60000,
              httpOnly: true,
              secure: true,
            });
            next();
          }
        });
      }
    } else {
      JWT.verify(accesstoken, process.env.JWTACCESSTOKENSECRET, (err, decode) => {
        if (err) {
          console.log(err);
          return res.status(401).json({ valid: false, message: "Invalid access token" });
        } else {
          return next();
        }
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = { loginAdmin, registerAdmin, isAdminValid };
