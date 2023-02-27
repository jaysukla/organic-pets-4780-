const baseUrl = `https://organic-pets-4780-backend.vercel.app`;
const usersUrl = `${baseUrl}/users`;
const signinUrl = `${usersUrl}/register`;
const loginUrl = `${usersUrl}/login`;
const authgoogle = `${baseUrl}/auth/google/callback`;
async function signup() {
  spinner.style.display = "block"; //!Spinner
  checkValues();
}
const checkValues = () => {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let cnf_pass = document.getElementById("cnfpass").value;

  let obj = {
    name: name,
    email: email,
    password: password,
  };
  if (password == cnf_pass) {
    Postusers(obj);
  } else {
    swal("Check Password!", "Passwords dosen't match", "warning");
    spinner.style.display = "block"; //!Spinner
    return;
  }
};

async function Postusers(obj) {
  spinner.style.display = "block"; //!Spinner
  try {
    const res = await fetch(signinUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    if (res.ok) {
      spinner.style.display = "none"; //!Spinner
      swal("Signup Successful", "Please Login", "success");
    } else {
      spinner.style.display = "none"; //!Spinner
      swal("Error", "Bad request", "error");
    }
  } catch (error) {
    spinner.style.display = "none"; //!Spinner
    swal("Error", "Something went wrong", "error");
    console.log(`Error in Posting`);
  }
}

async function login() {
  spinner.style.display = "block"; //!Spinner
  check_login_input_values();
}

function check_login_input_values() {
  let login_email = document.getElementById("login_email").value;
  let login_pass = document.getElementById("login_pass").value;

  let login_obj = {
    email: login_email,
    password: login_pass,
  };
  console.log(login_obj);
  login_user(login_obj);
}

let login_user = async (obj) => {
  spinner.style.display = "block"; //!Spinner
  let res = await fetch(
    "https://organic-pets-4780-backend.vercel.app/users/login",
    {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (res.ok) {
    let token = await res.json();
    console.log(token);
    localStorage.setItem("accessToken", token.token);
    localStorage.setItem("username", token.name);
    localStorage.setItem("collecton_name", token.email);

    if (token.token) {
      spinner.style.display = "none"; //!Spinner
      swal("Login Successful", "Redirecting to Dashboard...", "success");
      setTimeout(() => {
        spinner.style.display = "none"; //!Spinner
        window.location.href = "Dashboard.html";
      }, 1000);
    }
  }
};
