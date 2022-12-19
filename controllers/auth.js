const jwt = require("jsonwebtoken");
const Admin = require("../modals/admin");
const nodemailer = require("nodemailer");
const expressJwt = require("express");

// CREATING ADMIN
exports.createAdmin = async (req, res) => {
  await Admin.find()
    .then(async (admins) => {
      const results = admins;

      const userExist = await Admin.findOne({ email: req.body.email });

      if (userExist) {
        return res
          .status(403)
          .json({ error: "This Email Already Exist Kindly choose other one" });
      }

      if (admins.length < 2) {
        const admin = new Admin(req.body);
        await admin.save((err, admin) => {
          if (err || !admin) {
            return res.status(403).json({ err });
          }
          return res
            .status(200)
            .json({ message: "Signup Successful...!, Please Login" });
        });
      } else {
        return res
          .status(401)
          .json({ err: "you can not add more then two admins" });
      }
    })

    .catch((err) => console.log(err));
};

// ADMIN LOGIN

exports.adminLogin = async (req, res) => {
  Admin.findOne({ email: req.body.email }, (err, admin) => {
    // if email exist in database
    if (err || !admin) {
      console.log(err);
      return res
        .status(401)
        .json({ error: "Your are not signup...! Please Signup First" });
    }

    // AUTHENTICATE PASSWORD IS CORRECT OR NOT
    if (!admin.authenticate(req.body.password)) {
      return res.status(401).json({
        error: "Your Password is wrong...!, Kindly Re enter correct password",
      });
    }

    // FINAL WE WILL RETURN ADMIN DATA AND TOKEN TO THE ADMIN
    const token = jwt.sign({ _id: admin._id }, process.env.SECRETE);

    res.cookie("t", token, { expire: new Date() + 5 });

    const { _id, firstName, lastName, email } = admin;

    return res
      .status(200)
      .json({ admin: { _id, firstName, lastName, email }, token });
  });
  // new comment i shere
};

// SEND QUERY

exports.requireSignIn = expressJwt({
  secret: process.env.SECRETE,
  requestProperty: "auth",
});

exports.sendQuery = async (req, res) => {
  // console.log(req.body)
  // const transportor = nodemailer.createTransport({
  //     host: 'mail.meezamimpex.com',
  //     port: 26,
  //     secure:false,
  //     auth: {
  //         user: 'info@meezamimpex.com',
  //         pass: 'Nokiac101#'
  //     },
  //     tls:{
  //         rejectUnauthorized: false
  //     }
  // })

  // const mailOptions= {
  //     to: "admin@meezamimpex.com",
  //     // subject: req.body.subject,
  //     // from: req.body.email,
  //     // html: req.body.cart,

  //     subject: "this is my subject",
  //     from: ' "bilal ashraf" <info@meezamimpex.com> ',
  //     html: "<h1> hi this is test email </h1>"
  // }

  // transportor.sendMail(mailOptions, (err, info)=>{
  //    if(err){
  //        console.log('error ocurred', err)
  //    }

  //    console.log('message sendt,', info)
  // })

  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "mail.meezamimpex.com",
    port: 26,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "info@meezamimpex.com", // generated ethereal user
      pass: "Nokiac101#", // generated ethereal password
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"${req.body.name}" <${req.body.email}>`, // sender address
    to: "bilalashraf6233@gmail.com", // list of receivers
    subject: req.body.subject, // Subject line
    //   text: "Hello world?", // plain text body
    html: req.body.cart, // html body
  });

  if (info.messageId) {
    res.status(200).json({
      messageId: info.messageId,
      status: "message sent...!",
      testMessageUrl: nodemailer.getTestMessageUrl(info),
    });
  } else {
    console.log(info);
    res.status(400).json({
      messageId: null,
      status: "Message Not Sent",
    });
  }

  res.send("request received...");

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

// exports.signout = (req, res) =>{
//     res.clearCookie("t");
//     res.json({message: "signout Success"})
// }

// exports.requireSignIn = expressJwt({
//     secret: process.env.JWT_SECRET,
//     userProperty: "auth"
// })
