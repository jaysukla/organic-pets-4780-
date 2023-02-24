let schduledDateTime = "";
let userMail = "";
async function getData() {
  let data = await fetch("https://long-tan-fossa-belt.cyclic.app/allevents");
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
    option.innerText = element.discription;
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

  subjectText.innerText = `Reminder: ${data.discription} is at ${data.endtime} on ${data.enddate}`;
  bodyText.textContent = `Hi {{event_organizer_name}}, 

This is a friendly reminder that your ${data.discription} is at ${data.endtime} on ${data.enddate}`;

  // changing format for geting the difference between two DateTime
  let end_date = data.enddate.split("-");
  end_date = end_date[2] + "-" + end_date[1] + "-" + end_date[0];

  let end_time = data.endtime.split(" ");
  end_time = end_time[0] + ":" + end_time[1];

  schduledDateTime = end_date + ":" + end_time;

  // setting usermail
  userMail = data.email;
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

async function sendMail(beforetime, subject, body) {
  console.log(userMail);
  let mailStatus = await fetch(
    `http://localhost:5050/workflow/notifyhost/${beforetime}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subject, body, schduledDateTime, userMail }),
    }
  );
  if (mailStatus.status == 200) {
    alert("workflow schduled");
  } else {
    alert("plese select a correct time or event");
  }
}
