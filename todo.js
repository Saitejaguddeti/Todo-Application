function getData()
{
    let addTodoButtonEl = document.getElementById("addTodoButton");
    let todoItemsContainer = document.getElementById("todoItemsContainer");
    
    
   let saveTodoButton = document.getElementById("saveTodoButton");
   


function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoListElementsList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
      return [];
    } else {
      return parsedTodoList;
    }
  }
  
  let todoList = getTodoListFromLocalStorage();

for (let eachTodo of todoList)
{
    console.log(eachTodo)
    createAndAppendTodo(eachTodo);
}

   

let todosCount = todoList.length;

saveTodoButton.onclick = function () {
    console.log(todoList)
  localStorage.setItem("todoListElementsList", JSON.stringify(todoList));
};


   

function onTodoStatusChange(checkboxId, labelId,todoId) {
  let checkboxElement = document.getElementById(checkboxId);
  let labelElement = document.getElementById(labelId);

  labelElement.classList.toggle('checked');
  let todoObjectIndex = todoList.findIndex(function(eachTodo) {
    let eachTodoId = "todo" + eachTodo.uniqueNo;

    if (eachTodoId === todoId) {
      return true;
    } else {
      return false;
    }
  });

  let todoObject = todoList[todoObjectIndex];

  if(todoObject.isChecked === true){
    todoObject.isChecked = false;
  } else {
    todoObject.isChecked = true;
  }
}

function onDeleteTodo(todoId) {
  let todoElement = document.getElementById(todoId);
  let index = todoList.findIndex(function(eachEl)
{
  todoElId = "todo"+eachEl.uniqueNo;
  if(todoElId===todoId)
  {
    return true
  }
})

  todoItemsContainer.removeChild(todoElement);
  todoList.splice(index,1);
}

function createAndAppendTodo(todo) {
    console.log(todo.text)
   
  let todoId = 'todo' + todo.uniqueNo;
  let checkboxId = 'checkbox' + todo.uniqueNo;
  let labelId = 'label' + todo.uniqueNo;

  let todoElement = document.createElement("li");
  todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
  todoElement.id = todoId;
  todoItemsContainer.appendChild(todoElement);

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = checkboxId;
  inputElement.checked = todo.isChecked;
  inputElement.onclick = function() {
    onTodoStatusChange(checkboxId, labelId,todoId);
  }

  inputElement.classList.add("checkbox-input");
  todoElement.appendChild(inputElement);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  todoElement.appendChild(labelContainer);

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", checkboxId);
  labelElement.id = labelId;
  labelElement.classList.add("checkbox-label");
  labelElement.textContent = todo.text;
  if (todo.isChecked === true) {
    labelElement.classList.add("checked");
  }
  labelContainer.appendChild(labelElement);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

  deleteIcon.onclick = function () {
    onDeleteTodo(todoId);
  };

  deleteIconContainer.appendChild(deleteIcon);
}


function onAddTodo() {
    
    
  let userInputElement = document.getElementById("todoUserInput");
  let userInputValue = userInputElement.value;

  if(userInputValue === ""){
    alert("Enter Valid Text");
    return;
  }

  todosCount = todosCount + 1;

  newTodoList = {
    text: userInputValue,
    uniqueNo: todosCount,
    isChecked: false
  };
    todoList.push(newTodoList);
  createAndAppendTodo(newTodoList);
  userInputElement.value = "";
}

addTodoButtonEl.onclick = function(){
  onAddTodo();
}

}