const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("message");
const responseContainer = document.getElementById("responseContainer");

sendBtn.onclick = sendMessage;
messageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

let draggedItem = null;

window.onload = () => {
    const saved = JSON.parse(localStorage.getItem("timelineEntries")) || [];
    saved.forEach(text => createEntry(text));
};

function saveToLocalStorage() {
    const entries = [...document.querySelectorAll(".responseText")].map(e => e.textContent);
    localStorage.setItem("timelineEntries", JSON.stringify(entries));
}

function createEntry(text) {
    const box = document.createElement("div");
    box.className = "responseBox";
    box.draggable = true;

    const textDiv = document.createElement("div");
    textDiv.className = "responseText";
    textDiv.textContent = text;
    textDiv.contentEditable = "false";

    const btns = document.createElement("div");
    btns.className = "buttons";

    const editBtn = document.createElement("button");
    editBtn.className = "icon-btn edit-btn";
    editBtn.textContent = "✏️";

    const saveBtn = document.createElement("button");
    saveBtn.className = "icon-btn save-btn";
    saveBtn.textContent = "💾";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "icon-btn delete-btn";
    deleteBtn.textContent = "🗑️";

    textDiv.onclick = () => btns.style.display = "flex";

    editBtn.onclick = () => {
        textDiv.contentEditable = "true";
        textDiv.style.background = "#fff9c4";
        editBtn.style.display = "none";
        saveBtn.style.display = "flex";
    };

    saveBtn.onclick = () => {
        textDiv.contentEditable = "false";
        textDiv.style.background = "#fff";
        saveBtn.style.display = "none";
        editBtn.style.display = "flex";
        btns.style.display = "none";
        saveToLocalStorage();
    };

    deleteBtn.onclick = () => {
        responseContainer.removeChild(box);
        saveToLocalStorage();
    };

    btns.appendChild(editBtn);
    btns.appendChild(saveBtn);
    btns.appendChild(deleteBtn);

    box.appendChild(textDiv);
    box.appendChild(btns);

    box.addEventListener("dragstart", () => {
        draggedItem = box;
        setTimeout(() => box.style.display = "none", 0);
    });

    box.addEventListener("dragend", () => {
        draggedItem = null;
        box.style.display = "block";
        saveToLocalStorage();
    });

    box.addEventListener("dragover", (e) => e.preventDefault());

    box.addEventListener("drop", (e) => {
        e.preventDefault();
        if (draggedItem && draggedItem !== box) {
            responseContainer.insertBefore(draggedItem, box.nextSibling);
            saveToLocalStorage();
        }
    });

    responseContainer.appendChild(box);
}

function sendMessage() {
    const text = messageInput.value.trim();
    if (text === "") return;

    createEntry(text);
    saveToLocalStorage();
    messageInput.value = "";
}
