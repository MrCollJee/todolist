import { showTasks, handleAddTaskForm } from "./src/functions.js";

//Configuration du localStorage
if(!window.localStorage.getItem("taskList")){
    window.localStorage.setItem("taskList", JSON.stringify([]));
}

//Gestion du bouton tout supprimer
let emptyTaskListButton = document.querySelector(".footer__emptyTaskListButton");
emptyTaskListButton.addEventListener("click", () =>{
    let taskList = document.querySelector(".taskList");

    if(window.confirm("Êtes-vous sûr de vouloir supprimer toutes les tâches ?")) {
        // Supprime tous les enfants sauf le premier (le titre)
        while (taskList.children.length > 1) {
            taskList.removeChild(taskList.lastChild);
        }
        window.localStorage.setItem("taskList", JSON.stringify([]));
    }
});


showTasks();
handleAddTaskForm();