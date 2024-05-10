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



