class Item {
  constructor(item){
    this.item = item
    this.card = this.createCard()
  }

  createCard(){
    const card = document.createElement('div')
    card.className = "card"
    card.dataset.id = this.item.id
    this.cardContent(card)
    app.appendChild(card)
  }

  cardContent(card) {
    const {name, image, color, date_purchased, store, manufacture_location, cost, times_used} = this.item
    const itemName = document.createElement('h2')
    itemName.className = 'h2'
    itemName.innerText = name
    const itemImg = document.createElement('img')
    itemImg.src = image

    card.append(itemName, itemImg)
  }

}