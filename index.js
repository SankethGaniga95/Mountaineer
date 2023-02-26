let topN = document.getElementById("abhay_nav_uppermost")
let midN = document.getElementById("abhay_nav_middle")
let botN = document.getElementById("abhay_nav_bottom")
let butD = document.getElementById("dark_mode")
let body = document.querySelector("body")
let account = document.getElementById("abhay_accounts")
let cart = document.getElementById("abhay_addToCart")
let search = document.getElementById("search")
let para = document.querySelectorAll(".abhayPara")
let footer = document.querySelector("footer")

butD.addEventListener("click", ()=>{
    if(butD.innerHTML === "Night") {
        topN.style.backgroundColor = "#1b1a1a";
        midN.style.backgroundColor = "#3a3a3b";
        botN.style.backgroundColor = "#3a3a3b"
        body.style.backgroundColor = "#242525"
        footer.style.backgroundColor = "#3a3a3b"
        botN.style.border = "none"
        account.style.backgroundColor = "#2a2b2a"
        cart.style.backgroundColor = "#2a2b2a"
        search.style.backgroundColor = "#2a2b2a"
        for(let i = 0; i < para.length; i++) {
            para[i].style.color = "white"
        }
        butD.innerText = "Day"
    }else if(butD.innerHTML === "Day") {
        topN.style.backgroundColor = "#303e35";
        midN.style.backgroundColor = "#edf1ef";
        botN.style.backgroundColor = "white"
        body.style.backgroundColor = "white"
        footer.style.backgroundColor = "#303e35"
        botN.style.border = "1px solid #bfc4c1"
        account.style.backgroundColor = "white"
        cart.style.backgroundColor = "white"
        search.style.backgroundColor = "white"
        for(let i = 0; i < para.length; i++) {
            para[i].style.color = "black"
        }
        butD.innerText = "Night"
    }
})
let signinOuter = document.getElementById("abhay_accounts")
let singin = document.getElementById("abhay_account_details")
signinOuter.addEventListener("mouseenter", ()=>{
    let divO = document.createElement("div");
    let div1 = document.createElement("div");
    div1.setAttribute("class", "loginOp")
    let div2 = document.createElement("div");
    div2.setAttribute("class", "signinOp")

   singin.append(divO)
})
signinOuter.addEventListener("mouseleave", ()=>{
    singin.innerText = ""
})