let oldInputValue; // Declare oldInputValue for editing purposes

const data = new Date();
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector(".todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector(".cancel-edit-btn");

const timeElapsed = Date.now();
const today = new Date(timeElapsed);
document.getElementById("date").innerHTML = today.toDateString();

function time(){
  const data = new Date();
  let h = data.getHours();
  let m = data.getMinutes();
  let s = data.getSeconds();

  if(h < 10) h = "0" + h;
  if(m < 10) m = "0" + m;
  if(s < 10) s = "0" + s;

  document.getElementById("hour").innerHTML = h + ":" + m + ":" + s;
  setTimeout(time, 500); // Changed to avoid calling as a string
}


todoForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the form from refreshing the page
  
  const inputValue = todoInput.value.trim(); // Get and trim the input value
  if (inputValue) {
    saveTodo(inputValue); // Call function to create a to-do
    todoInput.value = ""; // Clear the input field
    todoInput.focus();
  }
});


const saveTodo = (text) => {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("finish-todo");
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  todo.appendChild(doneBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
  todo.appendChild(editBtn);

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-todo");
  removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  todo.appendChild(removeBtn);

  // Append the new to-do to the list
  todoList.appendChild(todo);

  // Remove the .hide class from .todo-list to make it visible
  todoList.classList.remove("hide");

  todoInput.value = ""; // Clear the input field
  todoInput.focus();
}



document.addEventListener("click", (e) => {
  const targetE1 = e.target;
  const parentE1 = targetE1.closest("div.todo"); // Ensure this only targets the .todo item
  let todoTitle;

  if (parentE1 && parentE1.querySelector("h3")) {
    todoTitle = parentE1.querySelector("h3").innerText;
  }

  if (targetE1.classList.contains("finish-todo")) {
    parentE1.classList.toggle("done");
  }

  if (targetE1.classList.contains("remove-todo")) {
    parentE1.remove();  // Remove the item from the DOM
  }

  if (targetE1.classList.contains("edit-todo")) {
    toggleForms();
    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }
});


const toggleForms = () => {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
}

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleForms();
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;
  if(editInputValue) updateTodo(editInputValue);

  toggleForms();
});

const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo");
  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");

    if(todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;
    }
  });
}

