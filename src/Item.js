class Item {
  constructor(item){
    this.item = item
    this.card = this.createCard()
  }

  static addItemBtn() {
    const addBtn = document.createElement('button')
    addBtn.className = "add-button"
    addBtn.innerText = "Add a New Clothing Item"
    app.appendChild(addBtn)

    Item.itemModalHandler(addBtn)
  }

  createCard(){
    const card = document.createElement('div')
    card.className = "item-card"
    card.dataset.id = this.item.id
    this.cardContent(card)
    app.appendChild(card)
  }

  cardContent(card) {
    const {name, image, color, date_purchased, store, manufacture_location, cost, times_used} = this.item
    const itemCategory = document.createElement('h2')
    itemCategory.className = 'h2'
    itemCategory.innerText = this.item.category.name
    const itemName = document.createElement('h3')
    itemName.className = 'h3'
    itemName.innerText = name
    const itemImg = document.createElement('img')
    itemImg.className = 'item-image'
    itemImg.src = image
    const itemColor = document.createElement('p')
    itemColor.innerText = color
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

    card.append(itemCategory, itemName, itemImg, itemColor, itemDatePurchased, itemStore, itemManuLoc, itemCost, itemTimesUsed)
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

    const categorySelector = document.createElement('select')
    categorySelector.id = 'select-category'
    categorySelector.name = 'category'
    ApiService.getAllCategories()
      .then(categories => {
        categories.forEach( category => {
          let option = document.createElement('option')
          option.textContent = category.name
          option.value = category.name
          categorySelector.appendChild(option)
        })
      })


    const submitBtn = document.createElement('button')
    submitBtn.innerText = "Submit"

    itemForm.append(itemNameLabel, itemNameInput, categorySelector, submitBtn)
  }

  static handleFormSubmit(item){
    item.preventDefault()
    modal.style.display = "none"
    const newItem = {
      name: item.target.name.value
    }
    console.log(newItem)
  }

}