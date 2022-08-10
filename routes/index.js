var express = require("express");

var router = express.Router();

var nodemailer = require("nodemailer");

require("dotenv").config();

console.log("i got here");
router.get("/", function (req, res) {
  try {
    res.render("index", {
      title: "Index",
    });
  } catch (err) {
    console.log("error rendering index properly");
  }
});

//contact form mail service
router.post("/", function (req, res) {
  const { name, email, subject, message } = req.body;

  var subjectname = "MidroHub Contact Form";

  var HelperOptions = {
    from: '"' + subjectname + '" <' + process.env.GMAIL_USER + ">",
    to: process.env.GMAIL_USER,
    cc: process.env.ADMIN_GMAIL_USER,
    subject: "New message from contact form",
    html:
      `<b>Subject</b> - ` +
      subject +
      `<br><b>Message</b> - ` +
      message +
      `<br><br>This mail was sent from ` +
      `<b>` +
      email +
      `(` +
      name +
      `)` +
      `</b>`,
  };

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  transporter.sendMail(HelperOptions, (error, info) => {
    if (error) {
      console.log("error in transporter");
      console.log(error);
      var responseHeader = "Oops!";
      var response = "Error sending mail...Please do try again.";

      return res.send({
        responseHeader: responseHeader,
        responseText: response,
        success: "Unable to send mail successfully",
        status: 500,
      });
    }
    console.log("successful", info.messageId, info.response);
    console.log(info);
    var responseHeader = "Thank you!";
    var response =
      "Thank you for reaching out to us...We would get back to you shortly...";
    return res.send({
      responseHeader: responseHeader,
      responseText: response,
      success: "Updated Successfully",
      status: 200,
    });
  });
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
});

module.exports = router;
