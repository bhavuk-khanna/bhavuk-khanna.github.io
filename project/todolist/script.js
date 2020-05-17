//detect keypresses

document.addEventListener("keydown", keyPressed);

function keyPressed(event) {
    var newTaskDesc = document.getElementById("task-desc");
    if(newTaskDesc.value){        
        var addBtn = document.getElementsByClassName('add-btn')[0];        
        addBtn.style.display = "inline-block";
    }
    else {
         var addBtn = document.getElementsByClassName('add-btn')[0];        
         addBtn.style.display = "none";
    }
    
    
    
    if (event.key === "Enter") {
        addTask();
    }
};

var addTaskBtn = document.getElementsByClassName('add-btn')[0];    
addTaskBtn.onclick =addTask;




//Adding a new Task

function addTask(){
     var newTask = document.getElementById("task-desc");
    if(newTask.value!==""){
            var listParent = document.getElementsByTagName("UL")[0];
            
            
            console.log(listParent);
            var listItem = document.createElement("LI");
            //assgin classes to the added LI tag
            listItem.classList.add("flex");
            listItem.classList.add("space-bw");
            var inputDiv = document.createElement("DIV");
            var checkBox = document.createElement("INPUT");
            checkBox.setAttribute("type", "checkbox");
            
            var textContent = document.createTextNode("      "+ newTask.value);
            var deleteBtn  = document.createElement("DIV");
            
            deleteBtn.classList.add("del-task");
            var icon = document.createElement("I");
            icon.classList.add("far");
            icon.classList.add("fa-times-circle");
            inputDiv.appendChild(checkBox);
            inputDiv.appendChild(textContent);
            deleteBtn.appendChild(icon);
            listItem.appendChild(inputDiv);
            listItem.appendChild(deleteBtn);
            listParent.appendChild(listItem);
            var del = document.getElementsByClassName("del-task");
            del[del.length-1].onclick = function() {
                var div = this.parentElement;
                div.remove();
                updateTaskCount();
            }
            
            updateTaskCount();
            newTask.value ="";
            var addBtn = document.getElementsByClassName('add-btn')[0];        
            addBtn.style.display = "none";
       }
}
//if input box is empty do nothing
//else create an LI with the provided input and add it at the end of the ul


//deleting a task

var del = document.getElementsByClassName("del-task");

for (let i = 0; i < del.length; i++) {
  del[i].onclick = function() {
    var div = this.parentElement;
    div.remove();
    updateTaskCount();
  }
}

function updateTaskCount(){
    var numTask = document.getElementsByTagName("LI").length;
    var taskLeft = document.getElementById("task-left");
    taskLeft.innerHTML = numTask+ "  tasks left";
}


//marking a task as checked
var check = document.getElementsByTagName("input");

for (let i = 0; i < check.length; i++) {
  check[i].onclick = function() {
    var div = this.parentElement;
      
    div.classList.toggle("checked");
  }
}






