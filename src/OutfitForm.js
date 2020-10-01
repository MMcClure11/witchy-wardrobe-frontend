class OutfitForm {

  static outfitModalHandler(addBtn){
    addBtn.addEventListener("click", () => {
      OutfitForm.createOutfitForm()
    })
  }

  static createOutfitForm(){
    modal.style.display = "block"
    const outfitForm = document.createElement('form')
    modalContent.innerHTML = ""
    modalContent.append(outfitForm)
    OutfitForm.outfitFormContent(outfitForm)
    outfitForm.addEventListener('submit', OutfitForm.handleFormSubmit)
  }

  static outfitFormContent(outfitForm){
    const outfitNameDiv = document.createElement('div')
    outfitNameDiv.className = 'form-group'
    const outfitNameLabel = document.createElement('label')
    outfitNameLabel.innerText = "Outfit Name:"
    const outfitNameInput = document.createElement('input')
    outfitNameInput.name = "name"
    outfitNameInput.required = true
    outfitNameInput.className = "form-control"
    outfitNameDiv.append(outfitNameLabel, outfitNameInput)

    const outfitLikesDiv = document.createElement('div')
    outfitLikesDiv.className = 'form-group'
    const outfitLikesLabel = document.createElement('label')
    outfitLikesLabel.innerText = "Love for this Outfit:"
    const outfitLikesInput = document.createElement('input')
    outfitLikesInput.name = "likes"
    outfitLikesInput.required = true
    outfitLikesInput.type = "number" 
    outfitLikesInput.className = "form-control"
    outfitLikesDiv.append(outfitLikesLabel, outfitLikesInput)

    const itemsCheckContainer = document.createElement('div')
    itemsCheckContainer.className = "items-check-container"
    const itemsCheck = document.createElement('div')
    const checkboxLabel = document.createElement('label')
    checkboxLabel.innerText = "Pick your clothes for your Outfit:"
    itemsCheckContainer.append(checkboxLabel, itemsCheck)

    ApiService.getAllItems()
      .then(items => {
        items.forEach(item => {
          itemsCheck.innerHTML += `<input class="checks" type="checkbox" id="${item.id}" name="${item.name}">
          <label>${item.name}</label>`
        })
      })

    const submitBtn = document.createElement('button')
    submitBtn.className = 'btn'
    submitBtn.innerText = "Submit"

    outfitForm.append(outfitNameDiv, outfitLikesDiv, itemsCheckContainer, submitBtn)
  }

  static handleFormSubmit(e) {
    e.preventDefault()
    const checks = Array.from(e.target.querySelectorAll(".checks"))
    const checkedItems = checks.filter( item => item.checked )
    let itemIdsArray = checkedItems.map( item => parseInt(item.id))
    const newOutfit = {
      name: e.target.name.value,
      likes: e.target.likes.value,
      item_ids: itemIdsArray
    }
    ApiService.postOutfit(newOutfit)
    .then(outfit => {
      if(outfit.errors){
        alert(outfit.errors)
      } else {
      new Outfit(outfit)
      e.target.reset();
      modal.querySelector("form").remove()
      modal.style.display = "none"
      }
    })
    .catch(error => alert(error))
  }

  static outfitEditHandler(editBtn, editOutfitForm, name, likes, items){
    editBtn.addEventListener("click", () => {
      modal.style.display = "block"
      modalContent.append(editOutfitForm)
      OutfitForm.renderEditFormContent(editOutfitForm, name, likes, items)
    })
  }

  static renderEditFormContent(editOutfitForm, name, likes, selectedItems){
    editOutfitForm.innerHTML = ""
    const outfitNameDiv = document.createElement('div')
    outfitNameDiv.className = 'form-group'
    const outfitNameLabel = document.createElement('label')
    outfitNameLabel.innerText = "Outfit Name:"
    const outfitNameInput = document.createElement('input')
    outfitNameInput.name = "name"
    outfitNameInput.value = name
    outfitNameInput.required = true
    outfitNameInput.className = "form-control"
    outfitNameDiv.append(outfitNameLabel, outfitNameInput)

    const outfitLikesDiv = document.createElement('div')
    outfitLikesDiv.className = 'form-group'
    const outfitLikesLabel = document.createElement('label')
    outfitLikesLabel.innerText = "Love for this Outfit:"
    const outfitLikesInput = document.createElement('input')
    outfitLikesInput.name = "likes"
    outfitLikesInput.value = likes
    outfitLikesInput.required = true
    outfitLikesInput.type = "number" 
    outfitLikesInput.className = "form-control"
    outfitLikesDiv.append(outfitLikesLabel, outfitLikesInput)

    const itemsCheckContainer = document.createElement('div')
    itemsCheckContainer.className = "items-check-container"
    const itemsCheck = document.createElement('div')
    const checkboxLabel = document.createElement('label')
    checkboxLabel.innerText = "Pick your clothes for your Outfit:"
    itemsCheckContainer.append(checkboxLabel, itemsCheck)

    ApiService.getAllItems(selectedItems)
      .then(items => {
        items.forEach(item => {
          // itemsCheck.innerHTML += `<input class="checks" type="checkbox" id="${item.id}" name="${item.name}">
          // <label>${item.name}</label>`
          let checkbox = document.createElement('input')
          checkbox.class = "checks"
          checkbox.type = "checkbox"
          checkbox.id = item.id
          checkbox.name = item.name
          let checkLabel = document.createElement('label')
          checkLabel.innerText = item.name
          selectedItems.forEach( item => {
            if(item.name === checkbox.name){
              checkbox.checked = true
            }
          })
          itemsCheck.append(checkbox, checkLabel)
        })
      })

    const submitBtn = document.createElement('button')
    submitBtn.className = 'btn'
    submitBtn.innerText = "Submit"

    editOutfitForm.append(outfitNameDiv, outfitLikesDiv, itemsCheckContainer, submitBtn)
  }

}