// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9'
];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

// Function to prompt user for password options
let getPasswordOptions = function(output, length, special, uppercase, lowercase, numbers, click) {
// length requests an input from the user between 10 and 64. If the number is outside this range they are informed and asked to refresh the page and try again.
  length = prompt(`Please enter your desired password length between 10-64 characters:`);
// Alert to tell the user if the entered a number outside the stated range.
  if (length >= 10 && length <= 64) {} else {
    alert(`The number you entered is not between 10 and 64. Please refresh the page and try again.`);
    return;
  };
// special asks the user to confirm if they want to include special characters in the password. This returns a boolean value.
  special = confirm(`Do you want special characters included in your password?
e.g. @ % +

Click "OK" to include them.
Click "Cancel" to exclude them.`);
// uppercase asks the user to confirm if they want to include uppercase characters in the password. This returns a boolean value.
  uppercase = confirm(`Do you want uppercase characters included in your password?
e.g. A B C

Click "OK" to include them.
Click "Cancel" to exclude them.`);
// lowercase asks the user to confirm if they want to include lowercase characters in the password. This returns a boolean value.
  lowercase = confirm(`Do you want lowercase characters included in your password?
e.g. a b c

Click "OK" to include them.
Click "Cancel" to exclude them.`);
// numbers asks the user to confirm if they want to include numbers characters in the password. This returns a boolean value.
  numbers = confirm(`Do you want numbers included in your password?
e.g. 1 2 3

Click "OK" to include them.
Click "Cancel" to exclude them.`);
// Alert to tell the user if they did not click "OK" for any of the character types.
  if (special === false && uppercase === false && lowercase === false && numbers === false) {
    alert(`You did not choose any character types. Please refresh the page and try again.`);
    return;
  };
// Alert to show the users the inputs they have chosen.
  click = alert(`You chose the following options:

Length = ${length} characters.
Special characters = ${special}.
Uppercase characters = ${uppercase}.
Lowercase characters = ${lowercase}.
Numbers = ${numbers}.

Please click "OK" and then click on "Generate Password".`)
// output stores all the above user inputs in an array.
output = [length, special, uppercase, lowercase, numbers]
// the output array is returned by the getPasswordOptions function.
return output;
};

// Stores the output array from the getPasswordOptions functions in a new global array.
let userOptions = getPasswordOptions();

// Defined array to store password length.
let passwordLength = [];

// for loop adds the number of array elements as input by the user in the getPasswordOptions function above.
for (var i = 0; i < userOptions[0]; i++) {
  passwordLength.push(undefined);
};

// for loop replaces all true values in the userOptions array with the character type name.
for (var j = 1; j < userOptions.length; j++) {
  if (userOptions[j] === true && j === 1) {
    userOptions[j] = "special";
  } else if (userOptions[j] === true && j === 2) {
    userOptions[j] = "upper";
  } else if (userOptions[j] === true && j === 3) {
    userOptions[j] = "lower";
  } else if (userOptions[j] === true && j === 4) {
    userOptions[j] = "numeric";
  };
};

// Defined a new array to store only the elements from the userOptions array that are non-Boolean values.
let trueOptions = userOptions.filter(Boolean);
// Remove the first element of trueOptions array, which is the password length user input value. This is no longer needed.
trueOptions.shift();

// Function for getting a random element from an array
let getRandom = function(min, max) {
  return Math.floor(Math.random() * (max -min) + min);
};

// Function to generate password with user input.
let generatePassword = function(password) {
// for loop replaces each element of the passwordLength array with a random element from the trueOptions array.
  for (var k = 0; k < passwordLength.length; k++) {
    passwordLength[k] = trueOptions[getRandom(0, trueOptions.length)];
  };
// for loop replaces all elements in the passwordLength array with a random element from the corresponding character array.
  for (l = 0; l < passwordLength.length; l++) {
    if (passwordLength[l] === "special") {
      passwordLength[l] = specialCharacters[getRandom(0, specialCharacters.length)]
    } else if (passwordLength[l] === "upper") {
      passwordLength[l] = upperCasedCharacters[getRandom(0, upperCasedCharacters.length)]
    } else if (passwordLength[l] === "lower") {
      passwordLength[l] = lowerCasedCharacters[getRandom(0, lowerCasedCharacters.length)]
    } else if (passwordLength[l] === "numeric") {
      passwordLength[l] =numericCharacters[getRandom(0,numericCharacters.length)]
    };
  };
// password parameter is set to equal the passwordLength array without the commas separating each element.
  password = passwordLength.join("");
return password;
};

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);