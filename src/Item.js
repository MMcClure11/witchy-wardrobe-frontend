class Item {
  constructor(item){
    this.item = item
    this.card = this.createCard()
  }

  static addItemBtn() {
    const btnDiv = document.createElement('div')
    const addBtn = document.createElement('button')
    addBtn.className = 'btn'
    // addBtn.className = "add-button"
    addBtn.innerText = "Add a New Clothing Item"
    btnDiv.appendChild(addBtn)
    app.appendChild(btnDiv)

    Item.itemModalHandler(addBtn)
  }

  createCard(){
    const card = document.createElement('div')
    card.className = "card text-center"
    card.dataset.id = this.item.id
    this.cardContent(card)
    app.appendChild(card)
  }

  cardContent(card) {
    const {name, image, color, date_purchased, store, manufacture_location, cost, times_used} = this.item
   
    const itemCategory = document.createElement('h3')
    itemCategory.className = 'h3 card-header'
    itemCategory.innerText = `${this.item.category.name} - ${name}`
    
    const itemImg = document.createElement('img')
    itemImg.className = 'card-img float-right'
    itemImg.src = image
   
    const infoDiv = document.createElement('div')
    infoDiv.id = 'info-div'
    
    const itemDatePurchased = document.createElement('p')
    itemDatePurchased.innerText = `Purchased on ${date_purchased}`
  
    const itemStore = document.createElement('p')
    itemStore.innerText = `From ${store}`
   
    const itemManuLoc = document.createElement('p')
    itemManuLoc.innerText = `Made in: ${manufacture_location}`
   
    const itemCost = document.createElement('p')
    itemCost.innerText = `Cost: $${cost}`
  
    const itemTimesUsed = document.createElement('p')
    itemTimesUsed.innerText = `Worn ${times_used} times.`

    const deleteBtn = document.createElement('p')
    deleteBtn.className = 'card-footer btn'
    deleteBtn.innerText = `Remove ${name}`
    this.itemDeleteHandler(deleteBtn, card)

    infoDiv.append(itemDatePurchased, itemStore, itemManuLoc, itemCost, itemTimesUsed, deleteBtn)

    card.append(itemCategory, infoDiv, itemImg)
  }

  itemDeleteHandler(deleteBtn, card) {
    deleteBtn.addEventListener("click", () => {
      ApiService.deleteItem(this.item.id).then(() => card.remove())
    })
  }

  static itemModalHandler(addBtn){
    addBtn.addEventListener("click", () => {
      Item.createItemForm()
    })
  }

  static createItemForm(){
    modal.style.display = "block"
    const itemForm = document.createElement('form')
    modalContent.append(itemForm)
    Item.itemFormContent(itemForm)
    itemForm.addEventListener('submit', Item.handleFormSubmit)
  }

  static itemFormContent(itemForm){
    const itemNameLabel = document.createElement('label')
    itemNameLabel.innerText = "Item Name:"
    const itemNameInput = document.createElement('input')
    itemNameInput.name = "name"

    const itemImageLabel = document.createElement('label')
    itemImageLabel.innerText = "Item Image:"
    const itemImageInput = document.createElement('input')
    itemImageInput.name = "image"

    const itemColorLabel = document.createElement('label')
    itemColorLabel.innerText = "Item Color:"
    const itemColorInput = document.createElement('input')
    itemColorInput.name = "color"

    const itemDatePurchasedLabel = document.createElement('label')
    itemDatePurchasedLabel.innerText = "Date Purchased:"
    const itemDatePurchasedInput = document.createElement('input')
    itemDatePurchasedInput.name = "date_purchased"

    const itemStoreLabel = document.createElement('label')
    itemStoreLabel.innerText = "Store Purchased From:"
    const itemStoreInput = document.createElement('input')
    itemStoreInput.name = "store"

    const itemManuLocLabel = document.createElement('label')
    itemManuLocLabel.innerText = "Made In:"
    const itemManuLocInput = document.createElement('input')
    itemManuLocInput.name = "manufacture_location"

    const itemCostLabel = document.createElement('label')
    itemCostLabel.innerText = "Cost:"
    const itemCostInput = document.createElement('input')
    itemCostInput.type = "number"
    itemCostInput.name = "cost"

    const itemTimesUsedLabel = document.createElement('label')
    itemTimesUsedLabel.innerText = "Times Used:"
    const itemTimesUsedInput = document.createElement('input')
    itemTimesUsedInput.type = "number"
    itemTimesUsedInput.name = "times_used"

    const categorySelector = document.createElement('select')
    categorySelector.id = 'select-category'
    categorySelector.name = 'category'
    Item.categoryDropdown(categorySelector)

    const submitBtn = document.createElement('button')
    submitBtn.innerText = "Submit"

    itemForm.append(itemNameLabel, itemNameInput, 
      itemImageLabel, itemImageInput, 
      itemColorLabel, itemColorInput, 
      itemDatePurchasedLabel, itemDatePurchasedInput, 
      itemStoreLabel, itemStoreInput, 
      itemManuLocLabel, itemManuLocInput, 
      itemCostLabel, itemCostInput, 
      itemTimesUsedLabel, itemTimesUsedInput, 
      categorySelector, submitBtn)
  }

  static categoryDropdown(categorySelector) {
    ApiService.getAllCategories()
      .then(categories => {
        categories.forEach(category => {
          let option = document.createElement('option')
          option.textContent = category.name
          option.value = category.name
          categorySelector.appendChild(option)
        })
      })
  }

  static handleFormSubmit(e){
    e.preventDefault()
    modal.style.display = "none"
    const newItem = {
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
    ApiService.postItem(newItem)
    .then(item => {
      new Item(item)
    })
    e.target.reset();
    modal.querySelector("form").remove()
  }

}