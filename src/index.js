const BASE_URL = 'http://localhost:3000';
const ITEMS_URL = `${BASE_URL}/items`;
const CATEGORY_URL = `${BASE_URL}/categories`
const body = document.querySelector('body');
const app = document.createElement('div');
const itemsBtn = document.querySelector("#items-btn");
const outfitsBtn = document.querySelector("#outfits-btn");
const modal = document.querySelector("#myModal");
const modalContent = document.querySelector(".modal-content");

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

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  modal.querySelector("form").remove()
  // modal.querySelector("edit-item-form").remove()
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    modal.querySelector("form").remove()
    // modal.querySelector("edit-item-form").remove()
  }
}