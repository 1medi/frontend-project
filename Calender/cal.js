const $ = (selector) => document.querySelector(selector);
const newElement = (tag) => document.createElement(tag);

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
const app = $(".app");

let displayDate = new Date();

function initAside() {
  const aside = newElement("div");
  aside.classList.add("aside");
  const asideHeader = initAsideHeader();
  const asideBody = initAsideBody();

  aside.appendChild(asideHeader.element);
  aside.appendChild(asideBody.element);

  function render(parant) {
    asideHeader.render(displayDate.getFullYear());
    parant.appendChild(aside);
  }

  return {
    element: aside,
    header: asideHeader,
    render,
  };
}

function initAsideHeader() {
  const asideHeader = newElement("div");
  asideHeader.classList.add("aside-header");

  const asideHeaderYear = newElement("div");
  const prevSpan = newElement("span");
  const nextSpan = newElement("span");
  const asideHeaderPrevYear = newElement("button");
  const asideHeaderNextYear = newElement("button");

  asideHeaderPrevYear.classList.add("prev-button");
  asideHeaderNextYear.classList.add("next-button");

  asideHeaderPrevYear.appendChild(prevSpan);
  asideHeaderNextYear.appendChild(nextSpan);

  asideHeader.appendChild(asideHeaderPrevYear);
  asideHeader.appendChild(asideHeaderYear);
  asideHeader.appendChild(asideHeaderNextYear);

  asideHeaderPrevYear.addEventListener("click", () => {
    const year = displayDate.getFullYear() - 1;
    const prevDate = displayDate.setFullYear(year);
    displayDate = new Date(prevDate);
    render(displayDate.getFullYear());
  });

  asideHeaderNextYear.addEventListener("click", () => {
    const year = displayDate.getFullYear() + 1;
    const prevDate = displayDate.setFullYear(year);
    displayDate = new Date(prevDate);
    render(displayDate.getFullYear());
  });

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
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].forEach((month) => {
    const li = newElement("li");
    li.classList.add("aside-month");
    li.innerHTML = strMonth[month];
    asideBody.appendChild(li);
  });

  return {
    element: asideBody,
  };
}

function mainHeader() {
  const header = newElement("div");
  header.classList.add("main-header");
  function render() {
    const month = displayDate.getMonth();

    header.innerHTML = `${strMonth[
      month
    ].toUpperCase()} ${displayDate.getFullYear()}`;
  }

  render();

  return {
    element: header,
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

function renderMonthDate(body) {
  const year = displayDate.getFullYear();
  const month = displayDate.getMonth();
  const firstDate = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0);

  const targetDate = new Date(firstDate);

  while (targetDate <= lastDate) {
    const dateRow = newElement("div");
    dateRow.classList.add("date-row");
    [0, 1, 2, 3, 4, 5, 6].forEach((number) => {
      const cell = newElement("div");
      cell.classList.add("cell");
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
  body.render();
  main.appendChild(header.element);
  main.appendChild(dayRow.element);
  main.appendChild(body.element);

  function render(parant) {
    parant.appendChild(main);
  }
  return {
    element: main,
    render,
  };
}

function initCal() {
  const cal = newElement("div");
  cal.classList.add("cal");
  const aside = initAside();
  const main = initMain();
  aside.render(cal);
  main.render(cal);
  app.appendChild(cal);
}

initCal();