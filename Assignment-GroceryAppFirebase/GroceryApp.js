let submitRegisterInfo = document.getElementById("submitRegisterInfo")
let regEmail = document.getElementById("regEmail")
let regPassword = document.getElementById("regPassword")
//----------------------------------------------------------
let loginEmail = document.getElementById("loginEmail")
let loginPassword = document.getElementById("loginPassword")
let submitLoginInfo = document.getElementById("submitLoginInfo")
//----------------------------------------------------------
let submitStoreName = document.getElementById("submitStoreName")
let storeName = document.getElementById("storeName")
//-----------------------------------------------------------
let groceryList = document.getElementById("groceryList")

const database = firebase.database();

const categoriesRef = database.ref("groceryStore")

let categories = []

function displayGroceryItems() {

  let liGroceryItems = categories.map(function(category) {
    return `
  <li>
  <h3>${category.store}<h3>
  <input type="text" placeholder = "Enter grocery item" />
  <button onclick="addGroceries(this,'${category.store}')">Save Grocery Item</button>
  </li>`
  })

  groceryList.innerHTML = liGroceryItems.join('')
}


function addGroceries(title){

  submitStoreName.addEventListener('click', function() {

    let store = storeName.value

    let storeItems = categoriesRef.child(title).child("list").storeItems.child(storeName).set({
      store: storeName
    })
    console.log("Hello Hello ")

  })

}

submitLoginInfo.addEventListener('click', function() {

  let email = loginEmail.value
  let password = regPassword.value

  firebase.auth().signInWithEmailAndPassword(email, password)

  .then(function(signInUser){

  })
  .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  })
})

submitRegisterInfo.addEventListener('click', function() {

  let email = regEmail.value
  let password = regPassword.value

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(newUser) {
  })
  .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  })
})
