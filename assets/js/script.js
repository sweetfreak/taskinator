//top form element in header that you type into
var formEl = document.querySelector("#task-form");
//"tasks to do" element - the new boxes
var tasksToDoEl = document.querySelector("#tasks-to-do");

//function to create a new task
var taskFormHandler = function() {
    //prevents page from refreshing/default browser scripts from running
  event.preventDefault();
  //creates new variable for whatever you type into the formEl, and puts it in the box
  //notice the ".value" at the end
  var taskNameInput = document.querySelector("input[name='task-name']").value;  
  var taskTypeInput = document.querySelector("select[name='task-type']").value;
  
  //check if input values are empty strings
  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!")
    return false;
  }
  formEl.reset();

  //package up data as an object
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput,
  };

  //send it as an argument to createTaskEl
  createTaskEl(taskDataObj);
}

var createTaskEl = function(taskDataObj){
  //creates an li item in the html
  var listItemEl = document.createElement("li");  
  listItemEl.className = "task-item";

  //create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  //give it a class name
  taskInfoEl.className = "task-info";
  //add hTML content to div
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

  listItemEl.appendChild(taskInfoEl);

  //adds li element to the list
  tasksToDoEl.appendChild(listItemEl);

}

formEl.addEventListener("submit", taskFormHandler);


