class ApiService {

  static getAllItems(){
    return fetch(ITEMS_URL)
    .then(res => res.json())
  }

  static getAllCategories(){
    return fetch(CATEGORY_URL)
    .then(res => res.json())
  }

  static postItem(newItem){
    return fetch(ITEMS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newItem)
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw Error("Bad Request")
        }
      })
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
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw Error("Bad Request")
      }
    })
  }
}