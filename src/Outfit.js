class Outfit {

  constructor(outfit){
    this.outfit = outfit
    this.card = this.createCard()
  }

  static addOutfitBtn() {
    const btnDiv = document.createElement('div')
    const addBtn = document.createElement('button')
    addBtn.className = 'btn'
    addBtn.id = 'add-outfit-btn'
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
    outfitName.id = 'outfit-header'
    outfitName.innerText = name

    const outfitLikes = document.createElement('h5')
    outfitLikes.className = 'h5 pt-2'
    outfitLikes.id = 'outfit-likes'
    outfitLikes.innerText = `❤️ ${likes}`
    outfitLikes.addEventListener("click", () => {
      // console.log(this.outfit)
      this.outfitLikesHandler(this.outfit)
    })

    const outfitContainer = document.createElement('div')

    const imagesDiv = document.createElement('div')
    imagesDiv.className = 'images-div'
    outfitContainer.appendChild(imagesDiv)

    this.outfit.items.forEach(item => {
      const itemImgDiv = document.createElement('div')
      itemImgDiv.className = 'item-outfit-div'
      itemImgDiv.innerHTML = `<img src=${item.image} class='item-outfit-image' 
      alt='${item.name}: ${item.color}' data-toggle="popover" tabindex="50" 
      data-animation="true" data-html="true" data-trigger="focus" 
      title="Item Details" data-content="<p><b>Name:</b></p> <p>${item.name}</p> 
      <p><b>Made In:</b></p> <p>${item.manufacture_location}</p>                       
      <p><b>Store:</b></p> <p>${item.store}</p>
      <p><b>Times Used:</b></p> <p>${item.times_used}</p>"></img>`
      $(function () {
        $('[data-toggle="popover"]').popover()
      })
      imagesDiv.append(itemImgDiv)
    });

    const deleteBtn = document.createElement('p')
    deleteBtn.className ='btn btn-sm'
    deleteBtn.id = 'outfit-delete-btn'
    deleteBtn.innerText = "x"
    this.outfitDeleteHandler(deleteBtn, card)
    outfitName.appendChild(deleteBtn)

    const cardFooterDiv = document.createElement('div')
    cardFooterDiv.className = 'card-footer'

    const editBtn =  document.createElement('button')
    editBtn.className = 'btn'
    editBtn.id = 'outfit-edit-btn'
    editBtn.innerText = "Edit"
    cardFooterDiv.append(editBtn, outfitLikes)
    outfitContainer.appendChild(cardFooterDiv)

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
    
    card.append(outfitName, outfitContainer)
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
    .then(updatedOutfit => {
      if (updatedOutfit.errors){
        alert(updatedOutfit.errors)
      } else {
        this.outfit = updatedOutfit
        card.innerHTML = ""
        this.cardContent(card)
        modal.style.display = "none"
        modal.querySelector("form").remove()
      }
    })
    .catch(error => alert(error))
  }

  outfitLikesHandler(outfit){
    // console.log(outfit)
    ApiService.increaseLikes(outfit.id)
    .then(console.log)
  }

}