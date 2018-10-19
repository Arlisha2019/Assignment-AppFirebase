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
let grocery = document.getElementById("grocery")
let groceryList = document.getElementById("groceryList")
var currentUser = null

const database = firebase.database();

const categoriesRef = database.ref("stores")


let categories = []

function displayGroceryItems() {
  console.log(categories);
  grocery.innerHTML = ""
  let liGroceryItems = categories.map(function(category) {
    function renderItems(){

      var renderedItemsArray = []
      for(var i in category.items){
        var theItemObj = category.items[i]
        var theItemName = theItemObj.item
        renderedItemsArray.push(`<p>${theItemName}<button>delete</button></p>`)

      }

      return renderedItemsArray.join('')
    }
    //let store = storeName.value

    return `
  <li>
    <h3>${category.name}<h3>
    <input store="${category.name}" id="list_${category.name}" type="text" placeholder = "Enter grocery item" />
    <button onclick="addGroceries(this,'${category.name}', 'list_${category.name}')">Save Grocery Item</button>
    ${renderItems()}
  </li>`
  })

  //let list = groceryList.value
  grocery.innerHTML = liGroceryItems.join('')
}

submitStoreName.addEventListener('click', function() {

  let store = storeName.value

  categoriesRef.child(store).set({
    name : store,
    createdBy: currentUser
  })

})

function checkAuth(){
  firebase.auth().onAuthStateChanged(function(user){
    if(user){

      currentUser = firebase.auth().currentUser.uid
    }
    else{

      currentUser = null
    }

    observer()
  })
}

function observer() {


  if(currentUser){

    categoriesRef.on('value',function(display){

      categories = []

      display.forEach(function(childDisplay) {


        var storeCreatedBy = childDisplay.val().createdBy

        if(storeCreatedBy === currentUser){
            categories.push(childDisplay.val())

            for(var i in childDisplay.val() ){
              console.log(childDisplay.val()[i])
            }
        }

      })

      displayGroceryItems()

    })


  }

}

function addGroceries(theFormNode, theStore, inputId){

  var storeInput = document.getElementById(inputId)
  var itemName = storeInput.value
  var newItemRef = database.ref(`stores/${theStore}`).child("items").push()
  newItemRef.set({item: itemName})

}

submitLoginInfo.addEventListener('click', function() {

  let email = loginEmail.value
  let password = loginPassword.value

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

checkAuth()
observer()

// firebase.auth().signOut().then(function() {
//   // Sign-out successful.
// }).catch(function(error) {
//   // An error happened.
// });
