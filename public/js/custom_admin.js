var alertHeader = $("#alert-header-msg"); // alert div for show alert message
var alertSubject = $("#alert-subject-msg"); // alert div for show alert message
var alertBody = $("#alert-body-msg"); // alert div for show alert message
$("#previewBtn").click(function (e) {
  e.preventDefault();
  $("#alert-msg").hide();
  validateForm();

  var form = $("#newsletterForm"); // contact form

  var submit = $("#previewBtn"); // submit button

  var header = $("#header").val();
  var subject = $("#subject").val();
  var body = $("#body").val();

  var dataObject = {
    header,
    subject,
    body,
  };

  if (header !== "" && subject !== "" && body !== "") {
    submit.html("<i class = 'fa fa-spinner fa-spin'></i> Previewing...");
    $("#newsletterForm :input").attr("disabled", "disabled");
    console.log(dataObject)
    $.ajax({
      url: "/admin/preview", // form action url
      type: "POST", // form submit method get/post
      dataType: "json", // request type html/json/xml
      data: dataObject, // serialize form data
      success: function (response) {
        console.log(response, "-------",response.template.length);
        //const { responseHeader, responseText, status } = response;
        if (response) {
          Swal.fire({
            icon: "success",
            title: "",
            html: response.template,
            customClass: 'swal-wide',
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });

          $("#newsletterForm").fadeTo("slow", 1, function () {
            //form.trigger("reset"); // reset form
            submit.html("Preview"); // reset submit button text
            $("#newsletterForm").find(":input").attr("disabled", false);
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "responseHeader",
            text: "responseText",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
            confirmButtonColor: "#007bff",
          });

          $("#newsletterForm").fadeTo("slow", 1, function () {
            //form.trigger("reset"); // reset form
            submit.html("Send Message"); // reset submit button text
            $("#newsletterForm").find(":input").attr("disabled", false);
          });
        }
      },
      error: function () {
        console.log("here in error")
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
        $("#newsletterForm").fadeTo("slow", 1, function () {
          form.trigger("reset"); // reset form
          submit.html("Send Message"); // reset submit button text
          $("#newsletterForm").find(":input").attr("disabled", false);
        });
        $("#newsletterForm").fadeTo("slow", 1, function () {
          submit.html("Send Message");
        });
      },
    });
  }
});

$("#sendBtn").click(function (e) {
    e.preventDefault();
    $("#alert-msg").hide();
    validateForm();
  
    var form = $("#newsletterForm"); // contact form
  
    var submit = $("#sendBtn"); // submit button
  
    var header = $("#header").val();
    var subject = $("#subject").val();
    var body = $("#body").val();
  
    var dataObject = {
      header,
      subject,
      body,
    };
  
    if (header !== "" && subject !== "" && body !== "") {
      submit.html("<i class = 'fa fa-spinner fa-spin'></i> Previewing...");
      $("#newsletterForm :input").attr("disabled", "disabled");
      console.log(dataObject)
      $.ajax({
        url: "/admin/send", // form action url
        type: "POST", // form submit method get/post
        dataType: "json", // request type html/json/xml
        data: dataObject, // serialize form data
        success: function (response) {
          console.log("----------".response, "-------");
          //const { responseHeader, responseText, status } = response;
          if (response.status == 200) {
            Swal.fire({
              icon: "success",
              title: responseHeader,
              text: responseText,
              customClass: 'swal-wide',
              showClass: {
                popup: "animate__animated animate__fadeInDown",
              },
              hideClass: {
                popup: "animate__animated animate__fadeOutUp",
              },
            });
  
            $("#newsletterForm").fadeTo("slow", 1, function () {
              form.trigger("reset"); // reset form
              submit.html("Preview"); // reset submit button text
              $("#newsletterForm").find(":input").attr("disabled", false);
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
  
            $("#newsletterForm").fadeTo("slow", 1, function () {
              form.trigger("reset"); // reset form
              submit.html("Send Newsletter"); // reset submit button text
              $("#newsletterForm").find(":input").attr("disabled", false);
            });
          }
        },
        error: function () {
          console.log("here in error")
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
            confirmButtonColor: "#007bff",
          });
          $("#newsletterForm").fadeTo("slow", 1, function () {
            form.trigger("reset"); // reset form
            submit.html("Send Newsletter"); // reset submit button text
            $("#newsletterForm").find(":input").attr("disabled", false);
          });
          $("#newsletterForm").fadeTo("slow", 1, function () {
            submit.html("Send Message");
          });
        },
      });
    }
  });
function validateForm() {
  var subjectIs = document.forms["newsletterForm"]["subject"].value;
  var headerIs = document.forms["newsletterForm"]["header"].value;
  var bodyIs = document.forms["newsletterForm"]["body"].value;

  if (headerIs === "" || headerIs === null) {
    alertHeader
      .html("<small style='float:right'>Your header is required</small>")
      .css("color", "red")
      .fadeIn("slow");
  }
  if (subjectIs === "" || subjectIs === null) {
    alertSubject
      .html("<small style='float:right'>Your subject is required</small>")
      .css("color", "red")
      .fadeIn("slow");
  }
  if (bodyIs === "" || bodyIs === null) {
    alertBody
      .html("<small style='float:right'>Your body is required</small>")
      .css("color", "red")
      .fadeIn("slow");
  }

  $("#header").keyup(function () {
    alertHeader.fadeOut("slow");
  });
  $("#subject").on("keyup", function () {
    alertSubject.fadeOut("slow");
  });
  $("#message").on("keyup", function () {
    alertMessage.fadeOut("slow");
  });
}
