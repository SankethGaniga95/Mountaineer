/* User and Admin login */

let RegisterUserDataBase=JSON.parse(localStorage.getItem("userdatabase")) || [];


let UserEmailAddress=document.querySelector("#abhay_email_input");
let UserPassword=document.querySelector("#abhay_password_input");
let UserLoginButton=document.querySelector("#abhay_login_button");

UserLoginButton.addEventListener("click",function(e){

    e.preventDefault()

    if(UserEmailAddress.value==="admin" && UserPassword.value==="admin"){

        console.log("welcome admin")
        alert("are boss aa gaye")

        // move to admin page
        // window.location="admin.html"
    }

    else if(UserEmailAddress.value && UserPassword.value){

        let obj={
            username:UserEmailAddress.value,
            password:UserPassword.value
        }
        let found=0;

        for(let user of RegisterUserDataBase){
            if(user.useremail===obj.username && user.userpass===obj.password){

               found=1;
               break;

            }
        }

        if(found===1){
            console.log("let's do shopping")
            alert("chalo kharcha karte hai")

            //login successfull
            // move user to product page
            // window.location="product.html"

        }

        else{
            console.log("wrong details.")
            alert("tu kaun hai be ? ")
        }

    }
    else{
        console.log("wrong details.")
        alert("tu kaun hai be ? ")
    }

})



/* User and Admin login */


