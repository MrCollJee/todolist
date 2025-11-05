/**
 * Affiche au chargement de la page les tâches stockées dans le local Storage
 */
export function showTasks(){
    const taskListStorage = JSON.parse(window.localStorage.getItem("taskList")); // Récupération de la liste des tâche dans le localStorage
    taskListStorage.forEach(task => {
        addNewTask(task.content, task.isDone, false);
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

        addNewTask(taskContent);
    })
}

/**
 * Ajout d'une nouvelle tâche dans le localStorage et le DOM
 * @param {string} taskContent : Le contenu de la tâche
 * @param {boolean} isDone : Indique si la tâche est terminée ou non (par défaut nan)
 * @param {boolean} toLocalStorage : Indique si l'on stocke la tâche dans le local Storage (par défaut oui)
 */
function addNewTask(taskContent, isDone = false, toLocalStorage = true){
    //Ajout de la tâche dans le DOM
    const taskListDOM = document.querySelector(".taskList");
    
    // let taskContainer = document.createElement("div");
    let task = document.createElement("p");
    // let taskRemover = document.createElement("button");

    // taskContainer.classList.add("taskList__task")

    task.textContent = taskContent;
    task.classList.add("taskList__task");

    // taskRemover.value = "Supprimer";
    // taskRemover.classList.add("task__removeButton");

    if(isDone){
        task.classList.add("taskList__task--done");
    }

    // taskContainer.appendChild(task);
    // taskContainer.appendChild(taskRemover);


    taskListDOM.appendChild(task);

    // Ajout de l'événement de clic pour marquer la tâche comme terminée
    task.addEventListener("click", (event) => {
        event.target.classList.toggle("taskList__task--done");
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
