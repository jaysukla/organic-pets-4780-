let schduledDateTime = "";
let userMail = "";
let collection = localStorage.getItem("collecton_name");
console.log(collection);
async function getData() {
  let data = await fetch(
    "https://impossible-pear-waistcoat.cyclic.app/allevents",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        collection: collection,
        // Authorization: `${accesstokenAdmin}`,
      },
    }
  );
  data = await data.json();
  showEvents(data.Data);
}
getData();
// *********************************************************appending data in select tag*****************************************

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
}

// *********************************************************getting data from select tag amd chenging body and subject****************
let userEvents = document.querySelector("#userEvents");
userEvents.addEventListener("change", () => {
  let data = JSON.parse(userEvents.value);
  changeSubjectandBody(data);
});

function changeSubjectandBody(data) {
  console.log(data);
  let subjectText = document.querySelector("#subjectText");
  let bodyText = document.querySelector("#bodyText");

  subjectText.innerText = `Reminder: ${data.title} is at ${data.starttime} on ${data.startdate}`;
  bodyText.textContent = `Hi {{event_organizer_name}}, 

This is a friendly reminder that your ${data.title} is at ${data.starttime} on ${data.startdate}`;

  // changing format for geting the difference between two DateTime

  let start_time = data.starttime.split(" ");
  start_time = start_time[0] + ":" + start_time[1];

  schduledDateTime = data.startdate + ":" + start_time;

  // setting usermail
  userMail = collection;
}

// ************************************************************************getting data from form**************************************

let form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let workflowName = form.name.value;
  let userEventsData = JSON.parse(form.userEvents.value);
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

// function to send main

async function sendMail(timeinSec, subject, body) {
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
    alert("workflow schduled");
  } else {
    alert("plese select a correct time or event");
  }
}
