

function assertElement(node, expectedType) {
    if (!(node instanceof expectedType)) {
        throw new TypeError(`Expected ${expectedType.name}, got ${node}.`);
    }
}

function assertSVG(node) {
    if (!(
        node &&
        node instanceof SVGSVGElement &&
        node.tagName.toLowerCase() === 'svg' &&
        node.namespaceURI === 'http://www.w3.org/2000/svg')) {
            throw new TypeError(`Expected SVG Element, got ${node}.`)
        }
}

function assertClass(obj, cls) {
    if (!(obj instanceof cls)) {
        throw new TypeError(`Expected ${cls.name}, got ${obj.constructor.name}`);
    }
}

class Chapter {
    
    #questBook
    #name

    #isUnlocked
    #isCompleted
    #prerequisites

    #quests


    #titleNode

    constructor(questBook, div, name) {
        this.#questBook = questBook;
        this.#name = name;
        this.#isUnlocked = false;
        this.#isCompleted = false;
    }

    get name() {
        return this.#name;
    }

    

    set name(newName) {
        this.#name = newName;

        this.refreshDisplay();
    }

}

class Questbook {
    #svgCanvas
    #title
    #description
    #chapters
    #titleNode
    #chaptersNode
    #descriptionNode
    
    constructor(title, description, {svgNode=undefined, titleNode=undefined, chaptersNode=undefined, descriptionNode=undefined} = {}) {
        this.#title = title;
        this.#description = description;
        this.#chapters = new Set();

        this.currentChapter = 0;

        if (svgNode) {
            assertSVG(svgNode);
            this.#svgCanvas = svgNode; 
        }

        console.log(chaptersNode);

        if (titleNode) {
            assertElement(titleNode, HTMLElement);
            this.#titleNode = titleNode;
        }
        
        if (chaptersNode) {
            assertElement(chaptersNode, HTMLLIElement);
            this.#chaptersNode = chaptersNode;
        }

        if (descriptionNode) {
            assertElement(descriptionNode, HTMLElement)
            this.#descriptionNode = descriptionNode;
        }
        
        this.refreshDisplay();
    }

    get title() {
        return this.#title;
    }

    set title(newTitle) {
        this.#title = newTitle;
        this.#refreshTitle();
    }

    get description() {
        return this.#description;
    }

    set description(newDescription) {
        this.#description = newDescription;
        this.#refreshDescription();
    }

    chapterList() {
        return [...this.#chapters];
    }

    addChapter(chapter=undefined, refresh=true) {

        if (chapter) {
            assertClass(chapter, Chapter);

            chapter.questBook
            this.#chapters.add(chapter);
        } else {

        }


        if (refresh) {
            this.#refreshChapters();
        }

        return chapter;

    }

    removeChapter(chapter, refresh=true) {
        this.#chapters.delete(chapter);

        if (refresh) {
            this.#refreshChapters();
        }

    }

    #refreshChapters() {
        if (!this.#chaptersNode) {
            return;
        }
        //Called when chapters are updated
        
        while (this.#chaptersNode.firstChild) {
            this.#chaptersNode.removeChild(this.#chaptersNode.firstChild);
        }

        for (const chapter of this.#chapters) {
            let li = document.createElement("li")

            li.textContent = chapter.name;
            this.#chaptersNode.appendChild(li);

            li.addEventListener('click', () => console.log("it works!" + chapter.name))
        }
    }

    #refreshTitle() {
        if (this.#titleNode) {
            this.#titleNode.textContent = this.title
        }
    }

    #refreshDescription() {
        if (this.#descriptionNode) {
            this.#descriptionNode.textContent = this.description;
        }
    }

    refreshDisplay() {

        this.#refreshTitle();
        this.#refreshDescription();
            // Load current chapter.
        this.#refreshChapters(); 
        
    }
}


let questArea = document.getElementById("quest-area");

let questbookTitle = document.getElementById("quest-chapters").children[0].children[0];
let questbookChapters = document.getElementById("quest-chapters-list");

let x = new Questbook("My Questbook", "About art", {svgNode: questArea, titleNode: questbookTitle, chaptersNode:questbookChapters});

x.addChapter({name: "Hello World!"});

let chapter = {name: "Babygirl"};

x.addChapter(chapter);

x.addChapter({name: "Hello World 2!"});


