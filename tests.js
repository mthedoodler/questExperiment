 let firstQuest = new Quest("Hello World", 0, 100, "", true);

let secondQuest = new Quest("First Child", 150, 150);

let thirdQuest = new Quest("Second Child", 150, 50);

firstQuest.addDependent(secondQuest);
firstQuest.addDependent(thirdQuest);

console.assert(secondQuest.prerequisiteList(), "Hello World"); // Hello World
console.assert(thirdQuest.prerequisiteList(), "Hello World"); // Hello World
console.assert(firstQuest.dependentsList(), "First Child, Second Child"); // First Child, Second Child




