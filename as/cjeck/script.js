const button = document.querySelectorAll("button");
let input = document.querySelector('input');

function clickEvent(char){
    let lastchar = input.value.slice(-1); //input칸 마지막 글자
    operators = ["/", "x", "-", "+", "."];
    //처음 입력이 연산자인 경우
    if (input.value.length === 0 && (operators.includes(char) || char == "%")) {
        return; 
    }
     //연산자 연속으로 입력한 경우
    else if (operators.includes(lastchar) && operators.includes(char)) {
        return;
    }
    //15글자까지만 허용
    else if (input.value.length > 14){
        input.value = "Error";
    }
    else {
        input.value = input.value + char;
    }
}
function clearinput(){
    input.value = "";
}
function braces(){
    let openCount = input.value.split('(').length - 1;
    let closeCount = input.value.split(')').length -1;
     if (openCount > closeCount) {
        input.value = input.value + ')';
    } else {
        input.value = input.value + '(';
    }
}
function calculate(){
    let expression = input.value;
    expression = expression.replace(/x/g, "*");
    expression = expression.replace(/%/g, "/100");

    let result = eval(expression);
    //소숫점은 5번째자리까지 반올림
    if (!Number.isInteger(result)){
        result = result.toFixed(5);
    }
    input.value = result;
}