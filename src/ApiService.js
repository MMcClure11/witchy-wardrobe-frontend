class ApiService {

  static getAllItems(){
    return fetch(ITEMS_URL)
    .then(res => res.json())
  }
}