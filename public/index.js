import { showTasks, handleAddTaskForm } from "./src/functions.js";

//Configuration du localStorage
if(!localStorage.getItem("taskList")){
    localStorage.setItem("taskList", JSON.stringify([]));
}
if(!localStorage.getItem("theme")){
    localStorage.setItem("theme", "lightmode");
}

showTasks();
handleAddTaskForm();

//Gestion du bouton tout supprimer
let emptyTaskListButton = document.querySelector(".footer__emptyTaskListButton");
emptyTaskListButton.addEventListener("click", () =>{
    let taskList = document.querySelector(".taskList");

    if(window.confirm("Êtes-vous sûr de vouloir supprimer toutes les tâches ?")) {
        // Supprime tous les enfants sauf le premier (le titre)
        while (taskList.children.length > 1) {
            taskList.removeChild(taskList.lastChild);
        }
        localStorage.setItem("taskList", JSON.stringify([]));
    }
});

//Gestion du thème
const themeButton = document.querySelector(".themeButton");
const theme = localStorage.getItem("theme");
const body = document.querySelector("body");

if(theme === "darkmode"){
    body.classList.add("darkmode");
}

themeButton.addEventListener("click", () => {
    let deleteIcons = document.querySelectorAll(".taskList__removeTaskButton");
    
    if(body.classList.toggle("darkmode")){
        localStorage.setItem("theme", "darkmode");
        //On met l'icône claire de suppression
        deleteIcons.forEach(icon => {
            icon.setAttribute("src", "./img/delete-icon--darkmode.png");
        });
    }
    else{
        localStorage.setItem("theme", "lightmode");
        deleteIcons.forEach(icon => {
            icon.setAttribute("src", "./img/delete-icon.png");
        });
    }
})
