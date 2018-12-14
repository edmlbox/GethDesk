
StartUp();
function StartUp() {
  var hideForstUL = getList("nav_sub_menu");
  hideForstUL[0].classList.remove("nav_sub_menu_display");
  var setActive = document.querySelector(".left_nav>ul>li:first-of-type");
  setActive.classList.toggle("activeLi");
}

function removeActiveClass(active) {
  querySelectorAll(".left_nav>ul>li").forEach((x1, x2) => {
    x1.classList.remove("activeLi");
  });
}
function querySelectorAll(selector) {
  return document.querySelectorAll(selector);
}
function setActiveClass(el) {
  removeActiveClass(".left_nav>ul>li");
  el.classList.toggle("activeLi");
}

var leftPanelLi = ["Dashboard", "Accounts", "Mining", "Node_Info", "Map"];
var leftPanelLi_UL = [
  "nav_sub_menu_Dashboard",
  "nav_sub_menu_Accounts",
  "nav_sub_menu_Mining",
  "nav_sub_menu_node",
  "nav_sub_menu_Map"
];

function getById(el) {
  return document.getElementById(el);
}

function getList(el) {
  return document.getElementsByClassName(el);
}

function classToggle(el) {
  var el = getById(el);
  var el1 = getList("nav_sub_menu");

  for (var i = 0; i < el1.length; i++) {
    /*console.log(el1[i])*/

    if (!el1[i].classList.contains("nav_sub_menu_display")) {
      el1[i].classList.toggle("nav_sub_menu_display");
    }
  }
  el.classList.toggle("nav_sub_menu_display");
}

function showPOPUP(el) {
  switch (event.currentTarget.id) {
    case "Dashboard": {
      classToggle("nav_sub_menu_Dashboard");
      setActiveClass(event.currentTarget);
      break;
    }
    case "Accounts": {
      classToggle("nav_sub_menu_Accounts");
      setActiveClass(event.currentTarget);
      break;
    }
    case "Mining": {
      classToggle("nav_sub_menu_Mining");
      setActiveClass(event.currentTarget);
      break;
    }
    case "Node_Info": {
      classToggle("nav_sub_menu_node");
      setActiveClass(event.currentTarget);
      break;
    }
    case "Map": {
      classToggle("nav_sub_menu_Map");
      setActiveClass(event.currentTarget);
      break;
    }
  }
}

for (let i = 0; i < leftPanelLi.length; i++) {
  var element = getById(leftPanelLi[i]);
  element.addEventListener("click", showPOPUP, true);
}
