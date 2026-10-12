const todoForm = document.querySelector("#todo-form");
const titleInput = document.querySelector("#title");
const formMessage = document.querySelector("#form-message");
const taskList = document.querySelector("#task-list");
const tasksSection = document.querySelector("#tasks-section");
const taskCount = document.querySelector("#task-count");

todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formMessage.textContent = "";

    const formData = new FormData(todoForm);
    const title = formData.get("title").trim();

    if (!title) {
        formMessage.textContent = "Please enter a task title before adding your task.";
        titleInput.focus();
        return;
    }

    const task = {
        title,
        description: formData.get("description").trim(),
        priority: formData.get("priority"),
        dueDate: formData.get("dueDate"),
        category: formData.get("category"),
    };

    addTaskToPage(task);
    todoForm.reset();
    formMessage.textContent = "";
    titleInput.focus();
});

function addTaskToPage(task) {
    const listItem = document.createElement("li");
    listItem.className = "task-item";

    const titleRow = document.createElement("div");
    titleRow.className = "task-title-row";

    const title = document.createElement("h3");
    title.className = "task-title";
    title.textContent = task.title;
    titleRow.append(title);

    const description = document.createElement("p");
    description.className = "task-description";
    description.textContent = task.description || "No description provided.";

    const metadata = document.createElement("div");
    metadata.className = "task-meta";
    metadata.append(
        createTag(task.priority, `priority-${task.priority.toLowerCase()}`),
        createTag(task.category),
    );

    if (task.dueDate) {
        const formattedDate = new Date(`${task.dueDate}T00:00:00`).toLocaleDateString(
            undefined,
            { year: "numeric", month: "short", day: "numeric" },
        );
        metadata.append(createTag(`Due ${formattedDate}`));
    }

    listItem.append(titleRow, description, metadata);
    taskList.prepend(listItem);
    tasksSection.hidden = false;

    const count = taskList.children.length;
    taskCount.textContent = `${count} ${count === 1 ? "task" : "tasks"}`;
}

function createTag(text, className = "") {
    const tag = document.createElement("span");
    tag.className = `task-tag ${className}`.trim();
    tag.textContent = text;
    return tag;
}
