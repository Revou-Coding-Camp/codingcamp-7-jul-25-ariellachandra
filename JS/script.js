const form = document.getElementById("todoForm");
const todoInput = document.getElementById("todo");
const dateInput = document.getElementById("date");
const taskList = document.getElementById("taskList");
const filterSelect = document.getElementById("filterSelect");
const deleteButton = document.getElementById("deleteButton");
const addButton = document.getElementById("addButton");

let todos = [];
let editIndex = -1;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = todoInput.value.trim();
    const date = dateInput.value;

    if (!task || !date) {
        alert("Please fill in both fields.");
        return;
    }

    if (editIndex === -1) {
        todos.push({ task, date, completed: false });
    } else {
        todos[editIndex].task = task;
        todos[editIndex].date = date;
        editIndex = -1;
        addButton.textContent = "+";
    }

    todoInput.value = "";
    dateInput.value = "";
    renderTodos();
});

deleteButton.addEventListener("click", () => {
        todos = [];
        filterSelect.value = "none"; 
        renderTodos();
});

filterSelect.addEventListener("change", () => {
    renderTodos();
});

function renderTodos() {
    taskList.innerHTML = "";

    let filteredTodos = [...todos];
    const filter = filterSelect.value;

    if (filter === "complete") {
        filteredTodos = todos.filter(todo => todo.completed);
    } else if (filter === "all" || filter === "none") {
        filteredTodos = [...todos];
    }

    if (filteredTodos.length === 0) {
        taskList.innerHTML = `<tr><td colspan="4">No Task</td></tr>`;
        return;
    }

    filteredTodos.forEach((todo, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${todo.task}</td>
            <td>${todo.date}</td>
            <td>${todo.completed ? "Completed" : "Uncompleted"}</td>
            <td>
                <button class="edit-btn" onclick="editTask(${index})">✏️</button>
                <button class="complete-btn" onclick="toggleComplete(${index})">✅</button>
                <button class="delete-btn" onclick="deleteTask(${index})">🗑️</button>
            </td>
        `;
        taskList.appendChild(row);
    });
}

function editTask(index) {
    todoInput.value = todos[index].task;
    dateInput.value = todos[index].date;
    editIndex = index;
    addButton.textContent = "Save";
}

function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}

function deleteTask(index) {
    todos.splice(index, 1);
    renderTodos();
}
