let mainsection=document.getElementById("Sanketh-product-append")
let paginationButton=document.getElementById("Sanketh-pagination-buttons")

fetchandRender("1")
function fetchandRender(pageno){
    fetch(`https://63c63ce0d307b76967351ede.mockapi.io/product?page=${pageno}&limit=6`,{
    method:`GET`,
    headers:{
        'content-type':'application/json'
    },
    })
    .then((res)=>{
        // console.log(res.headers.get("X-Total-Count"));
        return res.json()
    })
    .then((data)=>{
        console.log(data);
        mainsection.innerHTML=renderData(data)
    })
    .catch(error=> console.log(error))
}


function renderData(data){
    let cardlist=data.map((item)=>{
        return getcard(item.id,item.image,item.title,item.category,item.Description,item.price)

    }).join("")
    return `<div class="Sanketh-card-list">${cardlist}</div>`
}


function getcard(id,image,name,category,Description, prize){
return `<hr>
<tr >
 <td>${id}</td>
 <td><img src="${image}" class="card__img" ></td>
 <td>${name}</td>
 <td>${category}</td>
 <td>${Description}</td>
 <td>${prize}</td>
 <td><button>Edit</button>
 <td><button>Delete</button>
</tr>
<br>`

}



// function deleteitem(id){
//     fetch(`https://63c63ce0d307b76967351ede.mockapi.io/product/${id}`,{
//     method:'DELETE',
//     body:JSON.
//     })
// }

function addbutton(){
    let btn="";
    for(let i=1;i<=6;i++){
        btn=btn+getButton(i,i)
    }
    paginationButton.innerHTML=btn
}
addbutton()

function getButton(pno,text){
    return `<button class="Sanketh-pagination-buttons" data-page-number="${pno}">${text}</button>`
}

let buttons =document.querySelectorAll(".Sanketh-pagination-buttons")

function paginationData(){
    for(let btn of buttons){
        btn.addEventListener("click",function(e){
            let pagenumber=e.target.dataset.pageNumber;
            fetchandRender(pagenumber)
        })
    }
}

