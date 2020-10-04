class Home {
  constructor(){
    this.renderHome()
  }

  static renderHome(){
    logo.addEventListener("click", () => {
      app.innerHTML = ""
      itemCollection.innerHTML = ""
      body.style.backgroundImage = "url(https://images.unsplash.com/photo-1521866337281-e7207a7159c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80)"
      Home.renderInfo();
    } )
  }

  static renderInfo(){
    const infoDiv = document.createElement('div')
    infoDiv.className = 'info-div'
    infoDiv.innerHTML = `
    <ul id="info-tab" class="nav nav-tabs card-header-tabs">
        <li class="nav-item">
            <a href="#home" class="nav-link active" >Home</a>
        </li>
        <li class="nav-item">
            <a href="#profile" class="nav-link">Profile</a>
        </li>
        <li class="nav-item">
            <a href="#messages" class="nav-link">Messages</a>
        </li>
    </ul>
    <div class="tab-content">
        <div class="tab-pane fade show active" id="home">
            <h4 class="mt-2">Home tab content</h4>
            <p>Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui. Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth.</p>
        </div>
        <div class="tab-pane fade" id="profile">
            <h4 class="mt-2">Profile tab content</h4>
            <p>Vestibulum nec erat eu nulla rhoncus fringilla ut non neque. Vivamus nibh urna, ornare id gravida ut, mollis a magna. Aliquam porttitor condimentum nisi, eu viverra ipsum porta ut. Nam hendrerit bibendum turpis, sed molestie mi fermentum id. Aenean volutpat velit sem. Sed consequat ante in rutrum convallis. Nunc facilisis leo at faucibus adipiscing.</p>
        </div>
        <div class="tab-pane fade" id="messages">
            <h4 class="mt-2">Messages tab content</h4>
            <p>Donec vel placerat quam, ut euismod risus. Sed a mi suscipit, elementum sem a, hendrerit velit. Donec at erat magna. Sed dignissim orci nec eleifend egestas. Donec eget mi consequat massa vestibulum laoreet. Mauris et ultrices nulla, malesuada volutpat ante. Fusce ut orci lorem. Donec molestie libero in tempus imperdiet. Cum sociis natoque penatibus et magnis.</p>
        </div>
    </div>`
$(document).ready(function(){ 
  $("#info-tab a").click(function(e){
      e.preventDefault();
      $(this).tab('show');
  });
});
app.appendChild(infoDiv)
  }

}