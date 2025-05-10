let firstQuest = new Quest("Hello World", 0, 100, "", true);

let secondQuest = new Quest("1st Child", 150, 150);

let thirdQuest = new Quest("2nd Child", 150, 50);

firstQuest.addDependent(secondQuest);
firstQuest.addDependent(thirdQuest);

console.assert(secondQuest.prerequisiteList(), "Hello World"); // Hello World
console.assert(thirdQuest.prerequisiteList(), "Hello World"); // Hello World
console.assert(firstQuest.dependentsList(), "1st Child, 2nd Child"); // First Child, Second Child

let fourthQuest = new Quest("2.2 Child", 250, 50);

thirdQuest.addDependent(fourthQuest);

let finalQuest = new Quest("Last", 350, 100);

finalQuest.addPrerequisite(secondQuest);
finalQuest.addPrerequisite(fourthQuest);

firstQuest.setImportant();

finalQuest.setRequired();

