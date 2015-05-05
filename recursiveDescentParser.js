// recursiveDescentParser.js
//
// RECURSIVE DESCENT PARSER
// ========================

// DECLARE VARIABLES
// =================
var input;
var initial;
var errorCount;

// DECLARE FUNCTIONS
// =================

// Main function for grammar organization
function main() {

  initial = 0;
  errorCount = 0;
  input = document.getElementById("input").value;

  if (input[input.length - 1] === "$") {
    scanner();
  } else {
    confirm("Invalid string, Missing $ ");
  }
}

// Classifies Digits
function digit() {
  if ((token() === '0') || (token() === '1') || (token() === '2') || (token() === '3')) {
    validater(token());
  } else {
    errorLint();
  }
}

// Non Terminal Factors
function factor() {
  if (token() === '(') {
    validater(token());
    expression();
    validater(')');
  } else if ((token() === '0') || (token() === '1') || (token() === '2') || (token() === '3')) {
      digit();
  } else {
      errorLint();
  }
}

// Non Terminal Terms
function term() {
  factor();
  while ((token() === '*') || (token() === '/')) {
    if (token() === '*') {
      validater(token());
      factor();
    } else if (token() === '/') {
        validater(token());
        factor();
    } else {
      errorLint();
    }
  }
}

// Generates Token for comparison
function token() {
  return (input[initial]);
}

// Increments the length
function incrementer() {
  if (initial < (input.length - 1)) {
    initial++;
  }
}

// function to validate token
function validater(t) {
  if (t === token()) {
    incrementer();
  } else {
      errorLint();
  }
}

// Terminal Expression checker
function expression() {
  term();
  while ((token() === '+') || (token() === '-')) {
    if (token() === '+') {
      validater(token());
      term();
    } else if (token() === '-') {
        validater(token());
        term();
    } else {
        errorLint();
    }
  }
}

// function to start lexical scanning
function scanner() {
  expression();
  validater('$');
  if (errorCount === 0) {
    confirm("This is a Legal Expression");
  } else {
      confirm("Error found");
  }
}

// TESTING
// =======

// Linting for Errors
function errorLint() {
  confirm("Error found at position: " + initial);
  errorCount = 1;
  incrementer();
}
