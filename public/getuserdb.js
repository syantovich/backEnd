const id = document.getElementById("id");
const email = document.getElementById("mail");
const password = document.getElementById("pass");
const submi = document.getElementById("subm");
const saveEdit = document.getElementById("edit");
const span = document.getElementById("span");

let url = "http://127.0.0.1:3000/getuser";

submi.addEventListener("click", async (e) => {
  e.preventDefault();
  let data = {};
  if (!!id.value) {
    data["_id"] = id.value;
  }
  if (!!email.value) {
    data["email"] = email.value;
  }
  if (!!password.value) {
    data["password"] = password.value;
  }
  console.log(data);
  let x;
  if (Object.keys(data).length == 0) {
    x = false;
  } else {
    x = await fetch(url + "/get", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((data) => {
        return data.json();
      })
      .catch((err) => {
        return false;
      });
  }

  if (x) {
    id.disabled = true;
    email.value = x.email;
    password.value = x.password;
    saveEdit.hidden = false;
    span.innerText = x["_id"];
  } else {
    id.disabled = false;
    id.value = "";
    email.value = "";
    password.value = "";
    span.innerText = "Not found";
    saveEdit.hidden = true;
  }
});

saveEdit.addEventListener("click", async (e) => {
  let data = {
    _id: span.innerText,
    email: email.value,
    password: password.value,
  };
  console.log(data);
  let x = await fetch(url + "/save", {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      return "Error";
    });
  console.log(x);
});
