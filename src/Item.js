class Item {

  static all = []
  static sort = "alphabetical"
  // console.log(Item.all)

  constructor(item){
    this.item = item
    this.card = this.createCard()
    this.constructor.all.push(this)
    // console.log(Item.all)
  }

  static addSortBtn(){
    const div = document.createElement('div')
    div.innerHTML = ` <select id="sort">
    <option value="alphabetical">Alphabetical</option>
    <option value="times_used">Times Used</option>
    <option value="color">Color</option>
    <option value="cost">Cost</option>
  </select>`
  app.appendChild(div)
  document.getElementById("sort").addEventListener("change", this.handleSort)
  }

  static addItemBtn() {
    const btnDiv = document.createElement('div')
    const addBtn = document.createElement('button')
    addBtn.className = 'btn'
    // addBtn.className = "add-button"
    addBtn.innerText = "Add a New Clothing Item"
    btnDiv.appendChild(addBtn)
    app.appendChild(btnDiv)

    ItemForm.itemModalHandler(addBtn)
  }

  createCard(){
    const card = document.createElement('div')
    card.className = "card text-center"
    card.dataset.id = this.item.id
    this.cardContent(card)
    itemCollection.appendChild(card)
    app.appendChild(itemCollection)
    return card
  }

  cardContent(card) {
    const {name, image, color, format_date, date_purchased, store, manufacture_location, cost, times_used} = this.item
   
    const itemCategory = document.createElement('h4')
    itemCategory.className = 'h4 card-header'
    itemCategory.innerText = `${this.item.category.name} - ${name}`
    
    const itemImg = document.createElement('img')
    itemImg.className = 'card-img float-right'
    itemImg.src = image
    itemImg.alt = name
   
    const infoDiv = document.createElement('div')
    infoDiv.id = 'info-div'
    
    const itemDatePurchased = document.createElement('p')
    itemDatePurchased.innerText = `Purchased on ${format_date}`
  
    const itemStore = document.createElement('p')
    itemStore.innerText = `From ${store}`
   
    const itemManuLoc = document.createElement('p')
    itemManuLoc.innerText = `Made in: ${manufacture_location}`
   
    const itemCost = document.createElement('p')
    itemCost.innerText = `Cost: $${cost}`
  
    const itemTimesUsed = document.createElement('p')
    itemTimesUsed.innerText = `Worn ${times_used} times. +`
    itemTimesUsed.addEventListener("click", () => {
      // console.log(this.item.id)
      ApiService.increaseTimesUsed(this.item.id)
        .then(updatedItem => {
          this.item = updatedItem
          card.innerHTML = ""
          this.cardContent(card)
        })
        .catch(error => alert(error))
    })

    const editBtn = document.createElement('p')
    editBtn.className = 'btn'
    editBtn.id = 'edit-btn'
    editBtn.innerText = `Edit`
    const editItemForm = document.createElement('form')
    ItemForm.itemEditHandler(editBtn, editItemForm, name, image, color, date_purchased, store, manufacture_location, cost, times_used, this.item.category.name)
    editItemForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // console.log(this.item.id)
      const editedItem = {
        name: e.target.name.value,
        image: e.target.image.value,
        color: e.target.color.value,
        date_purchased: e.target.date_purchased.value,
        store: e.target.store.value,
        manufacture_location: e.target.manufacture_location.value,
        cost: e.target.cost.value,
        times_used: e.target.times_used.value,
        category_name: e.target.category.value
      }
      // console.log(editedItem)
      this.updateItemHandler(editedItem, card)
    })

    const deleteBtn = document.createElement('p')
    deleteBtn.className = 'btn btn-sm'
    deleteBtn.id = 'delete-btn'
    deleteBtn.innerText = "x"
    this.itemDeleteHandler(deleteBtn, card)

    infoDiv.append(itemDatePurchased, itemStore, itemManuLoc, itemCost, itemTimesUsed, editBtn)
    itemCategory.appendChild(deleteBtn)
    card.append(itemCategory, infoDiv, itemImg)
  }

  itemDeleteHandler(deleteBtn, card) {
    deleteBtn.addEventListener("click", () => {
      ApiService.deleteItem(this.item.id)
        .then(() => card.remove())
        .catch(error => alert(error))
    })
  }

  updateItemHandler(editedItem, card){
    ApiService.updateItem(this.item.id, editedItem)
    .then(updatedItem => {
      if (updatedItem.errors){
        alert(updatedItem.errors)
      } else {
        this.item = updatedItem
        card.innerHTML = ""
        this.cardContent(card)
        modal.style.display = "none"
        modal.querySelector("form").remove()
      }
    })
    .catch(error => alert(error))
  }

  static handleSort = (e) => {
    this.sort = e.target.value
    this.rerenderAll()
    // console.log(this.sort) => times_used or alphabetical
  }

  static sortedItemCards(){
    if (this.sort === "alphabetical"){
      return [...this.all].sort((itemA, itemB) => itemA.item.name.localeCompare(itemB.item.name))
    }
    if (this.sort === "times_used"){
      return [...this.all].sort((itemA, itemB) => itemB.item.times_used - itemA.item.times_used)
    }
    if (this.sort === "color"){
      return [...this.all].sort((itemA, itemB) => itemA.item.color.localeCompare(itemB.item.color))
    }
    if (this.sort === "cost"){
      return [...this.all].sort((itemA, itemB) => itemB.item.cost - itemA.item.cost)
    }
  }

  static rerenderAll(){
    itemCollection.innerHTML = ""
    this.sortedItemCards().forEach(itemCard => itemCard.createCard())
    // this.all.forEach(itemCard => itemCard.createCard())
  }

}