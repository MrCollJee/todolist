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
let emptyTaskListButton = document.querySelector(".taskList__emptyAllButton");
emptyTaskListButton.addEventListener("click", () =>{
    let taskList = document.querySelector(".taskList");

    if (!taskList) return;

    if (!window.confirm("Êtes-vous sûr de vouloir supprimer toutes les tâches ?")) return;

    // Récupère une copie des enfants et supprime tous sauf le premier (titre) et le dernier (bouton)
    const children = Array.from(taskList.children);
    const toRemove = children.slice(1, -1); // vide si <= 2 enfants

    toRemove.forEach(child => taskList.removeChild(child));

    // Met à jour le localStorage
    localStorage.setItem("taskList", JSON.stringify([]));
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
