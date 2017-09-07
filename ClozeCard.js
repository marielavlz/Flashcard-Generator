// require inquirer for getting user input at command line
var inquirer = require('inquirer');
// require fs
var fs = require('fs');

// Requires BasicCard constructor exported from BasicCard.js.
var BasicCard = require("./BasicCard.js");

// Constructor function for creating ClozeCard objects.
var ClozeCard = function(text, cloze) {

	if (this instanceof ClozeCard) {
		this.fullText = text;
		this.cloze = cloze;

		// Creates partial text for Cloze flashcard.
		this.partial = function() {
			if (this.fullText.includes(this.cloze)) {
				return this.fullText.replace(this.cloze, '...');
			} else {
				// Broken cloze message returned.
				var brokenClozeMessage = "Oops! The full text: '" + this.fullText + "' doesn't contain the cloze: '" + this.cloze + "'.";
				return brokenClozeMessage;
			}
		};
	// If new operator missing, creates new instance of object correctly.
	} else {
		return new ClozeCard(text, cloze);
	}
};

// Test BasicCard constructor.
var firstPresident = new BasicCard("Who was the first president of the US?", "George Washington");
console.log(firstPresident.front);
console.log(firstPresident.back);

// Test ClozeCard constructor that works.
var firstPresidentCloze = new ClozeCard("George Washington was the first president of the US.", "George Washington");
console.log(firstPresidentCloze.fullText);
console.log(firstPresidentCloze.cloze);
console.log(firstPresidentCloze.partial());

// Test ClozeCard constructor when text doesn't contain cloze.
var currentPresidentCloze = new ClozeCard("Barack Obama is the first black president of the U.S.", "Barack Obama");
console.log(currentPresidentCloze.fullText);
console.log(currentPresidentCloze.cloze);
console.log(currentPresidentCloze.partial());

// Test constructor is scope-safe.
var missingNewCloze = ClozeCard("James Joyce wrote Ulysses", "James Joyce");
console.log(missingNewCloze.fullText);
console.log(missingNewCloze.cloze);
console.log(missingNewCloze.partial());

// Export ClozeCard constructor
module.exports = ClozeCard;