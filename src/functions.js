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
        newTask(task, darkmode, false);
    });
}

/**
 * Gestion de l'ajout d'une tâche via le champ de texte
 */
export function handleAddTaskForm(){
    const addTaskForm = document.querySelector(".addTask");
    const textareaTask = document.querySelector(".addTask__textarea");

    addTaskForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const isInDarkmode = document.querySelector('body').classList.contains("darkmode");
        let task = {
            "content": textareaTask.value,
            "isDone": false,
            "addedAt": new Date(),
        }

        if(task.content.trim() !== ""){
            newTask(task, isInDarkmode);
            textareaTask.value = "";
        }
    })

    addTaskForm.addEventListener("keypress", (event) => {
        const isInDarkmode = document.querySelector('body').classList.contains("darkmode");

        if(event.key === "Enter"){
            event.preventDefault();
            const taskContent = textareaTask.value // Récupération de la tâche dans le champ de texte
            let task = {
                "content": textareaTask.value,
                "isDone": false,
                "addedAt": new Date(),
            }
            
            if(task.content.trim() !== ""){
                newTask(task, isInDarkmode);
                textareaTask.value = "";
            }
        }
    })
}

/**
 * Ajout d'une nouvelle tâche dans le localStorage et le DOM
 * @param {Object} task : La tâche
 * @param {boolean} darkmode : Le thème actif de la page (dark ou light)
 * @param {boolean} toLocalStorage : Indique si l'on stocke la tâche dans le local Storage (par défaut oui)
 */
function newTask(task, darkmode = false, toLocalStorage = true){
    //Création des éléments du DOM pour l'ajout de la tâche
    let taskContainer = document.createElement("div")
    let taskDOM = document.createElement("p");
    let taskDate = document.createElement("p");
    let divTaskIcon = document.createElement("div"); // Div qui va contenir la tâche et l'icône supprimer pour la flexbox
    let deleteIcon = document.createElement("img");
    let deleteIconSrc = "./img/delete-icon.png";

    const taskListTitle = document.querySelector(".taskList__title");

    //Configuration des éléments (ajouts classe & contenu)
    taskContainer.classList.add("taskContainer");
    divTaskIcon.classList.add("taskContainer__divTaskIcon");

    taskDate.textContent = formatDate(new Date(task.addedAt));
    taskDate.classList.add('taskList__taskDate');

    taskDOM.textContent = task.content;
    taskDOM.classList.add("taskList__task");
    if(task.isDone){
        taskDOM.classList.add("taskList__task--done");
    }

    //Ajout du bouton de suppression
    deleteIcon.classList.add("taskList__removeTaskButton");
    if(darkmode){
        deleteIconSrc = "./img/delete-icon--darkmode.png";
    }
    deleteIcon.setAttribute("src", deleteIconSrc);

    //Insertion des éléments crées dans le DOM
    divTaskIcon.appendChild(taskDOM);
    divTaskIcon.appendChild(deleteIcon);
    taskContainer.appendChild(taskDate);
    taskContainer.appendChild(divTaskIcon);
    insertAfter(taskListTitle, taskContainer);

    handleDeleteIcon(deleteIcon);
    handleTaskDone(taskDOM);

    //Ajout conditionnel de la tâche dans le localStorage
    if(toLocalStorage){
        const newTask = {
            'content': task.content, 
            'isDone': task.isDone,
            'addedAt': Date.parse(task.addedAt),
        };
        let taskListStorage = localStorage.getItem("taskList");

        taskListStorage = JSON.parse(taskListStorage);
        taskListStorage.unshift(newTask); 
        localStorage.setItem("taskList", JSON.stringify(taskListStorage));
    }
}

/**
 * Gestion des boutons supprimer une tâche
 * @param {HTMLElement} deleteIcon : l'icône supprimer à gérer
 */
function handleDeleteIcon(deleteIcon){
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
}

/**
 * Gestion de l'affichage d'une tâche terminée
 * @param {HTMLElement} task : la tâche à gérer
 */
function handleTaskDone(task){
    // Ajout de l'événement de clic pour marquer la tâche comme terminée
    task.addEventListener("click", (event) => {
        const taskListStorage = JSON.parse(localStorage.getItem("taskList")); //Récupération de taskList dans le local Storage
        const ArrayTaskList = Array.from(taskListDOM.children);// Convertir la collection HTMLCollection en Array pour utiliser indexOf
        const taskIndex = ArrayTaskList.indexOf(event.target.parentNode);// On récupère l'index du container dans la liste
        
        taskListStorage[taskIndex - 1].isDone = event.target.classList.toggle("taskList__task--done");
        localStorage.setItem("taskList", JSON.stringify(taskListStorage));
    })
}

// Source - https://stackoverflow.com/a
// Posted by karim79, modified by community. See post 'Timeline' for change history
// Retrieved 2025-11-12, License - CC BY-SA 4.0
/**
 * Permet d'insérer un élément HTML après un autre
 * @param {HTMLElement} referenceNode : élément de référence 
 * @param {HTMLElement} newNode : élément à ajouter
 */
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

/**
 * Formate une Date en "dd/mm/yyyy à hh:mm" (Générée par l'outil IA)
 * @param {Date} date : la date à formatter
 * @return La date formatée 
 */ 
function formatDate(date){
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');

    return `Ajoutée le ${dd}/${mm}/${yyyy} à ${hh}:${min}`;
}
