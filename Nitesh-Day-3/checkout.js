let Products_Cart=JSON.parse(localStorage.getItem("Pkey")) || [];
let ProductData=[];

let Cart_Amount=0;

let Quantity_Object={};

if(Products_Cart.length){
    for(let i of Products_Cart){
        Quantity_Object[i]=1;
    }
    console.log(Quantity_Object)
}



let CustomerFirstName=document.getElementById("CustomerFName");
let CustomerLastName=document.getElementById("CustomerLName");
let CountrySelect=document.getElementById("Country_Name");
let CustomerAddress=document.getElementById("CustomerAddress");
let CustomerCity=document.getElementById("CustomerCityName");
let CustomerState=document.getElementById("State_Select");
let CustomerZipcode=document.getElementById("CustomerZipCode");
let CustomerPhoneNumber=document.getElementById("CustomerPhoneNumber");

let CustomerCart=document.getElementById("Customer_Cart_items");

let OrderCheckoutButton=document.querySelector("#checkout_form > div:nth-child(6) > button");



OrderCheckoutButton.addEventListener("click",function (e){
    e.preventDefault()

    let C_fname=CustomerFirstName.value;
    let C_lname=CustomerLastName.value;
    let C_country=CountrySelect.value;
    let C_address=CustomerAddress.value;
    let C_city=CustomerCity.value;
    let C_state=CustomerState.value;
    let C_zip=CustomerZipcode.value;
    let C_phone=CustomerPhoneNumber.value;

    //console.log(C_fname,C_lname,C_country,C_address,C_city,C_state,C_zip,C_phone);

    if(C_fname && C_lname && C_country && C_address && C_city && C_state && C_zip && C_phone){

        let obj={
            Cname:`${C_fname} ${C_lname}`,
            Caddress:`${C_address}, ${C_country} , ${C_state}, ${C_city}`,
            Czip:`${C_zip}`,
            Cphone:`${C_phone}`
        }

        //console.log(obj)
       
    // getPaymentoption();

    // PlaceNewOrder(obj);

    }

    else{
        alert("Kindly provide All required details ! ")
    }



})

// getPaymentoption();
function getPaymentoption(){

    let paymentContainer=document.querySelector(".PaymentSection");

    paymentContainer.innerHTML=`<p>Payment</p>
    <select name="Payment" id="PaymentOption">
        <option value="">Select</option>
        <option value="Cash on Delivery">Cash on Delivery</option>
        <option value="Online">Internet Banking</option>
    </select>
    <button id="Place_Order">Place Order</button>`
}

function PlaceNewOrder(obj){

    let placeorderbtn=document.getElementById("Place_Order");
    let paymentoption=document.getElementById("PaymentOption");

    placeorderbtn.addEventListener("click",function (e){
        e.preventDefault()
        if(paymentoption.value===""){
            alert("kindly select a valid payment option !")
        }
        else if(paymentoption.value==="Cash on Delivery"){
            // 

            alert("Order has been Placed Successfully !")
        }
        else{
            setTimeout(function (){
                // 

                alert("Transaction Successfull ! Order has been placed Successfully !")
            },5000)
        }
    })
}


function Shooping(obj){
    
}


fetchAndRenderCart()

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
}



function RenderCartItem(data,amt){

    let Cards=data.map((item)=>{
        return getCards(item.image,item.title,item.category,item.price)
    }).join("")


    CustomerCart.innerHTML=`${Cards}<p>Total :- <span> </span></p>`

    let Total_Amount=document.querySelector("#Customer_Cart_items  > p > span");

    Cart_Amount+=amt;
    Total_Amount.textContent=Cart_Amount+" Rs";
}


function getCards(image,title,cat,price){


    return `<div>

                <div>
                    <img src="${image}" alt="Error">
                </div>

                <div>
                    <p>${title}</p>
                    <p>${cat}</p>
                    <p>${price} Rs</p>
                </div>

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

