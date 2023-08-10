const resetAllBtn = document.getElementsByClassName("btn-all")[0];

const resetRecent = document.getElementsByClassName("btn-recent")[0];

const container=document.querySelector('.container')


const createTable = () => {

  let numRows =10;
  let numCols=20;

  // optimising for screen size
  const mobileView=window.matchMedia("(max-width: 767px)");
  /*
 window.matchMedia() returns a MediaQueryList object, not a boolean value. To get a boolean value we add .matches to the variable
  */
 if (mobileView.matches) {
  numRows = 7;
  numCols = 10;
}


  const table = document.createElement("table");
  const tableBody = document.createElement("tbody");
  for (let i = 0; i < numRows; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < numCols; j++) {
      const cell = document.createElement("td");
      const cellText = document.createTextNode(` `);
      cell.appendChild(cellText);
      cell.addEventListener("dragover", () => {
        cellText.style.color = "transparent";
      });
      cell.addEventListener("dragleave", () => {
        cellText.style.color = "";
      });
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
  let grid = document.getElementsByTagName('table')[0];

  if (grid) {
    container.removeChild(grid);
  }

  const mobileView = window.matchMedia("(max-width: 767px)");
  if (mobileView.matches) {
    createTable();
  }else {
    createTable();
  }
};

window.addEventListener("resize", handleResize);


let circle = document.getElementsByTagName("td");

//make the array like object an actual array in order to use forEach
circle = [...circle];
let isMouseDown = false;
let currentColor = "";
let dragStartColor = "";
let dragStart;
//iterate through the array with forEach
circle.forEach((element) => {
  element.addEventListener("click", (e) => {
    e.target.style.background = `radial-gradient(${randomColors()}, ${randomColors()})`;
  });
  element.addEventListener("dblclick", (e) => {
    e.target.style.background = "";
  });

  element.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    currentColor = `radial-gradient(${randomColors()}, ${randomColors()})`;
    dragStartColor = currentColor;
    dragStart = e.target;
  });

  element.addEventListener("mouseup", (e) => {
    isMouseDown = false;
  });

  element.addEventListener("mouseover", (e) => {
    if (isMouseDown) {
      dragStart.style.background = dragStartColor;
      const target = e.target;

      /*target.tagName is a property of the Event object in JavaScript. It returns a string representing the name of the tag of the element that triggered the event. For example, if the event was triggered by a <div> element, target.tagName would return the string "DIV".
       */
      if (target.tagName === "TD") {
        target.style.background = dragStartColor;
        console.log(dragStartColor);
      }
    }
  });
});

const reset = () => {
  dragStart.style.background = "";
};

const resetAll = () => {
  circle.forEach((element) => {
    element.style.background = "";
  });
};

resetAllBtn.addEventListener("click", resetAll);
resetRecent.addEventListener("click", reset);


