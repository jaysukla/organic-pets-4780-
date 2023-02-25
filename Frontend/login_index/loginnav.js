window.onscroll = function() {myFunction()}

var navbar = document.getElementById("sticky");
var sticky = navbar.offsetTop;
let collection = localStorage.getItem("collecton_name");
console.log(collection)
function myFunction() {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky")
    } else {
      navbar.classList.remove("sticky");
    }
}

const create= document.getElementById("Create")
const event_card = document.querySelector("#content>div")

create.addEventListener("click",()=>{
  window.location.assign("../createevent/create.html")
})

const allEvents =JSON.parse(localStorage.getItem("testObject"))

async function fetchdata(){
    try {
      let alldata = await fetch(
        `https://impossible-pear-waistcoat.cyclic.app/allevents`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "collection":collection
            // Authorization: `${accesstokenAdmin}`,
          },
        }
      );




      if(alldata.ok){
        let data = await alldata.json()
        renderData(data.Data)
        console.log(data)
      }
    }
  catch(err){
    console.log(err)
  }
}
fetchdata()
renderData(allEvents)
function renderData(data){

  event_card.innerHTML=""
  event_card.innerHTML=`${data.map((el)=>{
        return `
        <div id="event_card">
                <div>
                    <p>${el.title}</p>
                    <img src="https://cdn-icons-png.flaticon.com/512/126/126472.png" alt="">
                </div>

                <div>
                    <p>30 mins, One-on-One</p>
                    <p>View Booking Page</p>
                </div>
                <hr>
                <div id="link"><a href="#">Link</a></div>
            </div> `
    }).join("")}
  `


//     if(data){
//       document.querySelector('#content>h2').innerText=""
//       document.querySelector('#content>p').innerText=""
//       event_card.innerHTML=`<div id="event_card">
//       <div>
//           <p>${data.title}</p>
//           <img src="https://cdn-icons-png.flaticon.com/512/126/126472.png" alt="">
//       </div>

//       <div>
//           <p>30 mins, One-on-One</p>
//           <p>View Booking Page</p>
//       </div>
//       <hr>
//       <div id="link"><a href="#">Link</a></div>
//     </div> `
//     }else{
//       document.querySelector('#content>h2').innerText="You don't have any event types yet."
//       document.querySelector('#content>p').innerText="You'll want to add an event type to allow people to schedule with you."
//     }
}

                                                                            

async function deletefun(id){
  try{
      let res = await fetch(`https://long-tan-fossa-belt.cyclic.app/delete/${id}`,{
          headers:{
              "Content-Type": "application/json",
              Authorization:access_token.token
          },
          method:"DELETE"
      })
      if(res.ok){
        alert("successfully delete event")
      }
  }
  catch(err){
      console.log(err)
  }
}