import { showTasks, handleAddTaskForm } from "./src/functions.js";

//Configuration du localStorage
if(!window.localStorage.getItem("taskList")){
    window.localStorage.setItem("taskList", JSON.stringify([]));
}

//Gestion du bouton vide cache
let emptyTaskListButton = document.querySelector(".footer__emptyTaskListButton");
emptyTaskListButton.addEventListener("click", () =>{
    window.localStorage.setItem("taskList", JSON.stringify([]));
});

showTasks();
handleAddTaskForm();