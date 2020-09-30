class Outfit {

  constructor(outfit){
    this.outfit = outfit
    this.card = this.createCard()
  }

  createCard(){
    const card = document.createElement('div')
    card.className = "card"
    card.dataset.id = this.outfit.id
    this.cardContent(card)
    app.appendChild(card)
    return card
  }

  cardContent(card) {
    const {name, likes} = this.outfit

    const outfitName = document.createElement('h3')
    outfitName.innerText = name

    card.append(outfitName)
  }

}