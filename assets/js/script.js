//top form element in header that you type into
var formEl = document.querySelector("#task-form");
//"tasks to do" element - the new boxes
var tasksToDoEl = document.querySelector("#tasks-to-do");
//counter to create/assign ID numbers to tasks
var taskIDCounter = 0;
//declaration for page content ID element in the main class
var pageContentEl = document.querySelector("#page-content");

var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

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

  var isEdit = formEl.hasAttribute("data-task-id");

  //package up data as an object
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput,
  };

  // has data attribute, so get task id and call function to complete edit process
  if (isEdit) {
    var taskID = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskID);
  }
  // no data attribute, so create object as normal and pass to createTaskEl function
  else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
    };

    //send task data obj as the parameter to create a new task
    createTaskEl(taskDataObj);
  }


}

var createTaskEl = function(taskDataObj){
  //creates an li item in the html
  var listItemEl = document.createElement("li");  
  listItemEl.className = "task-item";

  //add task id as a custom attribute
  listItemEl.setAttribute("data-task-id", taskIDCounter);

  //create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  //give it a class name
  taskInfoEl.className = "task-info";
  //add hTML content to div
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl);

var taskActionsEl = createTaskActions(taskIDCounter);
listItemEl.appendChild(taskActionsEl);

  //adds li element to the list
  tasksToDoEl.appendChild(listItemEl);

var taskActionsEl = createTaskActions(taskIDCounter);

  //increase task counter for next unique id
  taskIDCounter++;
}

var createTaskActions = function(taskID) {
 //creates a div with a specific class name
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";
  //creates buttons
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskID);
  //adds the button to the div declared above
  actionContainerEl.appendChild(editButtonEl);

  //creates delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskID);
  //adds the button to the div declared above
  actionContainerEl.appendChild(deleteButtonEl);
  
  //select element
  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskID);

  actionContainerEl.appendChild(statusSelectEl);

  var statusChoices = ["To Do", "In Progress", "Completed"];

  for (var i = 0; i < statusChoices.length; i++){
    //create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

    //append to select
    statusSelectEl.appendChild(statusOptionEl);
  }
  
  return actionContainerEl;
  

}

var taskButtonHandler = function(event) {
  //console.log(event.target);
  var targetEl = event.target;

  //finds edit button and allows edit function
  if (targetEl.matches(".edit-btn")) {
    var taskID = targetEl.getAttribute("data-task-id");
    editTask(taskID);
  }

  //finds delete button performs delete function 
  if (targetEl.matches(".delete-btn")) {
    //get element's task ID 
    var taskID = targetEl.getAttribute("data-task-id");
    deleteTask(taskID);
  }

};

var deleteTask = function(taskID) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskID + "']");
  taskSelected.remove();
}

var editTask = function(taskID) {
  //get task list item element
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskID + "']");

  //get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  var taskType = taskSelected.querySelector("span.task-type").textContent;

  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;

  document.querySelector("#save-task").textContent = "Save Task";
  formEl.setAttribute("data-task-id", taskID);
}

var completeEditTask = function(taskName, taskType, taskID){
  //console.log(taskName, taskType, taskID);

  //find matching task list item
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskID + "']");

  //set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add task";
};

var taskStatusChangeHandler = function(event) {
  //get the task item's id
  var taskID = event.target.getAttribute("data-task-id");

  //get the current selected option's value and convert to lowercase
  var statusValue = event.target.value.toLowerCase();

  //find the parent task item element based on the id
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskID + "']");

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }
}


pageContentEl.addEventListener("click", taskButtonHandler)

formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);