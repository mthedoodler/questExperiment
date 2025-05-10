const questArea = document.getElementById("questArea");
const questAreaContainer = document.getElementById("questAreaContainer");

const questInfoBox = document.getElementById("questInfoBox");

const questInfoTitle = document.getElementById("questTitle");
const questInfoDescription = document.getElementById("questDescription");


const completeQuestButton = document.getElementById("questInfoCompleteButton");

const closeQuestInfoButton = document.getElementById("questInfoCloseButton");

let shouldDrag = true;

class Quest{

    static allQuests = [];

    #node;
    #connectionNodes;

    constructor(name, x, y, description = "", unlocked = false) {
        this.name = name;
        this.unlocked = unlocked;
        this.position = [x, y];
        this.description = description;
        this.parents = new Set([]);
        this.children = new Set([]);

        Quest.allQuests.push(this);
        
        this.#node = document.createElement("div");
        this.#node.className = "quest";

        this.#node.innerHTML = `<p>${name[0]}</p>`

        this.#connectionNodes = [];

        questArea.appendChild(this.#node);

        this.#node.addEventListener("click", (e) => showQuestInfo(this));//this.complete());

        this.updateDisplay();
    }

    setImportant() {
        this.#node.className = "quest questBig";
    }

    setNormal() {
        this.#node.className = "quest"
    }

    setRequired() {
        this.#node.className = "quest questSquare"
    }

    addDependent(anotherQuest) {
        if (!(anotherQuest instanceof Quest)) {
            throw new Error("quest must be a Quest.");
        }

        this.children.add(anotherQuest);
        anotherQuest.parents.add(this);
        this.updateDisplay();
    }

    dependentsList() {
        return [...this.children].map((e) => e.name).join(", ");
    }

    prerequisiteList() {
        return [...this.parents].map((e) => e.name).join(", ");
    }

    addPrerequisite(anotherQuest) {
        if (!(anotherQuest instanceof Quest)) {
            throw new Error("quest must be a Quest.");
        }

        this.parents.add(anotherQuest);
        anotherQuest.children.add(this);
        anotherQuest.updateDisplay();
    }

    setPosition(x, y) {
        this.position = (x, y);
    }

    checkPrerequisitesCompletedAndUnlock() {
        for (const p of this.parents) {
            if (!(p.completed)) {
                return;
            }
        }
        
        this.unlocked = true;
        this.updateDisplay();
    }
    
    complete() {
        if (this.completed || !this.unlocked) {return;}

        this.completed = true;
        for (const c of this.children) {
            c.checkPrerequisitesCompletedAndUnlock();
        }

        this.updateDisplay();
    }

    #createConnectionLine(otherQuest) {
        let diffX = otherQuest.position[0] - this.position[0];
        let diffY = otherQuest.position[1] - this.position[1];
        
        let line = document.createElement("div");
        line.className = "connectionLine";

        questArea.appendChild(line);
        this.#connectionNodes.push(line);

        let distance = Math.round(Math.sqrt(diffX*diffX, diffY*diffY));
        let angle = Math.atan2(diffY, diffX);
        
        line.style.width = `${distance}px`;
        line.style.left = `calc(50vw + ${this.position[0]}px)`;
        line.style.top = `calc(50vh + ${this.position[1]}px)`;

        line.style.transform = `rotate(${angle}rad)`;

        if (this.unlocked) {
            line.style.backgroundColor = (this.completed) ? "lime": "blue";
        } else {
            line.style.backgroundColor = "maroon";
        }

    }

    updateDisplay() {
        
        //Update border color
        this.#node.style.left = `calc(50vw + ${this.position[0]}px)`;
        this.#node.style.top = `calc(50vh + ${this.position[1]}px)`;

        if (this.unlocked) {
            if (this.completed) {
                this.#node.style.borderColor = "lime";
            } else {
                this.#node.style.borderColor = "aqua"
            }
        } else {
             this.#node.style.borderColor = "red";
        }

        //Update connection lines
        for (const line of this.#connectionNodes) {
            line.remove()
        }
        
        this.#connectionNodes.length = 0;

        for (const quest of this.children.values()) {
            this.#createConnectionLine(quest);
        }

    }
    
}

let elementX, elementY;
let currentX, currentY;

function startDragging(e) {
    e.preventDefault();

    if (!shouldDrag) {
        return;
    }
    currentX = e.clientX;
    currentY = e.clientY;

    elementX = Number(questArea.style.left.slice(0, -2));
    elementY = Number(questArea.style.top.slice(0, -2));

    questAreaContainer.addEventListener("mousemove", dragElement);
}

function dragElement(e) {
    e.preventDefault();

    let offsetX = e.clientX - currentX;
    let offsetY = e.clientY - currentY;

    questArea.style.left = `${elementX + offsetX}px`;
    questArea.style.top = `${elementY + offsetY}px`;
}

function stopDragging(e) {
    questAreaContainer.removeEventListener('mousemove', dragElement);
}

function showQuestInfo(quest) {
    stopDragging();
    shouldDrag = false;

    questInfoTitle.textContent = quest.name || "Untitled Quest";
    questInfoDescription.textContent = quest.description || "No quest description.";

    completeQuestButton.disabled = (!quest.unlocked || quest.completed);
    completeQuestButton.style.backgroundColor = quest.completed ? "lime" : "";
    
    completeQuestButton.addEventListener("click", () => buttonCompleteQuest(quest), { once: true });
    questInfoBox.style.display = "block";
}

function buttonCompleteQuest(quest) {
    quest.complete();
    completeQuestButton.style.backgroundColor = "lime";
}

function hideQuestInfo() {
    shouldDrag = true;

    questInfoBox.style.display = "none";

    questInfoTitle.textContent = ""
    questInfoDescription.textContent = "";
    completeQuestButton.style.backgroundColor = "";
}

closeQuestInfoButton.addEventListener("click", hideQuestInfo);

questAreaContainer.addEventListener('mousedown', startDragging);
questAreaContainer.addEventListener('mouseup', stopDragging);


