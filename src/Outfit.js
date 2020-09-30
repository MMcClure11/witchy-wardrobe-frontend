class Outfit {

  constructor(outfit){
    this.outfit = outfit
    this.card = this.createCard()
  }

  createCard(){
    const card = document.createElement('div')
    card.className = "card text-center"
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
    outfitLikes.innerText = `Loved ${likes} times.`

    const ul = document.createElement('ul')
    ul.innerText = "Items:"
    ul.className = 'list-unstyled'

    this.outfit.items.forEach(item => {
      let li = document.createElement('li')
      li.innerText = `${item.name}`
      const itemImgDiv = document.createElement('div')
      let itemImgOutfit = document.createElement('img')
      itemImgOutfit.src = item.image
      itemImgOutfit.className = "item-outfit-image"
      itemImgDiv.appendChild(itemImgOutfit)
      // li.appendChild(itemImgOutfit)
      ul.append(itemImgDiv)
    });

    card.append(outfitName, outfitLikes, ul)
  }

}