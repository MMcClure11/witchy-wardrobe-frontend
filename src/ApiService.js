class ApiService {

  static getAllItems(){
    return fetch(ITEMS_URL)
    .then(res => res.json())
  }

  static getAllCategories(){
    return fetch(CATEGORY_URL)
    .then(res => res.json())
  }
}