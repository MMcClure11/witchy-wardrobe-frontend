class ApiService {

  static getAllItems(){
    return fetch(ITEMS_URL)
    .then(res => res.json())
  }

  static sortItems(sort, filter, query){
    let sortParams = `?sort=${sort}`
    let filterParams = `&filter=${filter}`
    let queryParams = `&query=${query}`
    return fetch(`${ITEMS_URL}/${sortParams}${filterParams}${queryParams}`)
    .then(res => res.json())
  }

  static getAllCategories(){
    return fetch(CATEGORY_URL)
    .then(res => res.json())
  }

  static postItem(newOutfit){
    return fetch(ITEMS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newOutfit)
    })
      .then(res => res.json())
  }

  static deleteItem(itemId){
    return fetch(`${ITEMS_URL}/${itemId}`, {
      method: "DELETE"
    })
    .then(res => res.json())
  }

  static updateItem(itemId, item){
    return fetch(`${ITEMS_URL}/${itemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
    .then(res => res.json())
  }

  static increaseTimesUsed = (id) => fetch(`${ITEMS_URL}/${id}`, {method: "PATCH"}).then(res => res.json())

  static getAllOutfits(){
    return fetch(OUTFITS_URL)
    .then(res => res.json())
  }

  static postOutfit(newOutfit){
    return fetch(OUTFITS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newOutfit)
    })
      .then(res => res.json())
  }

  static deleteOutfit(outfitId){
    return fetch(`${OUTFITS_URL}/${outfitId}`, {
      method: "DELETE"
    })
    .then(res => res.json())
  }

  static updateOutfit(outfitId, outfit){
    return fetch(`${OUTFITS_URL}/${outfitId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(outfit)
    })
    .then(res => res.json())
  }

  static increaseLikes(outfitId){
    return fetch(`${OUTFITS_URL}/${outfitId}`, {
      method: 'PATCH',
    })
    .then(res => res.json())
  }


}