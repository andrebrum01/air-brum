const ElementContainer = document.querySelector(".container");
let data;

let filter = []
fetch('./Recursos/stays.json').then(
    response => response.json()
).then(
    data => {
        let newData = data.filter((item)=>{
            let contain=false;
            let op=["city","country","beds"]
            for(let j in op){
                if(filter.includes(item[op[j]]))
                    contain=true ;
            }
            if(filter.length>0)
                return contain;
            else
                return true;

        });
        for (let pos in newData) {
            addEntidade(newData[pos])
        }

    }
)



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
    const ElementOptions = document.querySelector(".backout");
    ElementOptions.style.display = "block"; 
    ElementOptions.addEventListener("click",(e)=>{
        if(!document.querySelector(".backout .display").contains(e.target))
            ElementOptions.style.display = "none"; 
    })
}