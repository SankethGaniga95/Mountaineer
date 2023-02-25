let mainsection=document.getElementById("Sanketh-order-append")
let paginationButton=document.getElementById("Sanketh-orderpagination-part")



fetchandRender("1")
function fetchandRender(pageno){
    fetch(`https://63ca7e2e4f53a00420242ac5.mockapi.io/User?page=${pageno}&limit=6`,{
    method:`GET`,
    headers:{
        'content-type':'application/json'
    },
    })
    .then((res)=>{
        if(res.ok){
         return res.json()
        }
        // console.log(res.headers.get("X-Total-Count"));
        
    })
    .then((data)=>{
        console.log(data);
        mainsection.innerHTML=renderData(data)
        



        let deleteButton=document.querySelectorAll(".Sanketh-delete-link")
        console.log(deleteButton)
        for(let deletelink of deleteButton){
            deletelink.addEventListener("click",(e)=>{
                e.preventDefault()
                let deleteID=e.target.id
                console.log(deleteID)
                alert("Product has been deleted!")
                deleteItem(deleteID)
            })
        }

    })
    .catch(error=> console.log(error))
}


function renderData(data){
    let cardlist=data.map((item)=>{
    return getcard(item.id,item.Cname,item.Caddress,item.Czip,item.Cphone,item.image,item.title,item.price,item.status)

    }).join("")
    return `<div class="Sanketh-card-list">${cardlist}</div>`;
   
}



function getcard(id,CustomerName,CustomerAddress,Pincode,PhoneNo,image,ProductName,price,status){
    return `<hr>
    <tr >
     <td>${id}</td>
     <td>${CustomerName}</td>
     <td>${CustomerAddress}</td>
     <td>${Pincode}</td>
     <td>${PhoneNo}</td>
     <td><img src="${image}" class="order_card__img" ></td>
     <td>${ProductName}</td>
     <td>${price}</td>
     <td>${status}</td>
     <td><button class="Sanketh-delivered-link" id=${id} >Delivered</button>
    </tr>
    <br>`
    
    }