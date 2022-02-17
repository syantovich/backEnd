const id = document.getElementById("id");
const email = document.getElementById("mail");
const password = document.getElementById("pass");
const submi = document.getElementById("subm");

let url = "http://127.0.0.1:3000/registration";

submi.addEventListener("click", (e) => {
  e.preventDefault();
  let data = {
    email: email.value,
    password: password.value,
  };
  console.log(data);
  fetch(url, {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  });
});
