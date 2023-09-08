// Retrieving tasks from local storage or initializing an empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to get data from form and store to local storage
const getData = () => {
    const taskIn = document.getElementById("taskIn").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    const newItem = {
        taskIn: taskIn,
        date: date.toNormalDate(),
        time: time,
        itemID: Date.now()
    };
    tasks.push(newItem);

    // Resetting form and displaying new note
    document.getElementById("taskForm").reset();
    makeNoteHTML(newItem);

    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Function to render a task item as HTML
const makeNoteHTML = (item) => {
    const noteHTML = `
        <!-- Task note structure -->
        <div class="fade-in addP_Note">
          <button onclick="deleteNote(${item.itemID})" class="close-btn">
            <i class="bi bi-x-circle"></i>
          </button>
          <div class="myTask">${item.taskIn}</div>
          <span class="dDate">Due Date
            <div class="task1">${item.date}</div>
            <div class="dueD">${item.time}</div>
          </span>
        </div>
    `;

    // Appending the note to the notes container
    document.getElementById("add_Note").insertAdjacentHTML("beforeend", noteHTML);

    // Fading animation for note
    setTimeout(() => {
        document.querySelector(".fade-in").classList.remove("fade-in");
    }, 1000);
};

// Function to load saved tasks from local storage on page load
const retrieveData = () => {
    const myTasks = JSON.parse(localStorage.getItem("tasks"));

    if (Array.isArray(myTasks)) {
        tasks = myTasks;
        tasks.forEach(makeNoteHTML);
    }
};
retrieveData();

// Function to delete a task
const deleteNote = (itemID) => {
    tasks = tasks.filter((item) => item.itemID !== itemID);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    const note = document.querySelector(`[onclick="deleteNote(${itemID})"]`).parentNode;
    note.parentNode.removeChild(note);
};

// Function to convert date to desired format
String.prototype.toNormalDate = function() {
    const ymd = this.split("-");
    return ymd[2] + "/" + ymd[1] + "/" + ymd[0];
};
