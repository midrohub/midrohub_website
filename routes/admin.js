var express = require("express");

var bodyParser = require("body-parser");

var router = express.Router();
var path = require("path");

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var nodemailer = require("nodemailer");

var handlebars = require("handlebars");
var fs = require("fs");
const pool = require("../db");

const { template } = require("handlebars");

require("dotenv").config();

router.get("/", async function (req, res) {
  try {
    var susbscribers = await pool.query("select * from subscribers")
    console.log(susbscribers)
    var count = susbscribers.rowCount
    res.render("admin", {
      title: "Admin",
      count 
    });
  } catch (err) {
    console.log(err.message);
    res.render("admin", {
      title: "Admin",
      count: 0
    });
  }
});

router.post("/preview", urlencodedParser, function (req, res) {
  console.log(req.body);
  const { subject, header, body } = req.body;
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
  try {
    readHTMLFile(
      path.join(__dirname, "../public/email_template/newsletter.html"),
      function (err, html) {
        var template = handlebars.compile(html);

        var replacements = {
          header,
          body,
        };

        console.log(replacements);
        var htmlToSend = template(replacements);

        var response = {
          status: 200,
          template: htmlToSend,
        };
        return res.send(JSON.stringify(response));
        //let render = template();
      }
    );
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/send", urlencodedParser, function (req, res) {
  console.log(req.body);
  const { subject, header, body } = req.body;
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
  try {
    readHTMLFile(
      path.join(__dirname, "../public/email_template/newsletter.html"),
      async function (err, html) {
        var template = handlebars.compile(html);

        var replacements = {
          header,
          body,
        };

        console.log(replacements);
        var htmlToSend = template(replacements);

        var subscribers = await pool.query("select Email from subscribers");
        console.log(subscribers);
        emails = subscribers.rows.map((a) => a.email);
        console.log(emails);
        var MailOptions = {
          from: "MidroHub" + '" <' + myEmail + ">",
          to: emails,
          bcc: process.env.ADMIN_GMAIL_USER,
          subject: subject,
          html: htmlToSend,
        };

        console.log(MailOptions);

        transporter.sendMail(MailOptions, (error, info) => {
          if (error) {
            var responseHeader = "Oops!";
            var response = "Error sending mail...Please do try again.";

            return res.send({
              responseHeader: responseHeader,
              responseText: response,
              success: "Unable to send mail successfully",
              status: 500,
            });
          } else {
            console.log("successful", info.messageId, info.response);
            console.log(info);
            var responseHeader = "Thank you!";
            var response =
              "Newsletter sent successfully";
            
            return res.send({
              responseHeader: responseHeader,
              responseText: response,
              success: "Updated Successfully",
              status: 200,
            });
          }
        });
       
      }
    );
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
