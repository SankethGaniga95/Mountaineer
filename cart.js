// fetching id's of product from LS and get data from API

let Products_Cart=JSON.parse(localStorage.getItem("Pkey")) || [];

let Shoes_Cart=JSON.parse(localStorage.getItem("Skey")) || [];


let Cart_Amount=0;

let Quantity_Object={};

if(Products_Cart.length){
    for(let i of Products_Cart){
        Quantity_Object[i]=1;
    }
    console.log(Quantity_Object)
}

let MainCartSection=document.getElementById("Nitesh_Cart_items");
let Total_Amount=document.querySelector("#Nitesh_Order_Summary > div > h3 > span");
let SubTotal=document.querySelector("#Nitesh_Order_Summary > div > p:nth-child(2) > span");



let ProductData=[];

let ShoesData=[];

fetchAndRenderCart();

function fetchAndRenderCart(){

    if(Products_Cart.length!==0){
        
        for(let id of Products_Cart){
            fetch(`https://63c63ce0d307b76967351ede.mockapi.io/product/${id}`)
                .then((res)=>{
                    return res.json()
                })
                .then((data)=>{
                    ProductData.push(data)
                    RenderCartItem(ProductData,data.price)
                })
        
        }
    }


    if(Shoes_Cart.length!==0){
        
        for(let id of Shoes_Cart){
            fetch(`https://63c63ce0d307b76967351ede.mockapi.io/shoes/${id}`)
                .then((res)=>{
                    return res.json()
                })
                .then((data)=>{
                    ShoesData.push(data)
                    RenderCartItem(ShoesData,data.price)
                })
        
        }
    }

}


function RenderCartItem(data,amt){

    let Cards=data.map((item)=>{
        return getCards(item.image,item.title,item.category,item.price,item.description,item.id)
    }).join("")

    MainCartSection.innerHTML=Cards;

    Cart_Amount+=amt;
    SubTotal.textContent=Cart_Amount+" Rs";
    Total_Amount.textContent=Cart_Amount+" Rs";

    let Qunatity_Select=document.querySelectorAll("#Nitesh_Cart_items > div > select");

    let Remove_button=document.querySelectorAll("button");

    for(let i of Qunatity_Select){
        i.addEventListener("change",function (e){
            e.preventDefault();
            
            console.log(e.target.value,e.target.id);

            Quantity_Object[e.target.id]=+e.target.value;
            //console.log(Quantity_Object)

            CalculateCartPrice();

        })
    }

    for(let i of Remove_button){

        i.addEventListener("click",function (e){
            e.preventDefault();
            Products_Cart=Products_Cart.filter((item)=>{

                if(item!==e.target.id){
                    return item;
                   
                }
                
            })

            Shoes_Cart=Shoes_Cart.filter((item)=>{

                if(item!==e.target.id){
                   
                    return item;
                }
                
            })

            localStorage.setItem("Pkey",JSON.stringify(Products_Cart));
            localStorage.setItem("Skey",JSON.stringify(Shoes_Cart));
            window.location.reload()

        })

    }

}


function getCards(image,title,cat,price,des,id){


    return `<div>
            <img src="${image}" alt="Error">
            <h5>${title}</h5>
            <p>${cat}</p>
            <p>${price} Rs</p>
            <p>${des.substring(0,50)}</p>
            <select name="quantity" id="${id}">
            <option value="1">Quantity :- 1</option>
            <option value="2">Quantity :- 2</option>
            <option value="3">Quantity :- 3</option>
            <option value="4">Quantity :- 4</option>
            <option value="5">Quantity :- 5</option>
            </select>
            <button id="${id}">Remove</button>
        </div>`

}



function CalculateCartPrice(){
    Cart_Amount=0;
    if(Products_Cart.length!==0){
        
        for(let id of Products_Cart){
            fetch(`https://63c63ce0d307b76967351ede.mockapi.io/product/${id}`)
                .then((res)=>{
                    return res.json()
                })
                .then((data)=>{
                    
                    for(let i in Quantity_Object){
                        if(id===i){
                            Cart_Amount+=Quantity_Object[i]*data.price;
                            Total_Amount.textContent=Cart_Amount+" Rs";
                            SubTotal.textContent=Cart_Amount+" Rs";
                        }
                    }
                    
                })
        
        }
    }
}
