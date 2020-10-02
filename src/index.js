const BASE_URL = 'http://localhost:3000';
const ITEMS_URL = `${BASE_URL}/items`;
const CATEGORY_URL = `${BASE_URL}/categories`;
const OUTFITS_URL = `${BASE_URL}/outfits`;
const body = document.querySelector('body');
const app = document.createElement('div');
const itemCollection = document.createElement('div');
itemCollection.className = 'justify-content-center'
itemCollection.id = "item-collection"
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
    Item.addSortBtn();
    Item.addFilter();
  })
}

function displayOutfits(){
  outfitsBtn.addEventListener("click", () => {
    app.innerHTML = "";
    itemCollection.innerHTML = "";
    initOutfits();
    Outfit.addOutfitBtn();
  })
}

function initItems(){
  ApiService.getAllItems()
  .then(items => {
    items.forEach( item => {
      new Item(item)
    })
  })
  .catch(error => alert(error))
}

function initOutfits(){
  ApiService.getAllOutfits()
  .then(outfits => {
    outfits.forEach( outfit => {
      new Outfit(outfit)
    })
  })
  .catch(error => alert(error))
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