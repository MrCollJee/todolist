//CONSTANTES
const taskListDOM = document.querySelector(".taskList");

/**
 * Affiche au chargement de la page les tâches stockées dans le local Storage
 */
export function showTasks(){
    const taskListStorage = JSON.parse(window.localStorage.getItem("taskList")); // Récupération de la liste des tâche dans le localStorage
    taskListStorage.forEach(task => {
        newTask(task.content, task.isDone, false);
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
        const taskContent = textareaTask.value // Récupération de la tâche dans le champ de texte

        newTask(taskContent);
    })
}

/**
 * Ajout d'une nouvelle tâche dans le localStorage et le DOM
 * @param {string} taskContent : Le contenu de la tâche
 * @param {boolean} isDone : Indique si la tâche est terminée ou non (par défaut nan)
 * @param {boolean} toLocalStorage : Indique si l'on stocke la tâche dans le local Storage (par défaut oui)
 */
function newTask(taskContent, isDone = false, toLocalStorage = true){
    //Ajout de la tâche dans le DOM
    let taskContainer = document.createElement("div")
    let task = document.createElement("p");
    let taskRemover = document.createElement("button");

    taskContainer.classList.add("taskContainer");

    task.textContent = taskContent;
    task.classList.add("taskList__task");
    if(isDone){
        task.classList.add("taskList__task--done");
    }

    taskRemover.innerText = "Supprimer";
    taskRemover.classList.add("taskList__removeTaskButton");

    taskContainer.appendChild(task);
    taskContainer.appendChild(taskRemover);
    taskListDOM.appendChild(taskContainer);

    // Ajout de l'événement de clic pour marquer la tâche comme terminée
    task.addEventListener("click", (event) => {
        event.target.classList.toggle("taskList__task--done");
    })

    // Ajout de l'évènement de suppression
    taskRemover.addEventListener("click", (event) => {
        if(window.confirm("Etes-vous sûr de vouloir supprimer cette tâche ?")){
            //Suppression du localStorage
            const taskListStorage = JSON.parse(window.localStorage.getItem("taskList")); //Récupération de taskList dans le local Storage
            const ArrayTaskList = Array.from(taskListDOM.children);// Convertir la collection HTMLCollection en Array pour utiliser indexOf
            const taskIndex = ArrayTaskList.indexOf(event.target.parentNode);// On récupère l'index du container dans la liste
            
            taskListStorage.splice(taskIndex - 1, 1); //taskIndex - 1 => Décalage entre TaskListDOM et Storage car ArrayTaskList contient le titre en plus
            window.localStorage.setItem("taskList", JSON.stringify(taskListStorage)); 

            taskListDOM.removeChild(event.target.parentNode); 
        }
    })

    //Ajout conditionnel de la tâche dans le localStorage
    if(toLocalStorage){
        const newTask = {
            'content': taskContent, 
            'isDone': isDone
        };
        let taskListStorage = window.localStorage.getItem("taskList");

        taskListStorage = JSON.parse(taskListStorage);
        taskListStorage.push(newTask); 
        window.localStorage.setItem("taskList", JSON.stringify(taskListStorage));
    }
}