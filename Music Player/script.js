document.getElementById("ham-menu").addEventListener("click", toggleMenu);


function toggleMenu() {
  var x = document.getElementsByClassName("hidden-nav-cntnr");
  if (x[0].style.display === "block") {
    x[0].style.display = "none";
  } else {
    x[0].style.display = "block";
  }
}