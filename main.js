const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("message");
const dateInput = document.getElementById("dateInput");
const responseContainer = document.getElementById("responseContainer");

sendBtn.onclick = sendMessage;
messageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});

let draggedItem = null;

/* ---------------------------
   Create a timeline entry
---------------------------- */
function createEntry(text, date = "") {
    const box = document.createElement("div");
    box.className = "responseBox";
    box.draggable = true;

    // Optional date label
    if (date && date !== "") {
        const dateLabel = document.createElement("div");
        dateLabel.className = "dateLabel";
        dateLabel.textContent = date;
        dateLabel.style.fontSize = "12px";
        dateLabel.style.color = "#555";
        dateLabel.style.padding = "4px 6px 0px 6px";
        dateLabel.style.fontStyle = "italic";
        box.appendChild(dateLabel);
    }

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

    // Show buttons when clicking the text
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
    };

    deleteBtn.onclick = () => {
        responseContainer.removeChild(box);
    };

    btns.appendChild(editBtn);
    btns.appendChild(saveBtn);
    btns.appendChild(deleteBtn);

    box.appendChild(textDiv);
    box.appendChild(btns);

    // --- Drag and Drop Events ---
    box.addEventListener("dragstart", () => {
        draggedItem = box;
        setTimeout(() => box.style.display = "none", 0);
    });

    box.addEventListener("dragend", () => {
        draggedItem = null;
        box.style.display = "block";
    });

    box.addEventListener("dragover", (e) => e.preventDefault());

    box.addEventListener("drop", (e) => {
        e.preventDefault();
        if (draggedItem && draggedItem !== box) {
            responseContainer.insertBefore(draggedItem, box.nextSibling);
        }
    });

    responseContainer.appendChild(box);
}

/* ---------------------------
   Handle new entry submission
---------------------------- */
function sendMessage() {
    const text = messageInput.value.trim();
    const date = dateInput.value;

    if (text === "") return;

    createEntry(text, date);

    messageInput.value = "";
    dateInput.value = "";
}
