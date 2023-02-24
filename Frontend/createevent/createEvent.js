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


const nextbuttons = document.querySelectorAll(".nextbutton")
const event_option = document.getElementById("event_option")
const event_description = document.getElementById("event_description")
const event_color = document.getElementById("event_link")

for(let i=0;i<nextbuttons.length;i++){
    nextbuttons[i].addEventListener("click",async()=>{
        let obj={
            event_option:event_option.value,
            event_description:event_description.value,
            event_color:event_link.value,
            duration: 15
        }
        let event_data = await fetch ("http://localhost:1020/",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })

        if(event_data.ok){
            alert("Event has been created !!")
        }else{
            alert("Bad request has been made")
        }
    })
}
console.log(nextbuttons)