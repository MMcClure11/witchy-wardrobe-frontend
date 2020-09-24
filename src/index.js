console.log("hello from index.js")
const BASE_URL = 'http://localhost:3000';
const ITEMS_URL = `${BASE_URL}/items`;
const body = document.querySelector('body');
const app = document.createElement('div');
const itemsBtn = document.querySelector("#items-btn");

createAppDiv();
displayItems();

function createAppDiv() {
  app.setAttribute('id', 'app-div')
  body.appendChild(app)
}

function displayItems(){
  itemsBtn.addEventListener("click", () => {
    alert("items button")
    app.innerHTML = ""
  })
}



// fetch(`${BASE_URL}/items`)
//   .then(res => res.json())
//   .then( items => console.log(items))

