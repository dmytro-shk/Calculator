//Get the number of occurrences in a string
String.prototype.count = function (inputLog) {
  return this.length - this.replace(new RegExp(inputLog, "g"), "").length;
};

//Play sound effects 
function playSFX(url) {
  if (!firstPlay) {
    new Audio(url).play();
  } else {
    firstPlay = true;
  }
}
