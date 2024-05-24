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

var myImages = [[""],["https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_xl_2x/f_auto/primary/c5r52rbifxn2srhp9no0"], ["https://draxe.com/wp-content/uploads/2015/01/BananaNutritionFB.jpg"]];
var myIndex = 0;
var print = document.getElementById('option');

function changeBackground() {
  var selectedIndex = document.querySelector("select").value;
  document.body.style.backgroundImage = "url('" + myImages[selectedIndex] + "')";
  console.log(myImages)
}







setInterval(setClock, 1000); 

const hourHand = document.querySelector("[data-hour-hand]");
const minuteHand = document.querySelector("[data-minute-hand]");
const secondHand = document.querySelector("[data-second-hand]");

function setClock() {
  var currentDate = new Date(); 
  var secondsRatio = currentDate.getSeconds() / 60;
  
  var minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
  var hoursRatio = (minutesRatio + currentDate.getHours()) / 12;
  setRotation(secondHand, secondsRatio);
  setRotation(minuteHand, minutesRatio);
  setRotation(hourHand, hoursRatio);
}

function setRotation(element, rotationRatio) {

  element.style.setProperty("--rotation", rotationRatio * 360);
}

function displayDigitalTime() {
  var currentDate = new Date();
  var hrs = currentDate.getHours();
  var min = currentDate.getMinutes();
  var sec = currentDate.getSeconds();
  var session = document.getElementById("session");

  if (hrs >= 12) {
    session.innerHTML = "PM";
  } else {
    session.innerHTML = "AM";
  }

  if (hrs > 12) {
    hrs = hrs - 12;
  }



  if (min < 10) {
    let paddedMin = min.toString().padStart(2, "0");
    min = paddedMin;
  }

  if (sec < 10) {
    var paddedSec = sec.toString().padStart(2, "0");
    sec = paddedSec;
  }

  document.getElementById("hours").innerHTML = hrs;
  document.getElementById("minutes").innerHTML = min;
  document.getElementById("seconds").innerHTML = sec;
}


function toggleClock() {
  var analog = document.getElementById("analog-clock");
  var digital = document.getElementById("digital-clock");

  if (analog.style.display === "none") {
    analog.style.display = "block";
    digital.style.display = "none";

    document.getElementById("btn").innerHTML =
      "Digital Clock";
  } else {
   
    analog.style.display = "none";
    digital.style.display = "block";
    setInterval(displayDigitalTime, 10);
    document.getElementById("btn").innerHTML =
      "Analog clock";
  }
}

setClock();







// function showTime(){
//   var date = new Date();
//   var h = date.getHours(); // 0 - 23
//   var m = date.getMinutes(); // 0 - 59
//   var s = date.getSeconds(); // 0 - 59
//   var session = "AM";
  
//   if(h == 0){
//       h = 12;
//   }
  
//   if(h > 12){
//       h = h - 12;
//       session = "PM";
//   }
  
//   h = (h < 10) ? "0" + h : h;
//   m = (m < 10) ? "0" + m : m;
//   s = (s < 10) ? "0" + s : s;
  
//   var time = h + ":" + m + ":" + s + " " + session;
//   document.getElementById("MyClockDisplay").innerText = time;
//   document.getElementById("MyClockDisplay").textContent = time;
  
//   setTimeout(showTime, 1000);
  
// }

// showTime();

/***********CALENDAR */
(function (containerSelector) {
  const $ = (selector) => document.querySelector(selector);
  const newElement = (tag) => document.createElement(tag);
  const app = $(containerSelector);
  const cal = newElement("div");

  /**** DARK MODE ***/
  const darkModeButton = newElement("button");
  darkModeButton.classList.add("dark-mode-toggle");
  darkModeButton.innerHTML = "Toggle Dark Mode";
  darkModeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
  app.appendChild(darkModeButton);

  const strMonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const strDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let displayDate = new Date();
  let notes = {};

  function initAside() {
    const aside = newElement("div");
    aside.classList.add("aside");
    const asideHeader = initAsideHeader();
    const asideBody = initAsideBody();

    aside.appendChild(asideHeader.element);
    aside.appendChild(asideBody.element);
    cal.appendChild(aside);

    function render() {
      asideHeader.render(displayDate.getFullYear());
      asideBody.render();
    }

    return {
      element: aside,
      header: asideHeader,
      render,
    };
  }

  function directionButton({ className, onClick }) {
    const span = newElement("span");
    const button = newElement("button");
    button.appendChild(span);
    button.classList.add("direction-button", className);
    button.addEventListener("click", onClick);
    return button;
  }

  function changeYear(number, cb) {
    const year = displayDate.getFullYear() + number;
    const newDate = displayDate.setFullYear(year);
    displayDate = new Date(newDate);
    cb && cb(displayDate.getFullYear());
  }

  function changeMonth(number, cb) {
    const month = displayDate.getMonth() + number;
    const newDate = displayDate.setMonth(month);
    displayDate = new Date(newDate);
    cb && cb();
  }

  function initAsideHeader() {
    const asideHeader = newElement("div");
    asideHeader.classList.add("aside-header");

    const asideHeaderYear = newElement("div");

    const prevButton = directionButton({
      className: "prev-button",
      onClick: () =>
        changeYear(-1, (year) => {
          render(year), main.render(cal);
        }),
    });

    const nextButton = directionButton({
      className: "next-button",
      onClick: () =>
        changeYear(+1, (year) => {
          render(year), main.render(cal);
        }),
    });

    asideHeader.appendChild(prevButton);
    asideHeader.appendChild(asideHeaderYear);
    asideHeader.appendChild(nextButton);

    function render(year) {
      asideHeaderYear.innerHTML = year;
    }

    return {
      element: asideHeader,
      render,
    };
  }

  function initAsideBody() {
    const asideBody = newElement("ul");
    asideBody.classList.add("aside-body");

    function render() {
      asideBody.innerHTML = "";
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].forEach((month) => {
        const li = newElement("li");
        li.classList.add("aside-month");
        if (displayDate.getMonth() === month) {
          li.classList.add("display-month");
        }
        li.innerHTML = strMonth[month];
        li.addEventListener("click", (e) => {
          const newDate = displayDate.setMonth(month);
          displayDate = new Date(newDate);
          render();
          main.render();
        });
        asideBody.appendChild(li);
      });
    }

    return {
      element: asideBody,
      render,
    };
  }

  function initTodayButton() {
    const todayButton = newElement("button");
    todayButton.classList.add("today-button");
    todayButton.innerHTML = "today";
    todayButton.addEventListener("click", () => {
      displayDate = new Date();
      aside.render();
      main.render();
    });
    return {
      element: todayButton,
    };
  }

  function mainHeader() {
    const headerContainer = newElement("div");
    headerContainer.classList.add("main-header");
    const header = newElement("div");
    header.classList.add("display-header");
    const todayButton = initTodayButton();

    const prevButton = directionButton({
      className: "prev-button",
      onClick: () => {
        changeMonth(-1);
        aside.render();
        main.render();
      },
    });
    const nextButton = directionButton({
      className: "next-button",
      onClick: () => {
        changeMonth(+1);
        aside.render();
        main.render();
      },
    });

    headerContainer.appendChild(prevButton);
    headerContainer.appendChild(header);
    headerContainer.appendChild(nextButton);
    headerContainer.appendChild(todayButton.element);

    function render() {
      const month = displayDate.getMonth();

      header.innerHTML = `${strMonth[
        month
      ].toUpperCase()} ${displayDate.getFullYear()}`;
    }

    return {
      element: headerContainer,
      render,
    };
  }

  function mainDays() {
    const dayRow = newElement("div");
    dayRow.classList.add("day-row");
    [0, 1, 2, 3, 4, 5, 6].forEach((number) => {
      const day = newElement("div");
      day.classList.add("cell", "cell-header");
      day.innerHTML = strDay[number];
      dayRow.appendChild(day);
    });
    return {
      element: dayRow,
    };
  }

  function isSameDate(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  function renderMonthDate(body) {
    body.innerHTML = "";
    const year = displayDate.getFullYear();
    const month = displayDate.getMonth();
    const firstDate = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0);

    const targetDate = new Date(firstDate);
    const today = new Date();

    while (targetDate <= lastDate) {
      const dateRow = newElement("div");
      dateRow.classList.add("date-row");
      [0, 1, 2, 3, 4, 5, 6].forEach((number) => {
        const cell = newElement("div");
        cell.classList.add("cell");
        if (isSameDate(targetDate, today)) {
          cell.classList.add("today");
        }
        if (targetDate <= lastDate && number >= targetDate.getDay()) {
          cell.innerHTML = targetDate.getDate();
          targetDate.setDate(targetDate.getDate() + 1);
        }
        dateRow.appendChild(cell);
      });
      body.appendChild(dateRow);
    }
  }

  function mainBody() {
    const body = newElement("div");
    body.classList.add("main-body");

    function render() {
      renderMonthDate(body);
    }

    return {
      element: body,
      render,
    };
  }

  function initMain() {
    const main = newElement("div");
    main.classList.add("main");

    const header = mainHeader();
    const dayRow = mainDays();
    const body = mainBody();

    main.appendChild(header.element);
    main.appendChild(dayRow.element);
    main.appendChild(body.element);

    cal.appendChild(main);

    function render() {
      header.render();
      body.render();
    }
    return {
      element: main,
      render,
    };
  }

  cal.classList.add("cal");
  const aside = initAside();
  const main = initMain();
  aside.render();
  main.render();
  app.appendChild(cal);
})(".container");

/********* NOTES *********** */

const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".buddon");
let notes = document.querySelectorAll(".input-box")

createBtn.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  let icon = document.createElement("i");
  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");
  icon.className = "fa fa-trash-o fa-lg"; 
  notesContainer.appendChild(inputBox).appendChild(icon); 
});