
        let expression = "";
let value = 0;

let result = document.querySelector(".screen");

document.querySelectorAll(".btn").forEach(x => {
    x.addEventListener("click", () => {
        expression += x.innerText;
        result.innerText = expression;
        console.log(expression)
    })
})

document.getElementById("equal").addEventListener("click", () => {

    try {
        
        value = eval(expression);
        expression = `${value}`;
        if(expression ==="Infinity")
    {
        console.log(expression)
        result.innerText = expression;
        expression="";
    }
    else{
         console.log(expression)
        result.innerText = expression;
    }
        
    }

    catch {
        result.innerText = "Error";
        expression = "";
    }

});


document.getElementById("clearAll").addEventListener("click", () => {
    expression = "";
    console.log(expression);
    result.innerText = expression;
})

document.getElementById("clear").addEventListener("click", () => {

    let a = expression.length
    a -= 1;
    expression = expression.slice(0, a)
    console.log(expression)
    result.innerText = expression;

});