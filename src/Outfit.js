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

    card.append(outfitName, outfitLikes, outfitContainer)
  }

}