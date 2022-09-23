console.log("the script is properly referenced");

var alert = $("#alert-msg"); // alert div for show alert message
var alertName = $("#alert-name-msg"); // alert div for show alert message
var alertFname = $("#alert-fname-msg"); // alert div for show alert message
var alertLname = $("#alert-lname-msg"); // alert div for show alert message
var alertEmail = $("#alert-email-msg"); // alert div for show alert message
var alertSubject = $("#alert-subject-msg"); // alert div for show alert message
var alertMessage = $("#alert-message-msg"); // alert div for show alert message

function validateEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function validateForm() {
  $("#email").on("keyup", function () {
    validateEmail(email);
  });

  var nameIs = document.forms["contactForm"]["name"].value;
  var fnameIs = document.forms["contactForm"]["fname"].value;
  var lnameIs = document.forms["contactForm"]["lname"].value;
  var emailIs = document.forms["contactForm"]["email"].value;
  var subjectIs = document.forms["contactForm"]["subject"].value;
  var messageIs = document.forms["contactForm"]["message"].value;

  if (nameIs === "" || nameIs === null) {
    alertName
      .html("<small style='float:right'>Your name is required</small>").css('color','red')
      .fadeIn("slow");
  }
  if (emailIs === "" || emailIs === null) {
    alertEmail
      .html("<small style='float:right'>Your email is required</small>").css('color','red')
      .fadeIn("slow");
  }
  if (fnameIs === "" || fnameIs === null) {
    alertFname
      .html("<small style='float:right'>Your firstname is required</small>").css('color','red')
      .fadeIn("slow");
  }
  if (lnameIs === "" || lnameIs === null) {
    alertLname
      .html("<small style='float:right'>Your lastname is required</small>").css('color','red')
      .fadeIn("slow");
  }
  if (subjectIs === "" || subjectIs === null) {
    alertSubject
      .html("<small style='float:right'>Your subject is required</small>").css('color','red')
      .fadeIn("slow");
  }
  if (messageIs === "" || messageIs === null) {
    alertMessage
      .html("<small style='float:right'>Your message is required</small>").css('color','red')
      .fadeIn("slow");
  }

  $("#email").on("keyup", function () {
    validateEmail(email);
    alertEmail.fadeOut("slow");
  });

  $("#name").keyup(function () {
    alertName.fadeOut("slow");
  });
  $("#fname").keyup(function () {
    alertFname.fadeOut("slow");
  });
  $("#lname").keyup(function () {
    alertLname.fadeOut("slow");
  });
  $("#subject").on("keyup", function () {
    alertSubject.fadeOut("slow");
  });
  $("#message").on("keyup", function () {
    alertMessage.fadeOut("slow");
  });
}

$("#submitButton").click(function (e) {
  e.preventDefault();
  $("#alert-msg").hide();
  validateForm();

  var form = $("#contactForm"); // contact form

  var submit = $("#submitButton"); // submit button

  fname = $("#fname").val();
  lname = $("#lname").val();

  email = $("#email").val();

  subject = $("#subject").val();

  message = $("#message").val();

  var dataObject = {
    fname: fname,
    lname: lname,
    email: email,
    subject: subject,
    message: message,
  };

  //no alert message yet
  // if (fname == "" || fname == null || lname == "" || lname == null || email == "" || email == null || subject == "" || subject == null || message == "" || message == null) {

  //     $('#alert-msg').html("<p style='text-align:center' class='alert alert-danger'>Please fill in all the fields. All fields are required.</p>")
  //     $('#alert-msg').show();
  //     validateForm();

  // }

  if (
    fname !== "" &&
    lname !== "" &&
    email !== "" &&
    subject !== "" &&
    message !== ""
  ) {
    console.log(dataObject);
   
    $.ajax({
      url: "/sendemail", // form action url
      type: "POST", // form submit method get/post
      dataType: "json", // request type html/json/xml
      data: dataObject, // serialize form data

      success: function (response) {
        //$('#alert-msg').hide();
        submit.html("<i class = 'fa fa-spinner fa-spin'></i> Sending...");
        $('#contactForm :input').attr('disabled', 'disabled');
         $('#contactForm').fadeTo("slow", 1, function () {
        //     $('#contactForm').find(':input').attr('disabled', true);
        //     $('#contactForm').find('label').css('cursor', 'default');
        //     $('#success').fadeIn()
        //     $('.modal').modal('hide');
        //     $('#modal-success-header').html(response.responseHeader);
        //     $('#modal-success-content').html(response.responseText);
        //     $('#success').modal('show');
             swal("Message has been sent", "", "success");
             form.trigger('reset'); // reset form
             submit.html("Send Message");// reset submit button text
             $('#contactForm').find(':input').attr('disabled', false);

         });
        console.log(response);
        
      },
      error: function () {
         $('#contactForm').fadeTo("slow", 1, function () {
        //     $('#error').fadeIn()
        //     $('.modal').modal('hide');
        //     $('#error').modal('show');
             submit.html("Send Message");
         });
      },
    });
  }

  // $('#alert-msg').html("<p style='text-align:center' class='alert alert-danger'>Please fill in all the fields. All fields are required.</p>")
  // validateForm();
});
