class Outfit {

  constructor(outfit){
    this.outfit = outfit
    this.card = this.createCard()
  }

  static addOutfitBtn() {
    const btnDiv = document.createElement('div')
    const addBtn = document.createElement('button')
    addBtn.className = 'btn'
    addBtn.innerText = "Create a New Outfit"
    btnDiv.appendChild(addBtn)
    app.appendChild(btnDiv)
    OutfitForm.outfitModalHandler(addBtn)
  }

  createCard(){
    const card = document.createElement('div')
    card.className = "card text-center "
    card.dataset.id = this.outfit.id
    card.id = 'outfit-card'
    this.cardContent(card)
    app.appendChild(card)
    return card
  }

  cardContent(card) {
    const {name, likes} = this.outfit

    const outfitName = document.createElement('h3')
    outfitName.className = 'h3 card-header'
    outfitName.innerText = name

    const outfitLikes = document.createElement('h5')
    outfitLikes.className = 'h5 pt-2'
    outfitLikes.innerText = `Loved ${likes} times.`

    const outfitContainer = document.createElement('div')
    outfitContainer.innerText = "Items:"

    const imagesDiv = document.createElement('div')
    imagesDiv.className = 'images-div'
    outfitContainer.appendChild(imagesDiv)

    this.outfit.items.forEach(item => {
      // let li = document.createElement('li')
      // li.innerText = `${item.name}`
      const itemImgDiv = document.createElement('div')
      itemImgDiv.className = 'item-outfit-div'
      let itemImgOutfit = document.createElement('img')
      itemImgOutfit.src = item.image
      itemImgOutfit.className = "item-outfit-image"
      itemImgDiv.appendChild(itemImgOutfit)
      // li.appendChild(itemImgOutfit)
      imagesDiv.append(itemImgDiv)
    });

    const deleteBtn = document.createElement('p')
    deleteBtn.className ='btn'
    deleteBtn.id = 'outfit-delete-btn'
    deleteBtn.innerText = "x"
    this.outfitDeleteHandler(deleteBtn, card)
    outfitName.appendChild(deleteBtn)

    const editBtn =  document.createElement('p')
    editBtn.className = 'card-footer btn'
    editBtn.id = 'outfit-edit-btn'
    editBtn.innerText = "Edit"
    outfitContainer.appendChild(editBtn)

    const editOutfitForm = document.createElement('form')
    OutfitForm.outfitEditHandler(editBtn, editOutfitForm, name, likes, this.outfit.items)
    editOutfitForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const checks = Array.from(e.target.querySelectorAll(".checks"))
      // console.log(checks)
      const checkedItems = checks.filter( item => item.checked )
      let itemIdsArray = checkedItems.map( item => parseInt(item.id))
      // console.log(this.outfit.id)
      const editedOutfit = {
        name: e.target.name.value,
        likes: e.target.likes.value,
        item_ids: itemIdsArray
      }
      // console.log(editedOutfit)
      this.updateOutfitHandler(editedOutfit, card)
    })
    
    
    card.append(outfitName, outfitLikes, outfitContainer)
  }

  outfitDeleteHandler(deleteBtn, card){
    deleteBtn.addEventListener("click", () => {
      ApiService.deleteOutfit(this.outfit.id)
        .then(obj => {
          if(obj.error){
            alert(obj.error)
          } else {
            card.remove()
          }
        })
        .catch(error => alert(error))
    })
  }

  updateOutfitHandler(editedOutfit, card){
    // console.log(this.outfit.id)
    ApiService.updateOutfit(this.outfit.id, editedOutfit)
    .then(console.log)
  }

}