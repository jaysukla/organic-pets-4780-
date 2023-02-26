window.onscroll = function () {
  myFunction();
};

var navbar = document.getElementById("sticky");
var sticky = navbar.offsetTop;
let collection = localStorage.getItem("collecton_name");
let fullnameX = collection.split("@")[0];
CollectionName.innerHTML = fullnameX;
CollectionName2.innerHTML = fullnameX;
CollectionName3.innerHTML = fullnameX;
console.log(collection);
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

const create = document.getElementById("Create");
const event_card = document.querySelector("#content>div");

create.addEventListener("click", () => {
  window.location.assign("../createevent/create.html");
});

const allEvents = JSON.parse(localStorage.getItem("testObject"));

async function fetchdata() {
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
    console.log(err);
  }
}
fetchdata();

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
      if (diff[0] == 0) {
        mint = diff[1] + "mintutes ";
      } else {
        mint = diff[0] + "hr" + " " + diff[1] + "mintutes ";
      }
      return `
        <div id="event_card">
                <div>
                    <p>${el.title}</p>
                    <img src="https://cdn-icons-png.flaticon.com/512/126/126472.png" alt="">
                </div>

                <div>
                    <p>${mint}, One-on-One</p>
                    <p>View Booking Page</p>
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
}

async function deletefun(id) {
  try {
    let res = await fetch(
      `https://long-tan-fossa-belt.cyclic.app/delete/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          collection: collection,
        },
        method: "DELETE",
      }
    );
    if (res.ok) {
      alert("Event Deleted Successfully");
    }
  } catch (err) {
    console.log(err);
  }
}
