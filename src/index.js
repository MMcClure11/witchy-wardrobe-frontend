console.log("hello from index.js")
const BASE_URL = 'http://localhost:3000';
const ITEMS_URL = `${BASE_URL}/items`;
const body = document.querySelector('body');
const app = document.createElement('div');
const itemsBtn = document.querySelector("#items-btn");
const outfitsBtn = document.querySelector("#outfits-btn");
const modal = document.querySelector("#myModal");
console.log(modal)
const modalContent = document.querySelector(".modal-content");

console.log(modalContent)
createAppDiv();
displayItems();
displayOutfits();

function createAppDiv() {
  app.setAttribute('id', 'app-div')
  body.appendChild(app)
}

function displayItems(){
  itemsBtn.addEventListener("click", () => {
    app.innerHTML = "";
    initItems();
    Item.addItemBtn();
  })
}

function displayOutfits(){
  outfitsBtn.addEventListener("click", () => {
    app.innerHTML = "";
    const h1 = document.createElement('h1')
    h1.innerText = "Coming Soon."
    app.appendChild(h1);
  })
}

function initItems(){
  ApiService.getAllItems().then(items => {
    items.forEach( item => {
      new Item(item)
    })
  })
}