window.onscroll = function() {myFunction()}

var navbar = document.getElementById("event_nav");
var sticky = navbar.offsetTop;

function myFunction() {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky")
    } else {
      navbar.classList.remove("sticky");
    }
}

// const allevents = JSON.parse(localstorage.getitem('event'))
const cancelbutton = document.querySelectorAll(".cancelbutton")
const nextbuttons = document.querySelectorAll(".nextbutton")
const event_name = document.getElementById("event_name")
const event_option = document.getElementById("event_option")
const event_description = document.getElementById("event_description")
const event_linkevent_link = document.getElementById("event_link")
const startdate = document.getElementById("startDate")
const endDate = document.getElementById("endDate")
let collection = localStorage.getItem("collecton_name");
console.log(collection)
for(let i=0;i<nextbuttons.length;i++){
    nextbuttons[i].addEventListener("click",async()=>{
        let obj={
            title:event_name.value,
            starttime:endtimeAmPm(starttime),
            endtime:endtimeAmPm(endtime),
            startdate:startdate.value,
            enddate:endDate.value,
            event_option:event_option.value,
            discription:event_description.value,
            event_link:event_link.value,
        }
        

        
        let event_data = await fetch ("https://impossible-pear-waistcoat.cyclic.app/newevent",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "collection":collection
            },
            body: JSON.stringify(obj)
        })

let ev= await event_data.json()
console.log(ev)

        if(event_data.ok){
            alert("Event has been created !!")
            window.location.assign("../login_index/loginindex.html")
        }else{
            alert("Bad request has been made")
        }
        window.location.assign("../login_index/loginindex.html")
        localStorage.setItem('testObject', JSON.stringify(obj))
    })
}
// console.log(allevents)

for(let i=0;i<cancelbutton.length;i++){
    cancelbutton[i].addEventListener("click",async()=>{
        window.location.assign("../login_index/loginindex.html")
    })
}

function endtimeAmPm(time){

    let  hours = time.value.split(":")[0]
    let mint = time.value.split(":")[1]
    let suffix = hours>=12 ? "PM" : "AM"
    hours = hours %12 || 12

    return `${hours}:${mint} ${suffix}`

}

event_name.addEventListener("input",(e)=>{
    // console.log(e.target.value)
    event_linkevent_link.value=e.target.value
    document.getElementById("links").innerText=`calendly.com/mohimabahadur/${e.target.value}`
})
