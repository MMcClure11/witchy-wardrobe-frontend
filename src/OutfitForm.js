class OutfitForm {

  static outfitModalHandler(addBtn){
    addBtn.addEventListener("click", () => {
      OutfitForm.createOutfitForm()
    })
  }

  static createOutfitForm(){
    modal.style.display = "block"
    const outfitForm = document.createElement('form')
    modalContent.append(outfitForm)
    OutfitForm.outfitFormContent(outfitForm)
    outfitForm.addEventListener('submit', outfitForm.handleFormSubmit)
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
    outfitLikesInput.name = "name"
    outfitLikesInput.required = true
    outfitLikesInput.type = "number" 
    outfitLikesInput.className = "form-control"
    outfitLikesDiv.append(outfitLikesLabel, outfitLikesInput)


    outfitForm.append(outfitNameDiv, outfitLikesDiv)
  }
}