document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("validationCustom01").value;
  const password = document.getElementById("validationCustomPas").value;

  if (email === "" && password === "") {
    const message = document.getElementById("message");
    message.textContent = "Пожалуйста, заполните все поля";
    message.style.color = "red";

    const inputs = document.querySelectorAll("input");
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].value !== "") {
        inputs[i].style.borderColor = "green";
      } else {
        inputs[i].style.borderColor = "red";
      }

      inputs[i].addEventListener("input", function () {
        if (this.value !== "") {
          this.style.borderColor = "green";
        } else {
          this.style.borderColor = "red";
        }
      });
    }
    return;
  } else if (email === "") {
    const message = document.getElementById("message");
    message.textContent = "Пожалуйста, введите почту";
    message.style.color = "red";

    document.getElementById("validationCustom01").style.borderColor = "red";
    document
      .getElementById("validationCustom01")
      .addEventListener("input", function () {
        if (this.value !== "") {
          this.style.borderColor = "green";
        } else {
          this.style.borderColor = "red";
        }
      });

    return;
  } else if (password === "") {
    const message = document.getElementById("message");
    message.textContent = "Пожалуйста, введите пароль";
    message.style.color = "red";

    document.getElementById("validationCustomPas").style.borderColor = "red";
    document
      .getElementById("validationCustomPas")
      .addEventListener("input", function () {
        if (this.value !== "") {
          this.style.borderColor = "green";
        } else {
          this.style.borderColor = "red";
        }
      });

    return;
  }

  document.getElementById("myForm").submit();
});
