const baseUrl = `https://fierce-shoulder-pads-deer.cyclic.app`;
const usersUrl = `${baseUrl}/users`;
const signinUrl = `${usersUrl}/register`;
const loginUrl = `${usersUrl}/login`;
const authgoogle = `${baseUrl}/auth/google/callback`;
async function signup() {
  checkValues();
}
const checkValues = () => {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  // let age = document.getElementById("age").value;
  let cnf_pass = document.getElementById("cnfpass").value;

  let obj = {
    name: name,
    email: email,
    password: password,
  };
  password == cnf_pass ? Postusers(obj) : alert("Check Your Password");
};

const Postusers = async (obj) => {
  try {
    const res = await fetch(signinUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    if (res.ok) {
      alert("Sign Up Successfully");
    } else {
      alert("Not registered");
    }
  } catch (error) {
    console.log(`Error in Posting`);
  }
};

async function login() {
  check_login_input_values();
}

let check_login_input_values = () => {
  let login_email = document.getElementById("login_email").value;
  let login_pass = document.getElementById("login_pass").value;

  let login_obj = {
    email: login_email,
    password: login_pass,
  };
  console.log(login_obj);
  login_user(login_obj);
};

let login_user = async (obj) => {
  let res = await fetch("https://fierce-shoulder-pads-deer.cyclic.app/users/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(res);
  if (res.ok) {
    let token = await res.json();
    console.log(token);
    localStorage.setItem("accessToken", token.token);
    localStorage.setItem("username", token.name);
    localStorage.setItem("collecton_name", token.email);
    if (token.token) {
      window.location.href = "index.html";
    }
  }
};

// async function adminlogin() {
//   let login_email = document.getElementById("login_email").value;
//   let login_pass = document.getElementById("login_pass").value;
//   let login_obj = {
//     email: login_email,
//     password: login_pass,
//   };
//   console.log(login_obj);
//   aadminlogin_user(login_obj);
// }

// async function aadminlogin_user(obj) {
//   let res = await fetch(aadminUrl, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(obj),
//   });

//   if(res.ok){
//     let token=await res.json();
//     console.log(token.token);
//     localStorage.setItem("admintoken",token.token);
//     alert("admin login successfull");
//     window.location.href = "admin.html";
//   }
// }
// document.getElementById("google").addEventListener("click", () => {
//   window.location.href = authgoogle;
// });

// async function call() {
//   try {
//     let res = await fetch("http://localhost:4500/dash");
//     console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
// }
// call();
