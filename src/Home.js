class Home {
  constructor(){
    this.renderHome()
  }

  static renderHome(){
    logo.addEventListener("click", () => {
      app.innerHTML = ""
      itemCollection.innerHTML = ""
      body.style.backgroundImage = "url(https://images.unsplash.com/photo-1521866337281-e7207a7159c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80)"
    } )
  }

}