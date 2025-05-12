# Quest Experiment in Javascript on the Browser

## Todo:

- [ ] Make frontend accessible


Drawable should have:
    - A refrence to the thing to draw on
    - A position.

should be able to:
    - A method to draw itself.

Quest should have:
    - A name/title
    - A description
    - An icon
    - A list of actions you must do to compelte the quest.(tasks?)
    - The quests required to unlock it(parents).
    - Whether or not you need to compelte _all_ or _any_ of the parents to unlock this quest.
    - The chapter it belongs to
    - The quests that require this one to unlock it(dependents).
    - is unlocked
    - is compelted
    - A shape(the shape of the quest)
    - A size(big, normal, small)
    - Whether or not the quest should draw its outgoing lines.

Quest should do:
    - Be able to draw itself onto the screen
    - Be able to draw lines connecting itself to its dependents
    - Update itself whenver its state changes.


    - Be unlocked and automatically update display.
    - Be completed(only if unlocked) and automatically update display.
    - Change position and automatically update its display
    - Change shape, size and whether it draws outgoing lines and automatically update display.

    - Have semantic information associated showing its information.
    
    - Add a prerequisite quest
    - Delete a prerequisite quest
    - Add a dependent quest
    - Delete a dependent quest

    - When clicked, pass itself to a method that opens a dialog box for the user to see information about the quest, and(if available) complete tasks and complete it.

Task should have:
    - A description.
    - An optional icon.

A Questbook should have:
    - The area with which to draw things in.
    - A name

    - A list of chapters.
    - A list of all quests associated with the questbook.

Chapter should have:
    - a name
    - is unlocked
    - is completed
    - The quest or quests required to unlock it.
    - Whether or not you need to complete _all_ the quests or simply any of them to unlock this chapter.

    - A set of all quests associated with that chapter.
    - A set of all other drawables that can be displayed as well.

Image should have:
    - drawable
    - a refrence to the image path.
