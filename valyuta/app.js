let button = document.querySelectorAll('.first-box button');
let secondButton = document.querySelectorAll('.second-box button');
let p = document.querySelector('.in p');
let p2 = document.querySelector('.out p');
let x = "1 RUB",y = "1 RUB",any;
p.innerHTML = x+" = "+y;
let base='RUB',symbols='RUB';

let input = document.querySelector('.in input')
let output = document.querySelector('.out input')

button.forEach((item)=>{
    item.addEventListener('click',(e)=>{
        x = "1 "+ e.target.innerText;
        base = e.target.innerText;
        myFunction();
        if(e.target){
            e.target.class = 'active';
            let notButton = document.querySelectorAll('.first-box button:not(button.active)');
            notButton.forEach((element)=>{
                element.style.background = 'white';
                element.style.color = '#E5E5E5';
            })
            e.target.style.background = '#833AE0';
            e.target.style.color = 'white';
        }
    })
})

secondButton.forEach((element)=>{
    element.addEventListener('click',(a)=>{
        symbols = a.target.innerText;
        myFunction();
        if(a.target){
            a.target.class = 'active';
            let notButton = document.querySelectorAll('.second-box button:not(button.active)');
            notButton.forEach((element)=>{
                element.style.background = 'white';
                element.style.color = '#E5E5E5';
            })
            a.target.style.background = '#833AE0';
            a.target.style.color = 'white';
        }
    })
})

async function myFunction(){
    let q = await fetch(`https://api.exchangerate.host/latest?base=${base}&symbols=${symbols}`)
    let d = await q.json();
    any = d.rates[symbols];
    input.oninput = function(){
        output.value = (any * input.value).toFixed(2);
    }
    output.oninput = function(){
        input.value = (1/any * output.value).toFixed(2);
    }
    if(input.value != 0){
        output.value = (any * input.value).toFixed(2);
    }
    y = any.toFixed(2) + " " + symbols;
    p.innerHTML = x+" = "+y;
    p2.innerHTML = "1 "+ symbols +" = "+(1/any).toFixed(2) + " " + base;
}  

myFunction();