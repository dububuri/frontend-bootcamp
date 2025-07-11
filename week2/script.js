// querySelector
const btn = document.querySelector("button");
function click() {
  console.log("clicked")
}
btn.onclick = click;


let func = function(arg1, arg2, ...argN) {
   return expression;
 };
// arrow function
 let func = (arg1, arg2, ...argN) => expression


let obj = {
   cat : "meow",
   dog : "woof"
};
// Dot notation
console.log(obj.cat);
console.log(obj.dog);


let obj = {
   cat : "meow",
   dog : "woof"
};
// Bracket Notation
let cat = "cat";
let dog = "dog";
console.log(obj[cat]);
console.log(obj[dog]);