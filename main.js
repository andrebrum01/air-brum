const ElementContainer = document.querySelector(".container");
const ElementCount = document.querySelector(".info .count");
const ElementOptions = document.querySelector(".backout");
const ElementLocation = document.querySelector(".displayLocation .text");
const ElementChoiceLocation = document.querySelector(".containerLocation ul");

let textChoice;
let newData;
let consulta={
    city:[],
    country:[]
};

let filterChoice = []
const promisse = fetch('./Recursos/stays.json').then(
    response => response.json()
).then(
    data => {
        filtrar(data);
    }
)
Promise.resolve(promisse).then(()=>{
    textChoice = [...new Set(newData.map(item=>{return item["city"]} ))]
    console.log(textChoice)
    for(i in textChoice){
        ElementChoiceLocation.innerHTML +=`
            <input onchange="choiceLocation(this)"  type="checkbox"  value="${textChoice[i]}" id="option${i}">
                <label for="option${i}">${textChoice[i]}</label>
            </input>
        `;
    }
     

})

function addEntidade(value) {
    ElementContainer.innerHTML += `
    <div class="content">
        <img src="${value["photo"]} loading='lazy' alt='${value["title"]}'">
        <div class="description">
            <div>
                ${value["superHost"]?"<div class='super'>SUPER HOST</div>":""}
                <div class="type">${value["type"]}</div>
            </div>
            <div class="rate"><img src="./Recursos/star.png" alt=""/> ${value["rating"]}</div>
        </div>
        <h1 class="title">${value["title"]}</h1>
    </div>
    `
}

function openOption(e){
    ElementOptions.style.display = "block"; 
    ElementOptions.addEventListener("click",(e)=>{
        if(!document.querySelector(".backout .display").contains(e.target))
            ElementOptions.style.display = "none"; 
    })
}

function choiceLocation(e){
    let arrayChecked = Array.from(e.parentNode.children).map((elem,pos)=>{
        if(elem.checked) return  pos/2;
    }).filter((elem)=> {return elem!= undefined})
    console.log(arrayChecked)
    filterChoice = []
    if(arrayChecked.length ==0){
        filterChoice = []
        ElementLocation.innerHTML = "Add Location"
    }
    else for(let i =0;i<arrayChecked.length;i++){
        i==0?ElementLocation.innerHTML = textChoice[arrayChecked[i]]: ElementLocation.innerHTML += ", "+textChoice[arrayChecked[i]];
        filterChoice.push(textChoice[arrayChecked[i]]);
    } 
    filtrar(newData);
}

function filtrar(data){
    console.log(data)
    console.log(filterChoice)
    newData = data.filter((item)=>{
        let contain=false;
        let op=["city","country","beds"]
        for(let j in op){
            if(filterChoice.includes(item[op[j]]))
                contain=true ;
        }
        if(filterChoice.length>0)
            return contain;
        else
            return true;

    });
    console.log(newData)
    ElementCount.innerHTML = newData.length >1? newData.length+" stays":newData.length+" stay";
    ElementContainer.innerHTML=""
    for (let pos in newData) {
        addEntidade(newData[pos])
    }
    newData=data;
}