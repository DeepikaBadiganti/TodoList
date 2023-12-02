const addButton = document.getElementById("addButton");
const inputBox = document.getElementById("inputBox");
const itemsContainer = document.getElementById("itemsContainer");
const DeleteButton = document.getElementById("deleteButton");
const saveButton = document.getElementById("saveButton");


function strigyfyObject() {
    let strigyfyObj = localStorage.getItem("todoList");
    let paredObj = JSON.parse(strigyfyObj);
    if(paredObj === null) {
        return [];
    }
    return paredObj;    
}

let todoList = strigyfyObject();

saveButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

let count = todoList.length;

function checkBoxStatus(todoElId, checkboxElId, labelElId) {
    const labelEl = document.getElementById(labelElId);
    
    labelEl.classList.toggle("checked");

    const checkBoxIndex = todoList.findIndex(function (todo) {
         let eachTodo = "todo" + todo.uniqueId;
         if (eachTodo === todoElId) {
             return true;
         } else {   
             return false;
         }
    });

    let todoObj = todoList[checkBoxIndex];
    if (todoObj.isChecked === true) {
        todoObj.isChecked = false;
    } else {
        todoObj.isChecked = true;
    }
}

function onDeleteTodo (todoElId) {
    const todoEl = document.getElementById(todoElId);
    itemsContainer.removeChild(todoEl);

    const deleteIndex = todoList.findIndex(function (todo) {
        let eachTodo = "todo" + todo.uniqueId;
        if (eachTodo === todoElId) {
            return true;
        } else {   
            return false;
        }
    });
    todoList.splice(deleteIndex, 1);
}

function createAndAppend(todo) {
    const todoElId = 'todo' + todo.uniqueId;
    const checkboxElId = 'checkbox' + todo.uniqueId;
    const deleteElId = 'delete' + todo.uniqueId;
    const labelElId = 'label' + todo.uniqueId;

    const listItem = document.createElement("li");
    listItem.classList.add("todoItem");
    listItem.id = todoElId;
    itemsContainer.appendChild(listItem); 
  
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox-ele");
    checkbox.id = checkboxElId;
    checkbox.checked = todo.isChecked;
    listItem.appendChild(checkbox);
    checkbox.onclick = function () {
        checkBoxStatus(todoElId, checkboxElId, labelElId);;
    }
  
    const divContainer = document.createElement("div");
    divContainer.classList.add("label-container");
    listItem.appendChild(divContainer);
  
    const label = document.createElement("label");   
    label.classList.add("label-ele"); 
    label.id = labelElId;
    label.innerText = todo.value;
    label.setAttribute("for", checkboxElId);
    if (todo.isChecked === true) {
        label.classList.add("checked");
    }

    divContainer.appendChild(label);
  
    const deleteContainer = document.createElement("div");
    deleteContainer.classList.add("delete-container");
    deleteContainer.id = deleteElId;
    divContainer.appendChild(deleteContainer);
  
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash-alt","delete-icon");
    deleteContainer.appendChild(deleteIcon);
    deleteContainer.onclick = function () {
        onDeleteTodo(todoElId);
    }
  };


addButton.addEventListener("click", function () {
    const inputBox = document.getElementById("inputBox");

    if (inputBox.value === "") {
        alert("Please enter a task");
        return;
    }

    count = count + 1;
    let newTodo = {
        uniqueId: count,
        value: inputBox.value,
        isChecked: false,
    };

    todoList.push(newTodo);
    createAndAppend(newTodo);
    inputBox.value = "";
});

for (let todo of todoList) {
    createAndAppend(todo);
}