let stickynav = document.getElementById("stickynav");
const sticky = stickynav.offsetTop;
window.onscroll = function () {
  if (window.pageYOffset >= sticky) {
    stickynav.classList.add("sticky");
  } else {
    stickynav.classList.remove("sticky");
  }
};
let navclickbtn = document.getElementById("navclickbtn");

navclickbtn.addEventListener("click", () => {
  let NavlinkParent = document.getElementById("NavlinkParent");
  NavlinkParent.classList.toggle("navtranslate");
});

document.addEventListener("click", (e) => {
  if (!e.target.matches("[data-navclose]")) {
    NavlinkParent.classList.remove("navtranslate");
  }
});
