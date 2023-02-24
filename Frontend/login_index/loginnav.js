window.onscroll = function() {myFunction()}

var navbar = document.getElementById("sticky");
var sticky = navbar.offsetTop;

function myFunction() {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky")
    } else {
      navbar.classList.remove("sticky");
    }
}

const create= document.getElementById("Create")

create.addEventListener("click",()=>{
  window.location.assign("../createevent/create.html")
})