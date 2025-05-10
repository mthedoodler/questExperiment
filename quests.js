const questArea = document.getElementById("questArea");
const questAreaContainer = document.getElementById("questAreaContainer");

class Quest{

    static allQuests = [];

    #node;

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

        this.#node.style.left = `calc(50vw + ${x}px)`;
        this.#node.style.top = `calc(50vh + ${y}px)`;

        questArea.appendChild(this.#node);

        this.updateDisplay();

    }

    addDependent(anotherQuest) {
        if (!(anotherQuest instanceof Quest)) {
            throw new Error("quest must be a Quest.");
        }

        this.children.add(anotherQuest);
        anotherQuest.parents.add(this);
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
    }
    
    complete() {
        this.complete = true;
        for (const c of this.children) {
            c.checkPrerequisitesCompletedAndUnlock();
        }
    }

    updateDisplay() {
        
        if (this.unlocked && this.completed) {
            this.#node.style.borderColor = "green";
            return;
        }
        
        if (this.unlocked && !this.completed) {
            this.#node.style.borderColor = "aqua";
            return;
        }

        if (!this.unlocked) {
            this.#node.style.borderColor = "red";
        }
    }
    
}


let elementX, elementY;
let currentX, currentY;


function startDragging(e) {
    e.preventDefault();
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

    console.log(`${elementX + offsetX}px`)
    questArea.style.left = `${elementX + offsetX}px`;
    questArea.style.top = `${elementY + offsetY}px`;
}

function stopDragging(e) {
    questAreaContainer.removeEventListener('mousemove', dragElement);
}

questAreaContainer.addEventListener('mousedown', startDragging);
questAreaContainer.addEventListener('mouseup', stopDragging);
