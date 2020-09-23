const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "lineThrough";

let LIST = [];
let id = 0;

function reset() {
  LIST = [];
  id = 0;
  list.innerHTML = "";
}

// Show todays date
const options = { month: "short", weekday: "long", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en", options);

function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const text = `<li class="item">
                <i class="far ${DONE} complete-circle" job="complete" id="${id}"></i>
                <p class="text ${LINE}">${toDo}</p>
                <i class="far fa-trash-alt trash-icon" job="delete" id="${id}"></i>
            </li>`;

  list.insertAdjacentHTML("afterbegin", text);
}

document.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    const toDo = input.value;
    if (toDo) {
      addToDo(toDo, id, false, false);
      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });

      localStorage.setItem("TODO", JSON.stringify(LIST));

      input.value = "";
      id++;
    }
  }
});

function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

list.addEventListener("click", function (e) {
  let element = e.target;

  if (!element.attributes.job) {
    return;
  }

  const elementJOB = element.attributes.job.value;
  if (elementJOB == "complete") {
    completeToDo(element);
  } else if (elementJOB == "delete") {
    removeToDo(element);
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
});

let data = localStorage.getItem("TODO");
if (data) {
  LIST = JSON.parse(data);
  loadToDo(LIST);
  id = LIST.length;
} else {
  reset();
}

function loadToDo(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

clear.addEventListener("click", function () {
  localStorage.clear();
  reset();
});
