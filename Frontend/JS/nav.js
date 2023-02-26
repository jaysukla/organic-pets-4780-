window.onscroll(() => {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
});

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

// const resources = document.getElementById("resources")
// const resourcesMenu = document.getElementById("resourcesMenu")

// resources.addEventListener('mousemove', ()=>{
//     resourcesMenu.style.display="flex"
// })

// resources.addEventListener('mouseout', ()=>{
//     resourcesMenu.style.display="none"
// })
