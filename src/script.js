const btn = document.querySelector(".add-task__btn");
  /** @type {HTMLInputElement|null} */
  const input = document.querySelector(".add-task__input");
  const list = document.querySelector(".todo__list");
  



function taskDelete(e)
{
  const task = e.target.closest("div");
  
  /**@type {object[]} */
  let arrayInStorage = JSON.parse(localStorage.getItem("TaskList"));

  arrayInStorage = arrayInStorage.filter(taskForDelete => taskForDelete.id !== task.dataset.id);

  localStorage.setItem("TaskList",JSON.stringify(arrayInStorage));

}
document.addEventListener("DOMContentLoaded", () => {

  function createTask() {
    const text = input.value.trim();
    if (!text) return;

    const task = document.createElement("div");

    const task_text = document.createElement("label");

    task_text.textContent = input.value;

    const task_checkbox = document.createElement("input");

    task_checkbox.type = "checkbox";

    task_checkbox.addEventListener("change", (e) => {
      changeTaskStatus(e);
    });

    const taskDeleteButton = document.createElement("button");
    taskDeleteButton.type = "button";
    taskDeleteButton.classList.add("task__delete_btn");
    taskDeleteButton.textContent = "DELETE"

    taskDeleteButton.addEventListener("click",(e)=>
    {
      taskDelete(e);

      const taskForDelete = e.target.closest("div")
      taskForDelete.remove();
    });


    task.classList.add("task");

    task.appendChild(task_checkbox);

    task.appendChild(task_text);

    task.appendChild(taskDeleteButton);

    list.appendChild(task);

    input.value = "";
    input.focus();

    const taskForStorage = {
      id: genereateId(),
      text: task_text.textContent,
      completle: false,
    };
    saveToStorage(taskForStorage);

    task.dataset.id = taskForStorage.id;
  }

  btn.addEventListener("click", (e) => {
    createTask();
  });

  function saveToStorage(task) {
    /** @type {object[]} */
    let storedArr = JSON.parse(localStorage.getItem("TaskList")) || [];
    //save to storage

    storedArr.push(task);

    localStorage.setItem("TaskList", JSON.stringify(storedArr));
  }

  //function for update existing task;

  function genereateId() {
    return Date.now().toString(36) + Math.random.toString(36).substring(1, 4);
  }
});

window.addEventListener("load", () => {
  console.log("Всё загружено, включая картинки");

  loadFromStorage();


});

function loadFromStorage() {
  /** @type {{id:string,text:string,completle:boolean}[]} */
  const storedArr = JSON.parse(localStorage.getItem("TaskList")) || [];

  for (const taskInfo of storedArr) {
    const task = document.createElement("div");
    task.classList.add("task");
    task.dataset.id = taskInfo.id;

    const task_checkbox = document.createElement("input");
    task_checkbox.type = "checkbox";
    task_checkbox.checked = taskInfo.completle;
    task_checkbox.addEventListener("change", (e) => {
      changeTaskStatus(e);
    });

    const task_text = document.createElement("label");
    task_text.textContent = taskInfo.text;


    const taskDeleteButton = document.createElement("button");
    taskDeleteButton.type = "button";
    taskDeleteButton.classList.add("task__delete_btn");
    taskDeleteButton.textContent = "DELETE"

    taskDeleteButton.addEventListener("click",(e)=>
    {
      taskDelete(e);

      const taskForDelete = e.target.closest("div")
      taskForDelete.remove();
    });
    task.appendChild(task_checkbox);
    task.appendChild(task_text);
    task.appendChild(taskDeleteButton);
    list.appendChild(task);
  }
}

function changeTaskStatus(evt) {
  const parentTask = evt.target.closest("div");
  const label = parentTask.querySelector("label");

  const task = {
    id: parentTask.dataset.id,
    text: label.textContent,
    completle: evt.target.checked, // <— вот так
  };

  updateIntoStorage(task);
}

function updateIntoStorage(taskForUpdate) {
  /**@type {object[]} */
  let storedArr = JSON.parse(localStorage.getItem("TaskList"));

  let taskInArray = storedArr.find((task) => task.id === taskForUpdate.id);

  if (taskInArray) {
    taskInArray.completle = taskForUpdate.completle,
    taskInArray.text = taskForUpdate.text

    localStorage.setItem("TaskList", JSON.stringify(storedArr));
  }
}
