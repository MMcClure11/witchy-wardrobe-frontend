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

    const outfitLikes = document.createElement('h5')
    outfitLikes.innerText = `Loved ${likes} times.`

    const ul = document.createElement('ul')
    ul.innerText = "Items:"

    this.outfit.items.forEach(item => {
      let li = document.createElement('li')
      li.innerText = `${item.name}`
      let itemImg = document.createElement('img')
      itemImg.src = item.image
      li.appendChild(itemImg)
      ul.appendChild(li)
    });

    card.append(outfitName, outfitLikes, ul)
  }

}