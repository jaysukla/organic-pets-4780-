let schduledDateTime = "";
let userMail = "";
let collection = localStorage.getItem("collecton_name");
let fullnameX = collection.split("@")[0];
CollectionName3.innerHTML =
  fullnameX + `<p style="font-size: 12px;">(Logout)</p>`;
console.log(collection);

async function getData() {
  spinner.style.display = "block"; //!Spinner
  let data = await fetch(
    "https://impossible-pear-waistcoat.cyclic.app/allevents",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        collection: collection,
      },
    }
  );
  data = await data.json();
  showEvents(data.Data);
}
getData();

//? <!----------------------------------------------- < Appending data in select tag> ----------------------------------------------->

function showEvents(data) {
  console.log(data);
  let userEvents = document.querySelector("#userEvents");
  data.forEach((element) => {
    console.log(element);
    let option = document.createElement("Option");
    option.value = JSON.stringify(element);
    option.innerText = element.title;
    userEvents.append(option);
  });
  spinner.style.display = "none"; //!Spinner
}

//? <!----------------------------------------------- < Getting data from select tag and changing body and subject> ----------------------------------------------->

let userEvents = document.querySelector("#userEvents");
userEvents.addEventListener("change", () => {
  spinner.style.display = "block"; //!Spinner
  try {
    let data = JSON.parse(userEvents.value);
    changeSubjectandBody(data);
  } catch (error) {
    spinner.style.display = "none"; //!Spinner
  }
});

function changeSubjectandBody(data) {
  spinner.style.display = "block"; //!Spinner
  console.log(data);
  let subjectText = document.querySelector("#subjectText");
  let bodyText = document.querySelector("#bodyText");

  subjectText.innerText = `Reminder: ${data.title} is at ${data.starttime} on ${data.startdate}`;
  bodyText.textContent = `Hi ${collection.split("@")[0]}, 

This is a friendly reminder that your ${data.title} is at ${
    data.starttime
  } on ${data.startdate}`;

  // changing format for geting the difference between two DateTime

  let start_time = data.starttime.split(" ");
  start_time = start_time[0] + ":" + start_time[1];

  schduledDateTime = data.startdate + ":" + start_time;

  userMail = collection;
  spinner.style.display = "none"; //!Spinner
}

//? <!----------------------------------------------- < Getting data from form> ----------------------------------------------->

let form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  spinner.style.display = "block"; //!Spinner
  event.preventDefault();
  // let workflowName = form.name.value;
  // let userEventsData = JSON.parse(form.userEvents.value);
  let beforeTimeValue = form.beforeTimeValue.value;
  let beforeTimeUnit = form.beforeTimeUnit.value;
  let subjectText = form.subjectText.value;
  let bodyText = form.bodyText.value;
  let timeinSec = 0;
  if (beforeTimeUnit == "min") {
    timeinSec = beforeTimeValue * 60;
  } else {
    timeinSec = beforeTimeValue * 60 * 60;
  }
  sendMail(timeinSec, subjectText, bodyText);
});
async function sendMail(timeinSec, subject, body) {
  spinner.style.display = "block"; //!Spinner
  console.log(userMail);
  let mailStatus = await fetch(
    `https://fierce-shoulder-pads-deer.cyclic.app/workflow/notifyhost/${timeinSec}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        body,
        schduledDateTime,
        userMail,
      }),
    }
  );
  if (mailStatus.status == 200) {
    spinner.style.display = "none"; //!Spinner
    swal("Your Workflow has been Scheduled", "", "success");
  } else {
    spinner.style.display = "none"; //!Spinner
    swal("Pleas select correct Time & Event", "", "info");
  }
}
let Logout = document.getElementsByClassName("namecircle")[0];
Logout.addEventListener("click", () => {
  spinner.style.display = "block"; //!Spinner{
  swal("Logging Out..", "", "info");
  localStorage.clear();
  setTimeout(() => {
    spinner.style.display = "none"; //!Spinner
    window.location.href = "./index.html";
  }, 1000);
});
let backbtn = document.querySelector("#event_nav > div > div:nth-child(1) > p");
backbtn.addEventListener("click", () => {
  window.location.href = "Dashboard.html";
});
