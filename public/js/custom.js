console.log("the script is properly referenced");

document.getElementById("enrollButton").addEventListener("click", function () {
  document.getElementById("subject").value = "Enrollment";
  document.getElementById("message").value =
    "Hello, I would like to enroll in the MidroHub Academy Program.";
});

var alertFname = $("#alert-fname-msg"); // alert div for show alert message
var alertLname = $("#alert-lname-msg"); // alert div for show alert message
var alertEmail = $("#alert-email-msg"); // alert div for show alert message
var alertSubject = $("#alert-subject-msg"); // alert div for show alert message
var alertMessage = $("#alert-message-msg"); // alert div for show alert message

$("#email").on("keyup", function () {
  let isValid = validateEmail($("#email").val());
  if (isValid) {
    alertEmail.fadeOut("slow");
  } else {
    alertEmail
      .html("<small style='float:right'>Your email is invalid</small>")
      .css("color", "red")
      .fadeIn("slow");
  }
});

function validateEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function validateForm() {
  var fnameIs = document.forms["contactForm"]["fname"].value;
  var lnameIs = document.forms["contactForm"]["lname"].value;
  var emailIs = document.forms["contactForm"]["email"].value;
  var subjectIs = document.forms["contactForm"]["subject"].value;
  var messageIs = document.forms["contactForm"]["message"].value;

  if (emailIs === "" || emailIs === null) {
    alertEmail
      .html("<small style='float:right'>Your email is required</small>")
      .css("color", "red")
      .fadeIn("slow");
  }
  if (fnameIs === "" || fnameIs === null) {
    alertFname
      .html("<small style='float:right'>Your firstname is required</small>")
      .css("color", "red")
      .fadeIn("slow");
  }
  if (lnameIs === "" || lnameIs === null) {
    alertLname
      .html("<small style='float:right'>Your lastname is required</small>")
      .css("color", "red")
      .fadeIn("slow");
  }
  if (subjectIs === "" || subjectIs === null) {
    alertSubject
      .html("<small style='float:right'>Your subject is required</small>")
      .css("color", "red")
      .fadeIn("slow");
  }
  if (messageIs === "" || messageIs === null) {
    alertMessage
      .html("<small style='float:right'>Your message is required</small>")
      .css("color", "red")
      .fadeIn("slow");
  }

  $("#email").on("keyup", function () {
    let isValid = validateEmail($("#email").val());

    isValid && alertEmail.fadeOut("slow");
  });

  $("#fname").keyup(function () {
    console.log("skhfks");
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

  if (
    fname !== "" &&
    lname !== "" &&
    email !== "" &&
    validateEmail(email) == true &&
    subject !== "" &&
    message !== ""
  ) {
    submit.html("<i class = 'fa fa-spinner fa-spin'></i> Sending...");
    $("#contactForm :input").attr("disabled", "disabled");
    $.ajax({
      url: "/sendemail", // form action url
      type: "POST", // form submit method get/post
      dataType: "json", // request type html/json/xml
      data: dataObject, // serialize form data

      success: function (response) {
        console.log(response);
        const { responseHeader, responseText, status } = response;
        if (status === 200) {
          Swal.fire({
            icon: "success",
            title: responseHeader,
            text: responseText,
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });

          $("#contactForm").fadeTo("slow", 1, function () {
            form.trigger("reset"); // reset form
            submit.html("Send Message"); // reset submit button text
            $("#contactForm").find(":input").attr("disabled", false);
          });
        } else {
          Swal.fire({
            icon: "error",
            title: responseHeader,
            text: responseText,
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
            confirmButtonColor: "#007bff",
          });

          $("#contactForm").fadeTo("slow", 1, function () {
            form.trigger("reset"); // reset form
            submit.html("Send Message"); // reset submit button text
            $("#contactForm").find(":input").attr("disabled", false);
          });
        }
      },
      error: function () {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "An error occured.",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          customClass: "swal-wide",
          confirmButtonColor: "#007bff",
        });
        $("#contactForm").fadeTo("slow", 1, function () {
          form.trigger("reset"); // reset form
          submit.html("Send Message"); // reset submit button text
          $("#contactForm").find(":input").attr("disabled", false);
        });
        $("#contactForm").fadeTo("slow", 1, function () {
          submit.html("Send Message");
        });
      },
    });
  }
});

$("#subscribeButton").click(function (e) {
  e.preventDefault();
  $("#alert-msg").hide();
  var form = $("#subscribeForm"); // contact form
  var submit = $("#subscribeButton"); // submit button

  email = $("#subemail").val();

  var dataObject = {
    email,
  };

  if (validateEmail(email)) {
    submit.html("<i class = 'fa fa-spinner fa-spin'></i> Sending...");
    $("#subscribeForm :input").attr("disabled", "disabled");
    $.ajax({
      url: "/subscribe", // form action url
      type: "POST", // form submit method get/post
      dataType: "json", // request type html/json/xml
      data: dataObject, // serialize form data

      success: function (response) {
        console.log(response);
        const { responseHeader, responseText, status } = response;
        if (status === 200) {
          Swal.fire({
            icon: "success",
            title: responseHeader,
            text: responseText,
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });

          $("#subscribeForm").fadeTo("slow", 1, function () {
            form.trigger("reset"); // reset form
            submit.html("Send"); // reset submit button text
            $("#subscribeForm").find(":input").attr("disabled", false);
          });
        } else {
          Swal.fire({
            icon: "error",
            title: responseHeader,
            text: responseText,
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
            confirmButtonColor: "#007bff",
          });

          $("#subscribeForm").fadeTo("slow", 1, function () {
            form.trigger("reset"); // reset form
            submit.html("Send"); // reset submit button text
            $("#subscribeForm").find(":input").attr("disabled", false);
          });
        }
      },
      error: function () {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "An error occured.",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          customClass: "swal-wide",
          confirmButtonColor: "#007bff",
        });
        $("#subscribeForm").fadeTo("slow", 1, function () {
          form.trigger("reset"); // reset form
          submit.html("Send"); // reset submit button text
          $("#subscribeForm").find(":input").attr("disabled", false);
        });
        $("#subscribeForm").fadeTo("slow", 1, function () {
          submit.html("Send");
        });
      },
    });
  }
  else{
    Swal.fire({
      icon: "warning",
      title: "Oops!",
      text: "Please enter a valid email address",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
      customClass: "swal-wide",
      confirmButtonColor: "#007bff",
    });
    $("#subscribeForm").fadeTo("slow", 1, function () {
      form.trigger("reset"); // reset form
      submit.html("Send"); // reset submit button text
      $("#subscribeForm").find(":input").attr("disabled", false);
    });
    $("#subscribeForm").fadeTo("slow", 1, function () {
      submit.html("Send");
    });
  }
});
