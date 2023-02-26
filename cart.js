// fetching id's of product from LS and get data from API

let Products_Cart=JSON.parse(localStorage.getItem("Pkey")) || [];

let Quantity_item=JSON.parse(localStorage.getItem("Quantity")) || null;

let Customer_History_product=JSON.parse(localStorage.getItem("CustomerHistory")) || [];


fetchAndRenderCart();

DisplayCustomerHistory(Customer_History_product);

let Cart_Amount=0;

let Quantity_Object={};

if(Products_Cart.length){
    for(let i of Products_Cart){
        Quantity_Object[i]=1;
    }
    Quantity_item=Quantity_Object;
    localStorage.setItem("Quantity",JSON.stringify(Quantity_item));
}

let MainCartSection=document.getElementById("Nitesh_Cart_items");
let Total_Amount=document.querySelector("#Nitesh_Order_Summary > div > h3 > span");
let SubTotal=document.querySelector("#Nitesh_Order_Summary > div > p:nth-child(2) > span");



let ProductData=[];

let ShoesData=[];



let checkoutbtn=document.querySelector("#Nitesh_Order_Summary button");

checkoutbtn.addEventListener("click",function(e){

    e.preventDefault()

    if(Products_Cart.length)
        window.location="./Nitesh-Day-3/checkout.html"
})



function fetchAndRenderCart(){


    if(Products_Cart.length!==0){
        
        for(let id of Products_Cart){
            fetch(`https://63c63ce0d307b76967351ede.mockapi.io/product/${id}`)
                .then((res)=>{
                    return res.json()
                })
                .then((data)=>{
                    ProductData.push(data)
                    RenderCartItem(ProductData,+data.price)
                })
        
        }
    }

    else{
        Emptycart();
    }

}


function Emptycart(){
    let MainCartSection=document.getElementById("Nitesh_Cart_items");
   
    MainCartSection.innerHTML=`<p>Your Shopping Cart is Empty !</p>`
}


function RenderCartItem(data,amt){

    let Cards=data.map((item)=>{
        return getCards(item.image,item.title,item.category,item.price,item.description,item.id)
    }).join("")

   
    MainCartSection.innerHTML = `${Cards}`;


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
            Quantity_item=Quantity_Object;

            localStorage.setItem("Quantity",JSON.stringify(Quantity_item));

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


            console.log(Products_Cart)
            localStorage.setItem("Pkey",JSON.stringify(Products_Cart));
            
            fetchAndRenderCart()


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
                            Cart_Amount+=(Quantity_Object[i])*(+data.price);
                            Total_Amount.textContent=Cart_Amount+" Rs";
                            SubTotal.textContent=Cart_Amount+" Rs";
                        }
                    }
                    
                })
        
        }
    }
}



function DisplayCustomerHistory(data){

    let NiteshCartHistory=document.querySelector(".NiteshCart_History");
    let Historyitemcards="";

   for(let id of data){
    fetch(`https://63c63ce0d307b76967351ede.mockapi.io/product/${id}`)
                .then((res)=>{
                    return res.json()
                })
                .then((data)=>{

                    Historyitemcards += `<div id="History_Items">

                            <img src="${data.image}" alt="Error">
                            <p>${data.title}</p>
                            <p>${data.category}</p>
                            <p>${data.price} Rs</p>
                            <p>${data.description.substring(0,50)}</p>

                        </div>`

                        NiteshCartHistory.innerHTML=`${Historyitemcards}`;
                })

                
    }

}




let HistoryItem=document.querySelector(".HistoryRemover");

HistoryItem.addEventListener("click",function(e){
    e.preventDefault()

    localStorage.clear()
    window.location.reload()
    
})


