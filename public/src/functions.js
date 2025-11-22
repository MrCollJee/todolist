//CONSTANTES
const taskListDOM = document.querySelector(".taskList");

/**
 * Affiche au chargement de la page les tâches stockées dans le local Storage
 */
export function showTasks(){
    const taskListStorage = JSON.parse(localStorage.getItem("taskList")); // Récupération de la liste des tâche dans le localStorage
    const darkmodeStorage = localStorage.getItem("theme");
    let darkmode = (darkmodeStorage === "darkmode");
    
    taskListStorage.reverse().forEach(task => { //On inverse l'ordre pour afficher la tâche la plus récente en premier (donc en dernier dans la boucle)
        newTask(task.content, darkmode, task.isDone, false);
    });
}

/**
 * Gestion de l'ajout d'une tâche via le champ de texte
 */
export function handleAddTaskForm(){
    const addTaskForm = document.querySelector(".addTask");
    const textareaTask = document.querySelector(".addTask__textarea");

    addTaskForm.addEventListener("submit", (event) => {
        const isInDarkmode = document.querySelector('body').classList.contains("darkmode");

        event.preventDefault();
        const taskContent = textareaTask.value // Récupération de la tâche dans le champ de texte

        if(textareaTask.value.trim() !== ""){
            newTask(taskContent, isInDarkmode);
            textareaTask.value = "";
        }
    })

    addTaskForm.addEventListener("keypress", (event) => {
        const isInDarkmode = document.querySelector('body').classList.contains("darkmode");

        if(event.key === "Enter"){
            event.preventDefault();
            const taskContent = textareaTask.value // Récupération de la tâche dans le champ de texte

            if(textareaTask.value.trim() !== ""){ // On empêche l'ajout de la tâche s'il n'y a rien d'écrit
                newTask(taskContent, isInDarkmode);
                textareaTask.value = "";
            }
        }
    })
}

/**
 * Ajout d'une nouvelle tâche dans le localStorage et le DOM
 * @param {string} taskContent : Le contenu de la tâche
 * @param {boolean} darkmode : Le thème actif de la page (dark ou light)
 * @param {boolean} isDone : Indique si la tâche est terminée ou non (par défaut nan)
 * @param {boolean} toLocalStorage : Indique si l'on stocke la tâche dans le local Storage (par défaut oui)
 */
function newTask(taskContent, darkmode = false, isDone = false, toLocalStorage = true){
    //Ajout de la tâche dans le DOM
    let taskContainer = document.createElement("div")
    let task = document.createElement("p");
    let deleteIcon = document.createElement("img");
    let deleteIconSrc = "./img/delete-icon.png";

    const taskListTitle = document.querySelector(".taskList__title");

    taskContainer.classList.add("taskContainer");

    task.textContent = taskContent;
    task.classList.add("taskList__task");
    if(isDone){
        task.classList.add("taskList__task--done");
    }

    //Ajout du bouton de suppression
    deleteIcon.classList.add("taskList__removeTaskButton");
    if(darkmode){
        deleteIconSrc = "./img/delete-icon--darkmode.png";
    }
    deleteIcon.setAttribute("src", deleteIconSrc);

    taskContainer.appendChild(task);
    taskContainer.appendChild(deleteIcon);
    insertAfter(taskListTitle, taskContainer);

    // Ajout de l'événement de clic pour marquer la tâche comme terminée
    task.addEventListener("click", (event) => {
        const taskListStorage = JSON.parse(localStorage.getItem("taskList")); //Récupération de taskList dans le local Storage
        const ArrayTaskList = Array.from(taskListDOM.children);// Convertir la collection HTMLCollection en Array pour utiliser indexOf
        const taskIndex = ArrayTaskList.indexOf(event.target.parentNode);// On récupère l'index du container dans la liste
        
        taskListStorage[taskIndex - 1].isDone = event.target.classList.toggle("taskList__task--done");
        localStorage.setItem("taskList", JSON.stringify(taskListStorage));
    })

    // Ajout de l'évènement de suppression
    deleteIcon.addEventListener("click", (event) => {
        // if(window.confirm("Etes-vous sûr de vouloir supprimer cette tâche ?")){
            //Suppression du localStorage
            const taskListStorage = JSON.parse(localStorage.getItem("taskList")); //Récupération de taskList dans le local Storage
            const ArrayTaskList = Array.from(taskListDOM.children);// Convertir la collection HTMLCollection en Array pour utiliser indexOf
            const taskIndex = ArrayTaskList.indexOf(event.target.parentNode);// On récupère l'index du container dans la liste
            
            taskListStorage.splice(taskIndex - 1, 1); //taskIndex - 1 => Décalage entre TaskListDOM et Storage car ArrayTaskList contient le titre en plus
            localStorage.setItem("taskList", JSON.stringify(taskListStorage)); 

            taskListDOM.removeChild(event.target.parentNode); 
        // }
    })

    //Changement de couleur de l'îcone au survol du curseur
    deleteIcon.addEventListener("mouseover", (event) => {
        const iconSrc = event.target.getAttribute("src");
        event.target.setAttribute("src", "./img/delete-icon--hover.png");

        event.target.addEventListener("mouseout", (e) => {
            e.target.setAttribute("src", iconSrc);
        })
    })

    //Ajout conditionnel de la tâche dans le localStorage
    if(toLocalStorage){
        const newTask = {
            'content': taskContent, 
            'isDone': isDone
        };
        let taskListStorage = localStorage.getItem("taskList");

        taskListStorage = JSON.parse(taskListStorage);
        taskListStorage.unshift(newTask); 
        localStorage.setItem("taskList", JSON.stringify(taskListStorage));
    }
}

// Source - https://stackoverflow.com/a
// Posted by karim79, modified by community. See post 'Timeline' for change history
// Retrieved 2025-11-12, License - CC BY-SA 4.0
/**
 * Permet d'insérer un élément HTML après un autre
 * @param {*} referenceNode : élément de référence 
 * @param {*} newNode : élément à ajouter
 */
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
