let btn = document.querySelector(".btn");
let form = document.getElementById("myForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateForm();

  function validateForm() {
    let inputs = form.querySelectorAll("input:not([type='file']), textarea");


    inputs.forEach(function (input) {
      if (input.value.trim() === "") {
        let warning = document.createElement("div");
        warning.className = "warning";
        warning.textContent = "Bu alan boş bırakılamaz.";
        input.parentNode.insertBefore(warning, input.nextSibling);
        setTimeout(() => {
          let warning = document.querySelectorAll(".warning");
          warning.forEach((w) => {
            w.remove();
          });
        }, 2000);
      } else {
        btn.addEventListener("click", () => {
          form.submit();
        });
      }
    });
  }
});
