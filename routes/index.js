var express = require("express");

var bodyParser = require("body-parser");

var router = express.Router();
var path = require("path");

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var nodemailer = require("nodemailer");

var handlebars = require("handlebars");
var fs = require("fs");

const { template } = require("handlebars");

require("dotenv").config();

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
router.post("/sendemail", urlencodedParser, function (req, res) {
  const { fname, lname, email, subject, message } = req.body;

  var subjectname = "MidroHub Contact Form";

  var HelperOptions = {
    from: '"' + subjectname + '" <' + process.env.GMAIL_USER + ">",
    to: process.env.GMAIL_USER,
    cc: process.env.ADMIN_GMAIL_USER,
    subject: "New message from contact form",
    html:
      `<b>Subject</b> - ${subject} <br><b>Message</b> - ${message} <br><br>This mail was sent from <b> ${email} (${fname} ${lname}) </b>` 
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
    //console.log("successful", info.messageId, info.response);
    //console.log(info);
    var responseHeader = "Thank you!";
    var response =
      "Thank you for reaching out to us...We would get back to you shortly...";

    acknowledge(
      "toyosi",
      "temitoyosi@gmail.com",
      process.env.GMAIL_USER,
      process.env.GMAIL_PASS
    );

    return res.send({
      responseHeader: responseHeader,
      responseText: response,
      success: "Updated Successfully",
      status: 200,
    });
  });
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
});
//console.log(path.join(__dirname , '../public/email_template/index.html'));
function acknowledge(clientName, clientEmail, _myEmail, _myPassword) {
  var readHTMLFile = function (pathString, callback) {
    fs.readFile(pathString, { encoding: "utf-8" }, function (err, html) {
      if (err) {
        callback(err);
        throw err;
      } else {
        callback(null, html);
      }
    });
  };
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: _myEmail,
      pass: _myPassword,
    },
  });
try {
  readHTMLFile(
    
    path.join(__dirname, "../public/email_template/index.html"),
    function (err, html) {
      var template = handlebars.compile(html);
     
      var replacements = {
        clientName: clientName,
        clientEmail: clientEmail,
      };

      console.log(replacements);
      var htmlToSend = template(replacements);

      var MailOptions = {
        from: "MidroHub" + '" <' + _myEmail + ">",
        to: clientEmail,
        bcc: process.env.ADMIN_GMAIL_USER,
        subject: "Thanks for contacting Midrohub",
        html: htmlToSend,
      };

      console.log(MailOptions);

      transporter.sendMail(MailOptions, (error, info) => {
        if (error) {
          console.log("error in transporter");
          return;
        } else {
          console.log("successful", info.messageId, info.response);
          console.log(info);
          return;
        }
      });
    }
  );

  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
} catch (error) {
  console.log(error.message)
}
 
}

module.exports = router;
