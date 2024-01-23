document.getElementById("post").addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("z").value;
  const content = document.getElementById("s").value;

  if (title === "" && content === "") {
    const messagePost = document.getElementById("message_post");
    messagePost.textContent = "Пожалуйста, заполните все поля";
    messagePost.style.color = "red";

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
    const textarea = document.querySelectorAll("textarea");
    for (var i = 0; i < textarea.length; i++) {
      if (textarea[i].value !== "") {
        textarea[i].style.borderColor = "green";
      } else {
        textarea[i].style.borderColor = "red";
      }

      textarea[i].addEventListener("input", function () {
        if (this.value !== "") {
          this.style.borderColor = "green";
        } else {
          this.style.borderColor = "red";
        }
      });
    }
    return;
  } else if (title === "") {
    const messagePost = document.getElementById("message_post");
    messagePost.textContent = "Пожалуйста, напишите заголовок";
    messagePost.style.color = "red";

    document.getElementById("z").style.borderColor = "red";
    document.getElementById("z").addEventListener("input", function () {
      if (this.value !== "") {
        this.style.borderColor = "green";
      } else {
        this.style.borderColor = "red";
      }
    });

    return;
  } else if (content === "") {
    const messagePost = document.getElementById("message_post");
    messagePost.textContent = "Пожалуйста, напишите текст";
    messagePost.style.color = "red";

    document.getElementById("s").style.borderColor = "red";
    document.getElementById("s").addEventListener("input", function () {
      if (this.value !== "") {
        this.style.borderColor = "green";
      } else {
        this.style.borderColor = "red";
      }
    });

    return;
  }

  document.getElementById("post").submit();
});
