function onCaptchaCallback(e) {
  window.checkValidForm();
}

$(function () {
  var $form = $("#messageForm");
  var $reset = $form.find("input:reset");
  var $submit = $form.find("input:submit");
  var $field = $form.find(".field");

  var checkValidString = function (value) {
    return $.trim(value);
  };

  var $validator = $form.validate({
    rules: {
      name: {
        required: true,
        normalizer: checkValidString
      },
      email: {
        required: true,
        email: true,
        normalizer: checkValidString
      },
      subject: {
        required: true,
        normalizer: checkValidString
      },
      message: {
        required: true
      }
    }
  });

  var checkValidForm = function () {
    var gcha = grecaptcha.getResponse();
    if ($form.valid() && gcha && gcha !== "") {
      $submit.removeClass("disabled");
      return true;
    } else {
      $submit.addClass("disabled");
      return false;
    }
  };

  $field.on("blur", function (e) {
    checkValidForm();
  });

  $reset.on("click", function (e) {
    $validator.resetForm();
    grecaptcha.reset();
    $submit.addClass("disabled");
  });

  var getAllParams = function () {
    return {
      "name": $form.find("#name").val(),
      "email": $form.find("#email").val(),
      "subject": $form.find("#subject").val(),
      "message": $form.find("#message").val(),
      "g-recaptcha-response": $form.find(".g-recaptcha-response").val()
    };
  };

  $form.on('submit', function (e) {
    e.preventDefault();

    if (checkValidForm()) {
      $.ajax({
          method: "POST",
          url: "/contactus",
          data: getAllParams()
        })
        .done(function (result) {
          console.log('after post: ', result);
          alert("Thank you.");
          $reset.trigger("click");
        })
        .fail(function(err){
          console.log('error after post', err);
        });
    }

  });

  window.checkValidForm = checkValidForm;
});
