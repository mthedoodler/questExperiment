let firstQuest = new Quest("Hello World", 0, 100, "", true);

firstQuest.description = "This is the first quest!\nPretty neat huh? :)";

let secondQuest = new Quest("1st Child", 150, 150);
secondQuest.description = "This is the second quest, unlocked when you finish the first one!";

let thirdQuest = new Quest("2nd Child", 150, 50);
thirdQuest.description = "This is the second child of the first quest.\n\nIf you complete this one, the next quest will unlock on a different branch.";

firstQuest.addDependent(secondQuest);
firstQuest.addDependent(thirdQuest);

console.assert(secondQuest.prerequisiteList(), "Hello World"); // Hello World
console.assert(thirdQuest.prerequisiteList(), "Hello World"); // Hello World
console.assert(firstQuest.dependentsList(), "1st Child, 2nd Child"); // First Child, Second Child

let fourthQuest = new Quest("2.2 Child", 250, 50);

thirdQuest.addDependent(fourthQuest);

let finalQuest = new Quest("Last", 350, 100);
finalQuest.description = "This quest should only be able to be completed with BOTH previous tests have been completed. Try it!";


finalQuest.addPrerequisite(secondQuest);
finalQuest.addPrerequisite(fourthQuest);

firstQuest.setImportant();

finalQuest.setRequired();

q = new Quest("Test", 400, 400, "Hello!", false);
finalQuest.addDependent(q);
