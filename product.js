
let url=`https://63c63ce0d307b76967351ede.mockapi.io/product`;

let alldata=[];

fetch(url).then((res)=>{
    return res.json();
}).then((data)=>{
    console.log(data);
    alldata=data;
    display(data);
}).catch((err)=>{
    console.log(err);
})

//    Search
let form=document.querySelector("form");
       form.addEventListener( "submit",(e)=>{
         e.preventDefault();
         let item=form.input.value;
        
         let filtered=alldata.filter((element)=>{
            if(element.category.toUpperCase().includes(item.toUpperCase())===true){
                return true;
            }else{
                return false
            }
         })
         console.log(filtered);
         display(filtered);
       })

        // get cart data form localStorage
       let cartdata=JSON.parse(localStorage.getItem("cart"))||[];

function display(data){
    let card=document.querySelector("#product3");
    card.innerHTML=null;

    data.forEach((el,i)=>{
        let div=document.createElement("div");
        let img=document.createElement("img");
        let title=document.createElement("h2");
        let desc=document.createElement("p");
        let price=document.createElement("h4");
        let category=document.createElement("p");
        let cartadd=document.createElement("button");

        img.setAttribute("src",el.image);
        title.innerText=el.title;
        desc.innerText=el.Description;
        price.innerText= "$"+el.price;
        category.innerText=el.category;
        cartadd.innerText="Add to Cart";

        cartadd.addEventListener("click",()=>{
           
            if(CharacterData(el)){
                alert("Product is already in Cart")
            }else{
                // let cartdata=JSON.parse(localStorage.getItem("cart"))||[];
                cartdata.push(el);
            localStorage.setItem("cart",JSON.stringify(cartdata));
            alert(`${el.title} is added in Cart`);
            }

            
        })

        div.append(img,price,title,price,category,desc,cartadd);
        card.append(div);
    })
}
function CharacterData(el){
    for(i=0;i<cartdata.length;i++){
        if(cartdata[i].id===el.id){
            return true;
        }
    }return false;
}

// filtered

let brand = document.querySelector('#filter1');
   
    brand.addEventListener('change',function(event){
        
        if(event.target.value===''){
           
            let filteredArr = JSON.parse(localStorage.getItem('filteredArr'))||[];
           
            filteredArr = alldata;
           
            localStorage.setItem('filteredArr',JSON.stringify(filteredArr));
           
            display(filteredArr);
        }
        else{
          
            let filteredArr = JSON.parse(localStorage.getItem('filteredArr'))||[];
            
            filteredArr = alldata.filter(function(el){
                return el.category==event.target.value;
            });
           
            localStorage.setItem('filteredArr',JSON.stringify(filteredArr));
          
            display(filteredArr);
        }
    })
    // sort

    let sort = document.querySelector('#sort');
    
    sort.addEventListener('change',function(event){
        let productDB = JSON.parse(localStorage.getItem('productDB'))||[];
       
        if(event.target.value===''){
            
        }
        else{
            if(event.target.value ==="Ascending"){
               
                alldata.sort(function(a,b){
                    return a.price-b.price;
                })
               
                localStorage.setItem('productDB',JSON.stringify(productDB));
                
                display(alldata);
            }
            else if(event.target.value==="Descending"){

                alldata.sort(function(a,b){
                    return b.price-a.price;
                })
              
                localStorage.setItem('productDB',JSON.stringify(productDB));
               
                display(alldata);
                
            }
            
           
        }
    })

    // page Background color change

    let body=document.querySelector("body");
    let nav=document.querySelector("#abhay_nav_middle > div > div:nth-child(3)");
    let nav1=document.querySelector("#abhay_nav_middle > div > div:nth-child(4) ");

    let bbtn=document.querySelector("#black");
    let wbtn=document.querySelector("#white");

    bbtn.addEventListener("click",()=>{
        
        body.style.backgroundColor="Black";
        nav.style.color="Black";
        nav1.style.color="Black";
        body.style.color="white";
    })

    wbtn.addEventListener("click",()=>{
        
        body.style.backgroundColor="white";
        body.style.color="black";
    })