const resetAllBtn = document.getElementsByClassName("btn-all")[0];

const resetRecentBtn = document.getElementsByClassName("btn-recent")[0];

const container = document.querySelector(".container");

let isMouseDown = false;
let currentColor = "";
let dragStartColor = "";
let dragStart;

const createTable = () => {
  let numRows = 10;
  let numCols = 20;

  // optimising for screen size
  const mobileView = window.matchMedia("(max-width: 767px)");
  /*
 window.matchMedia() returns a MediaQueryList object, not a boolean value. To get a boolean value we add .matches to the variable
  */
  if (mobileView.matches) {
    numRows = 7;
    numCols = 8;
  }

  const handleDragOver = () => {
    cellText.style.color = "transparent";
  };

  const handleDragLeave = () => {
    cellText.style.color = "";
  };

  const handleClick = (e) => {
    e.target.style.background = `radial-gradient(${randomColors()}, ${randomColors()})`;
  };

  const handleDoubleClick = (e) => {
    e.target.style.background = "";
  };

  const handleMouseDown = (e) => {
    if (e.target.tagName === "TD") {
      isMouseDown = true;
      currentColor = `radial-gradient(${randomColors()}, ${randomColors()})`;
      dragStartColor = currentColor;
      dragStart = e.target;
    } else {
    }
    return;
  };

  const handleMouseUp = (e) => {
    isMouseDown = false;
  };

  const handleMouseOver = (e) => {
    if (isMouseDown) {
      dragStart.style.background = dragStartColor;
      const target = e.target;

      /*target.tagName is a property of the Event object in JavaScript. 
      It returns a string representing the name of the tag of the element that triggered the event. 
      For example, if the event was triggered by a <div> element, 
      target.tagName would return the string "DIV".
       */
      if (target.tagName === "TD") {
        target.style.background = dragStartColor;
        // console.log(dragStartColor);
      }
    }
  };

  const table = document.createElement("table");
  const tableBody = document.createElement("tbody");
  for (let i = 0; i < numRows; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < numCols; j++) {
      const cell = document.createElement("td");
      const cellText = document.createTextNode(` `);
      cell.appendChild(cellText);
      cell.addEventListener("dragover", handleDragOver);
      cell.addEventListener("dragleave", handleDragLeave);
      cell.addEventListener("click", handleClick);
      cell.addEventListener("dblclick", handleDoubleClick);

      cell.addEventListener("mousedown", handleMouseDown);

      cell.addEventListener("mouseup", handleMouseUp);

      cell.addEventListener("mouseover", handleMouseOver);

      row.appendChild(cell);
    }
    tableBody.appendChild(row);
  }

  table.appendChild(tableBody);
  container.appendChild(table);
};

const randomColors = () => {
  let hex = "#";
  let possibilities = "0123456789abcdef";
  for (let i = 0; i < 6; i++) {
    hex += possibilities[Math.floor(Math.random() * possibilities.length)];
  }
  return hex;
};

createTable();

const handleResize = () => {
  let grid = document.getElementsByTagName("table")[0];
  let circle = document.getElementsByTagName("td");

  //make the array like object an actual array in order to use forEach
  circle = [...circle];
  if (grid) {
    container.removeChild(grid);
  }

  const mobileView = window.matchMedia("(max-width: 767px)");

  if (mobileView.matches) {
    createTable();
  } else {
    createTable();
  }
};

window.addEventListener("resize", handleResize);

const resetRecent = () => {
  dragStart.style.background = "";
};

const resetAll = () => {
  let circle = document.getElementsByTagName("td");

  //make the array like object an actual array in order to use forEach
  circle = [...circle];
  circle.forEach((element) => {
    element.style.background = "";
  });
};

resetAllBtn.addEventListener("click", resetAll);
resetRecentBtn.addEventListener("click", resetRecent);
