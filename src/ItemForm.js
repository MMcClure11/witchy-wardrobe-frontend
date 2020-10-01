class ItemForm {

  static itemModalHandler(addBtn){
    addBtn.addEventListener("click", () => {
      ItemForm.createItemForm()
    })
  }

  static createItemForm(){
    modal.style.display = "block"
    const itemForm = document.createElement('form')
    modalContent.innerHTML = ""
    modalContent.append(itemForm)
    ItemForm.itemFormContent(itemForm)
    itemForm.addEventListener('submit', ItemForm.handleFormSubmit)
  }

  static itemFormContent(editItemForm, name, image, color, date_purchased, store, manufacture_location, cost, times_used, category, itemForm){
    const itemNameDiv = document.createElement('div')
    itemNameDiv.className = 'form-group'
    const itemNameLabel = document.createElement('label')
    itemNameLabel.innerText = "Item Name:"
    const itemNameInput = document.createElement('input')
    itemNameInput.name = "name"
    itemNameInput.required = true
    itemNameInput.className = "form-control"
    itemNameDiv.append(itemNameLabel, itemNameInput)

    const itemImageDiv = document.createElement('div')
    itemImageDiv.className = 'form-group'
    const itemImageLabel = document.createElement('label')
    itemImageLabel.innerText = "Item Image URL:"
    const itemImageInput = document.createElement('input')
    itemImageInput.name = "image"
    itemImageInput.required = true
    itemImageInput.className = "form-control"
    itemImageDiv.append(itemImageLabel, itemImageInput)

    const itemColorDiv = document.createElement('div')
    itemColorDiv.className = 'form-group'
    const itemColorLabel = document.createElement('label')
    itemColorLabel.innerText = "Item Color:"
    const itemColorInput = document.createElement('input')
    itemColorInput.name = "color"
    itemColorInput.required = true
    itemColorInput.className = "form-control"
    itemColorDiv.append(itemColorLabel, itemColorInput)

    const itemDatePurchasedDiv = document.createElement('div')
    itemDatePurchasedDiv.className = 'form-group'
    const itemDatePurchasedLabel = document.createElement('label')
    itemDatePurchasedLabel.innerText = "Date Purchased:"
    const itemDatePurchasedInput = document.createElement('input')
    itemDatePurchasedInput.name = "date_purchased"
    itemDatePurchasedInput.required = true
    itemDatePurchasedInput.type = "date"
    itemDatePurchasedInput.className = "form-control"
    itemDatePurchasedDiv.append(itemDatePurchasedLabel, itemDatePurchasedInput)

    const itemStoreDiv = document.createElement('div')
    itemStoreDiv.className = 'form-group'
    const itemStoreLabel = document.createElement('label')
    itemStoreLabel.innerText = "Store Purchased From:"
    const itemStoreInput = document.createElement('input')
    itemStoreInput.name = "store"
    itemStoreInput.required = true
    itemStoreInput.className = "form-control"
    itemStoreDiv.append(itemStoreLabel, itemStoreInput)

    const itemManuLocDiv = document.createElement('div')
    itemManuLocDiv.className = 'form-group'
    const itemManuLocLabel = document.createElement('label')
    itemManuLocLabel.innerText = "Made In:"
    const itemManuLocInput = document.createElement('input')
    itemManuLocInput.name = "manufacture_location"
    itemManuLocInput.required = true
    itemManuLocInput.className = "form-control"
    itemManuLocDiv.append(itemManuLocLabel, itemManuLocInput)

    const itemCostDiv = document.createElement('div')
    itemCostDiv.className = 'form-group'
    const itemCostLabel = document.createElement('label')
    itemCostLabel.innerText = "Cost:"
    const itemCostInput = document.createElement('input')
    itemCostInput.type = "number"
    itemCostInput.step = "0.01"
    itemCostInput.name = "cost"
    itemCostInput.required = true
    itemCostInput.className = "form-control"
    itemCostDiv.append(itemCostLabel, itemCostInput)

    const itemTimesUsedDiv = document.createElement('div')
    itemTimesUsedDiv.className = 'form-group'
    const itemTimesUsedLabel = document.createElement('label')
    itemTimesUsedLabel.innerText = "Times Used:"
    const itemTimesUsedInput = document.createElement('input')
    itemTimesUsedInput.type = "number"
    itemTimesUsedInput.name = "times_used"
    itemTimesUsedInput.required = true
    itemTimesUsedInput.className = "form-control"
    itemTimesUsedDiv.append(itemTimesUsedLabel, itemTimesUsedInput)

    const itemCatDiv = document.createElement('div')
    itemCatDiv.className = 'form-group'
    const categorySelectorLabel = document.createElement('label')
    categorySelectorLabel.innerText = "Category:"
    const categorySelector = document.createElement('select')
    categorySelector.id = 'select-category'
    categorySelector.name = 'category'
    categorySelector.className = 'form-control'
    ItemForm.categoryDropdown(categorySelector)
  
    if(name){
      itemNameInput.value = name
      itemImageInput.value = image
      itemColorInput.value = color
      itemDatePurchasedInput.value = date_purchased
      itemStoreInput.value = store
      itemManuLocInput.value = manufacture_location
      itemCostInput.value = cost
      itemTimesUsedInput.value = times_used
    }

    const submitBtn = document.createElement('button')
    submitBtn.className = 'btn'
    submitBtn.innerText = "Submit"

    if(itemForm){
      itemForm.innerHTML = ""
      itemForm.append(itemNameDiv, 
        itemImageDiv, 
        itemColorDiv, 
        itemDatePurchasedDiv, 
        itemStoreDiv,
        itemManuLocDiv,
        itemCostDiv, 
        itemTimesUsedDiv, 
        categorySelectorLabel, categorySelector, submitBtn)
    } else if (editItemForm){
      editItemForm.innerHTML = ""
      editItemForm.append(itemNameDiv, 
        itemImageDiv, 
        itemColorDiv, 
        itemDatePurchasedDiv, 
        itemStoreDiv,
        itemManuLocDiv,
        itemCostDiv, 
        itemTimesUsedDiv, 
        categorySelectorLabel, categorySelector, submitBtn)
    }
  }

  static categoryDropdown(categorySelector, selectedCategory) {
    ApiService.getAllCategories(selectedCategory)
      .then(categories => {
        categories.forEach(category => {
          let option = document.createElement('option')
          option.textContent = category.name
          option.value = category.name
          if(selectedCategory && selectedCategory === category.name){
            option.selected = true
          }
          categorySelector.appendChild(option)
        })
      })
      .catch(error => alert(error))
  }

  static handleFormSubmit(e){
    e.preventDefault()
    // modal.style.display = "none"
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
      if(item.errors){
        alert(item.errors)
      } else {
      new Item(item)
      e.target.reset();
      modal.querySelector("form").remove()
      modal.style.display = "none"
      }
    })
    .catch(error => alert(error))
  }

  static itemEditHandler(editBtn, editItemForm, name, image, color, date_purchased, store, manufacture_location, cost, times_used, category){
    editBtn.addEventListener("click", () => {
      // console.log(this.item)
      modal.style.display = "block"
      modalContent.append(editItemForm)
      ItemForm.itemFormContent(editItemForm, name, image, color, date_purchased, store, manufacture_location, cost, times_used, category)
    })
  }

}