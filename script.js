// get the todo list ul
let nextTodoList = document.getElementById("nextList");
let nextTodoListCompleted = document.getElementById("nextListCompleted");

// get input
let nextTodoItemMain = document.getElementById("nextTodoItem");

// delete all items at once btn
let nextDeleteAll = document.getElementById("nextDeleteAll");

// notify if input is empty
let notify = document.getElementById("notify");

// create a function when add button is pressed
let nextAddBtn = document.getElementById("nextAddBtn");
nextAddBtn.addEventListener("click", storeToDoItem);

if (nextTodoItemMain === "") {
  nextDeleteAll.classList.add("hidden");
} else {
}

// if input is empty dont add todo else create a new function for new todos
function storeToDoItem() {
  let nextTodoItem = nextTodoItemMain.value;
  if (nextTodoItem === "") {
    notify.classList.remove("hidden");
  } else {
    nextTodoMerged(nextTodoItem);
    nextTodoItemMain.value = "";
    notify.classList.add("hidden");
    nextDeleteAll.classList.remove("hidden");
    nextDeleteAll.addEventListener("click", function () {
      nextDeleteAll.classList.add("hidden");
    });
  }
}

// allow ENTER keypress
nextTodoItemMain.addEventListener("keypress", function (event) {
  // Als de user ENTER drukt
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger de add-button met een klik
    document.getElementById("nextAddBtn").click();
    nextTodoItemMain.value = "";
  }
});

// the new todo
function nextTodoMerged(nextTodoItem) {
  let createListItem = document.createElement("li");
  let createNextTodoItem = document.createTextNode(nextTodoItem);
  let createDivItem = document.createElement("div");
  createDivItem.classList.add("nextItem");

  let trashBtn = document.createElement("i");
  let trashBtnDiv = document.createElement("div");
  trashBtn.classList.add("fa-regular", "fa-trash-can");
  trashBtnDiv.classList.add("trashBtnBox");

  let checkMark = document.createElement("i");

  // add trash btn inside the list
  trashBtnDiv.appendChild(trashBtn);

  // add todo item inside a div
  createDivItem.appendChild(createNextTodoItem);

  // add div inside the list
  createListItem.appendChild(createDivItem);

  // add trash btn inside the list
  createListItem.appendChild(trashBtnDiv);

  // add list item inside the <ul>
  nextTodoList.appendChild(createListItem);

  // delete to do item when clicked on trash can
  trashBtnDiv.addEventListener("click", function () {
    createListItem.innerHTML = "";
  });

  nextDeleteAll.addEventListener("click", function () {
    nextTodoList.innerHTML = "";
  });

  createListItem.addEventListener("mouseover", function () {
    createDivItem.appendChild(checkMark);
    checkMark.classList.add("fa-solid", "fa-circle-check", "pl-2");
  });
  createListItem.addEventListener("mouseleave", function () {
    createDivItem.removeChild(checkMark);
  });

  // add a toggle state function for completed todos
  createListItem.addEventListener("dblclick", toggleState);

  // get clear all btn
  let clearAll = document.getElementById("clearAll");
  let completedText = document.getElementById("completedText");

  // toggle the state of a do to by double clicking and adding completed class
  function toggleState() {
    if (this.classList.contains("completed")) {
      this.classList.remove("completed");
    } else {
      this.classList.add("completed");
      clearAll.classList.add("inline");
      clearAll.classList.remove("hidden");
      completedText.classList.remove("hidden");
      addToCompletedList(nextTodoItem);
    }
  }

  // add completed to a new list
  function addToCompletedList(nextTodoItem) {
    let createListItemCompleted = document.createElement("li");
    let createNextTodoItemCompleted = document.createTextNode(nextTodoItem);
    let createDivItemCompleted = document.createElement("div");
    createDivItemCompleted.classList.add("nextItemCompleted");

    // add todo item inside a div
    createDivItemCompleted.appendChild(createNextTodoItemCompleted);

    // add div inside the list
    createListItemCompleted.appendChild(createDivItemCompleted);

    // add list item inside the <ul>
    nextTodoListCompleted.appendChild(createListItemCompleted);

    // create a function when clear button is pressed
    clearAll.addEventListener("click", clearAllCompleted);

    // clear all completed
    function clearAllCompleted() {
      nextTodoListCompleted.innerHTML = "";
      clearAll.classList.remove("inline");
      clearAll.classList.add("hidden");
      completedText.classList.add("hidden");
    }
  }
}
