!(function (containerSelector) {
  const $ = (selector) => document.querySelector(selector);
  const newElement = (tag) => document.createElement(tag);
  const app = $(containerSelector);
  const cal = newElement("div");

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