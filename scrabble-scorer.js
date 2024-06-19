// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};


function oldScrabbleScorer(word) {
   word = word.toString().toUpperCase();
   let letterPoints = "";
   let totalCount = 0;

   for (let i = 0; i < word.length; i++) {

      for (const pointValue in oldPointStructure) {

         if (oldPointStructure[pointValue].includes(word[i])) {
            letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
            totalCount += Number(pointValue);
         }

      }

   }
   console.log(letterPoints);
   return totalCount;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let word = "";
   console.log("Let's play some scrabble!");
   word = input.question('Enter a word to score :');
   while (!isNaN(word)) {
      word = input.question('Enter a word to score :');
   }
   return word;
}
let newPointStructure = transform(oldPointStructure);

function simpleScorer(word) {
   word = word.toString().toUpperCase();
   /*let totalCount = 0;
   if (word === '') {
      return 0;
   }
   for (let i = 0; i < word.length; i++) {
      totalCount += 1;
   }
   return totalCount;
   */
  return word.length;

}
function vowelBonusScorer(word) {
   let vowels = ['A', 'E', 'I', 'O', 'U'];
   word = word.toString().toUpperCase();
   let totalCount = 0;
   if (word === '') {
      return 0;
   }
   for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
         totalCount += 3;
      } else {
         totalCount += 1;
      }
   }
   return totalCount;

}

function scrabbleScorer(word) {
   word = word.toLowerCase();
   let totalCount = 0;
   if (word === '') {
      return 0;
   }
   for (keys in newPointStructure) {
      for (let i = 0; i < word.length; i++) {
         if (keys.includes(word[i])) {
            totalCount += Number(newPointStructure[word[i]]);
         }
      }
   }
   return totalCount;
}

const simpleScore = {
   name: "Simple Score",
   Description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
};
const bonusVowel = {
   name: "Bonus Vowels",
   Description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
};
const scrabble = {
   name: "Scrabble",
   Description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer
};

const scoringAlgorithms = [simpleScore, bonusVowel, scrabble];

function scorerPrompt(word) {
   console.log('Which scoring algorithm would you like to use?');
   for (let i = 0; i < scoringAlgorithms.length; i++) {
      console.log(`${i}-${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].Description}`);
   }

   let optionNumber = input.question('Enter 0, 1, or 2: ');
   while (isNaN(optionNumber) || optionNumber > 2 || optionNumber < 0) {
      optionNumber = input.question('Enter 0, 1, or 2: ');
   }
   console.log("algorithm name: ", scoringAlgorithms[optionNumber].name);
   console.log("scoringFunction result: ", scoringAlgorithms[optionNumber].scorerFunction(word));
   let option = input.question("Do you want to score for another word(Y/N):");
   if (option.toLowerCase() === 'y') {
      initialPrompt();
      scorerPrompt(word);
   } else {
      console.log("Thank you for PLAYING....");
   }
}

function transform(oldPointStructure) {
   let newPointStructure = {};
   for (item in oldPointStructure) {
      for (let i = 0; i < oldPointStructure[item].length; i++) {
         newPointStructure[oldPointStructure[item][i].toLowerCase()] = Number(item);
      }
   }
   return newPointStructure;
};

function runProgram() {
   let word = initialPrompt();
   scorerPrompt(word);

}


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};
