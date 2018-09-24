$(document).ready(function() {
  document.getElementById("signupB").addEventListener("click", function(event) {
    event.preventDefault();
  });
  $("#signupB").click(function() {
    $("#signup").toggleClass("signupHide");
  });

  $("#submitB").click(function() {
    $("#signup").toggleClass("signupHide");
  });

});
