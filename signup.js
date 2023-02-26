/* register page */
let RegisterUserDataBase =
  JSON.parse(localStorage.getItem("userdatabase")) || [];

let UserFirstName = document.querySelector("#abhay_firstName");
let UserLastName = document.querySelector("#abhay_lastName");

let NewUserEmailAddress = document.querySelector("#abhay_emailR");
let NewUserPassword = document.querySelector("#abhay_passwordR");

let CreateAccountButton = document.querySelector("#abhay_buttonR");

CreateAccountButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    UserFirstName.value &&
    UserLastName.value &&
    NewUserEmailAddress.value &&
    NewUserPassword.value
  ) {
    let obj = {
      ufname: UserFirstName.value,
      ulname: UserLastName.value,
      useremail: NewUserEmailAddress.value,
      userpass: NewUserPassword.value,
    };

    if (RegisterUserDataBase.includes(obj)) {
      // alert user already registered
      alert("tu user pehle se hai ");
    } else {
      RegisterUserDataBase.push(obj);
      alert("ja bna diya user tujhe");
      console.log(RegisterUserDataBase);

      localStorage.setItem(
        "userdatabase",
        JSON.stringify(RegisterUserDataBase)
      );
    }
  } else {
    alert("Enter All The Details");
  }
}); /* User and Admin login */
