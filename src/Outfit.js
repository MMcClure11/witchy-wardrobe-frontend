class Outfit {

  constructor(outfit){
    this.outfit = outfit
    this.card = this.createCard()
  }

  createCard(){
    const card = document.createElement('div')
    card.className = "card"
    card.dataset.id = this.outfit.id
    console.log(this.outfit)
  }

}