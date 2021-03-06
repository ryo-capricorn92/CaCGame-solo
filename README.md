# Create-a-Canine #

## The Quick Dog Designer ##
  [create-a-canine.herokuapp.com](https://create-a-canine.herokuapp.com/ "Create-a-Canine")
  Create-a-Canine is a fast, light-weight online dog designer.

## For all the writer's out there ##
  CaC speeds up the process of coming up with designs for canine characters in novels, cartoons, and games!

## Summary ##
  CaC is a light-weight tool made for the creative folks out there that may not want to spend as much time on designing characters (or for those who aren't so great at it). This online tool will generate designs for you, allowing you to choose from a large collection of possible choices and leaving you with more time to work on the meat of the work. Don't spend another hour struggling to come up with a new design for your canine character. Let Create-a-Canine do it for you!

  ---

## Goals ##
- [X] create token backend (does nothing to start with)
- [X] build in AngularJS
- [X] create a button to generate a random dog
  - [X] choose between 0 and 3 (5?) patterns to be used
  - [X] patterns should be layered by largest on bottom, smallest on top
  - [X] each pattern should get it's own random color
  - [X] create a sprite sheet with different patterns
  - [X] use `filter: hue-rotate` and random number to get random colors
  - [X] use `filter: brightness` and `filter: saturation` to give the colors full spectrum

#### Possible Goals ####
- [X] add save button
- [X] add a list of saved dogs
- [X] clicking on dog's name allows editing
- [X] add view button to list
- [X] add delete button to remove dog from list
- [X] use localStorage to keep data persistent
  - [X] create save list button
  - [X] create load list button
  - [X] create clear list button

- [X] add more designs

#### Far out possibilites ####
- [ ] add ability to toggle layers on saved dogs
- [X] add authentication
  - [X] show name when logged in
  - [X] save your list to a personal key in local storage
- [ ] change local storage to database
- [ ] make colors follow patterns to come with nice schemes
