function check()
{
  const inputValue = document.userform.name.value
  document.getElementById('myInput').value = inputValue
  updateHeader(inputValue);
  alert("Name Saved!")
  console.log(inputValue)
}

function updateHeader(value){
  document.getElementById("username-header").textContent = value;
}

var myImages = [["https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_xl_2x/f_auto/primary/c5r52rbifxn2srhp9no0"], ["https://draxe.com/wp-content/uploads/2015/01/BananaNutritionFB.jpg"]];
var myIndex = 0;
var print = document.getElementById('option');

function changeBackground() {
  var selectedIndex = document.querySelector("select").value;
  document.body.style.backgroundImage = "url('" + myImages[selectedIndex] + "')";
  console.log(myImages)
}

