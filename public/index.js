handleAddTaskForm();

/**
 * Gestion de l'ajout d'une tâche via le champ de texte
 */
function handleAddTaskForm(){
    const addTaskForm = document.querySelector(".addTask");
    const textareaTask = document.querySelector(".addTask__textarea");
    const taskList = document.querySelector(".taskList");

    addTaskForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const taskContent = textareaTask.value // Récupération de la tâche dans le champ de texte
        
        newTask(taskContent);
    })
}

/**
 * Création d'une nouvelle tâche dans la liste des tâches
 * @param {string} taskContent : Le contenu de la tâche
 * @param {boolean} isDone : Indique si la tâche est terminée ou non (par défaut false)
 */
function newTask(taskContent, isDone = false){
    const newTask = document.createElement("p");
    const taskList = document.querySelector(".taskList");

    newTask.classList.add("taskList__task");
    if(isDone){
        newTask.classList.add("taskList__task--done");
    }
    newTask.textContent = taskContent;

    taskList.appendChild(newTask);  
}
