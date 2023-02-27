var navbar = document.getElementById("sticky");
var sticky = navbar.offsetTop;
let collection = localStorage.getItem("collecton_name");
window.onscroll = () => {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
};

let fullnameX = collection.split("@")[0];
CollectionName.innerHTML = fullnameX;
CollectionName2.innerHTML = fullnameX;
CollectionName3.innerHTML =
  fullnameX + `<p style="font-size: 12px;">(Logout)</p>`;
console.log(collection);

const create = document.getElementById("Create");
const event_card = document.querySelector("#content>div");

create.addEventListener("click", () => {
  window.location.assign("../create.html");
});

const allEvents = JSON.parse(localStorage.getItem("testObject"));

fetchdata();

async function fetchdata() {
  spinner.style.display = "block"; //!Spinner
  try {
    let alldata = await fetch(
      `https://impossible-pear-waistcoat.cyclic.app/allevents`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          collection: collection,
          // Authorization: `${accesstokenAdmin}`,
        },
      }
    );

    if (alldata.ok) {
      let data = await alldata.json();
      renderData(data.Data);
      console.log(data.Data);
    }
  } catch (err) {
    spinner.style.display = "none"; //!Spinner
    console.log(err);
  }
}

function renderData(data) {
  event_card.innerHTML = "";
  event_card.innerHTML = `${data
    .map((el) => {
      let s = el.starttime.split(":");
      let e = el.endtime.split(":");

      let shour = s[0];
      let smint = s[1].split(" ")[0];
      let stime = +(shour + "." + smint);

      let ehour = e[0];
      let emint = e[1].split(" ")[0];
      let etime = +(ehour + "." + emint);
      let diff = (Math.abs(etime - stime) + "").split(".");
      let mint;
      if (diff[1] > 60) {
        diff[1] = 15;
      }
      if (diff[0] == 0) {
        mint = diff[1] + "mintutes ";
      } else {
        mint = diff[0] + "hr" + " " + diff[1] + " mintutes ";
      }
      return `
        <div id="event_card">
                <div>
                    <p>${el.title}</p>
                    <img src="https://cdn-icons-png.flaticon.com/512/126/126472.png" alt="">
                </div>

                <div>
                    <p><span style="color:#075cd4">Time Left:</span> ${mint},<br>
                    <span style="color:#075cd4">Type:</span> One-on-One</p> 
                    <p><span style="font-size:14px;color:#075cd4">View Booking Data</span></p>
                </div>
                <hr>
                <div id="link"><a href="#">Link</a></div>
                <button data-id=${el._id} class="Deleter">Delete</button>
            </div> `;
    })
    .join("")}
  `;

  let Deleters = document.querySelectorAll(".Deleter");
  for (let i = 0; i < Deleters.length; i++) {
    Deleters[i].addEventListener("click", (e) => {
      deletefun(e.target.dataset.id);
    });
  }
  spinner.style.display = "none"; //!Spinner
}

async function deletefun(id) {
  spinner.style.display = "block"; //!Spinner
  try {
    let res = await fetch(
      `https://impossible-pear-waistcoat.cyclic.app/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          email: collection,
          id: id,
        },
      }
    );
    if (res.ok) {
      spinner.style.display = "none"; //!Spinner
      swal("Event Deleted Successfully", "Your event has been Deleted", "info");
    } else {
      swal("Something Went Wrong", "", "error");
      spinner.style.display = "none"; //!Spinner
    }
  } catch (err) {
    spinner.style.display = "none"; //!Spinner
    swal("Something Went Wrong", "", "error");
    console.log(err);
  }
}
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
