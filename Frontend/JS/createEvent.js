var navbar = document.getElementById("event_nav");
var sticky = navbar.offsetTop;
window.onscroll = function () {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
};
const cancelbutton = document.querySelectorAll(".cancelbutton");
const nextbuttons = document.querySelectorAll(".nextbutton");
const event_name = document.getElementById("event_name");
const event_option = document.getElementById("event_option");
const event_description = document.getElementById("event_description");
const event_linkevent_link = document.getElementById("event_link");
const startdate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
let collection = localStorage.getItem("collecton_name");
let fullnameX = collection.split("@")[0];

CollectionName3.innerHTML =
  fullnameX + `<p style="font-size: 12px;">(Logout)</p>`;
console.log(collection);

for (let i = 0; i < nextbuttons.length; i++) {
  nextbuttons[i].addEventListener("click", async () => {
    spinner.style.display = "block"; //!Spinner
    let obj = {
      title: event_name.value,
      starttime: endtimeAmPm(starttime),
      endtime: endtimeAmPm(endtime),
      startdate: startdate.value,
      enddate: endDate.value,
      event_option: event_option.value,
      discription: event_description.value,
      event_link: event_link.value,
    };

    let event_data = await fetch(
      "https://impossible-pear-waistcoat.cyclic.app/newevent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          collection: collection,
        },
        body: JSON.stringify(obj),
      }
    );

    let ev = await event_data.json();
    console.log(ev);
    if (ev.msg == "TIME sLOT IS NOT AVAILABLE") {
      spinner.style.display = "none"; //!Spinner
      swal("Time Slot Not Available", "Please select any other time.", "info");
      return;
    }
    if (event_data.ok) {
      spinner.style.display = "none"; //!Spinner
      swal("Event Created!", "Your Event has been Scheduled.", "success");
      window.location.assign("./Dashboard.html");
    } else {
      spinner.style.display = "none"; //!Spinner
      swal("Bad Request!", "Something was wrong", "error");
      // alert("Bad request has been made");
    }
    localStorage.setItem("testObject", JSON.stringify(obj));
    setTimeout(() => {
      spinner.style.display = "none"; //!Spinner
      window.location.assign("./Dashboard.html");
    }, 500);
  });
}
for (let i = 0; i < cancelbutton.length; i++) {
  cancelbutton[i].addEventListener("click", async () => {
    spinner.style.display = "none"; //!Spinner
    window.location.assign("./Dashboard.html");
  });
}

function endtimeAmPm(time) {
  spinner.style.display = "block"; //!Spinner
  let hours = time.value.split(":")[0];
  let mint = time.value.split(":")[1];
  let suffix = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  spinner.style.display = "none"; //!Spinner

  return `${hours}:${mint} ${suffix}`;
}

event_name.addEventListener("input", (e) => {
  event_linkevent_link.value = e.target.value;
  let links = document.getElementById("links");
  links.innerText = `mycal.com/mohimabahadur/${e.target.value}`;
});

let Logout = document.getElementsByClassName("namecircle")[0];
Logout.addEventListener("click", () => {
  spinner.style.display = "block"; //!Spinner
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
