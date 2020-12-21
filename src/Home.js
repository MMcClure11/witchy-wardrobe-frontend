class Home {
  constructor(){
    this.renderHome()
  }

  static renderHome(){
    logo.addEventListener("click", () => {
      app.innerHTML = "";
      itemCollection.innerHTML = "";
      btnsDiv.innerHTML = "";
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
            <a href="#home" class="nav-link active" >About</a>
        </li>
        <li class="nav-item">
            <a href="#profile" class="nav-link">Project 333</a>
        </li>
        <li class="nav-item">
            <a href="#messages" class="nav-link">4x4 Capsule</a>
        </li>
        <li class="nav-item">
        <a href="#joy" class="nav-link">Joy</a>
    </li>
    </ul>
    <div class="tab-content">
        <div class="tab-pane fade show active" id="home">
            <h4 class="mt-2">Using Witchy Wardrobe</h4>
            <p> The fashion  industry produces 10% of all humanity's carbon emissions, is the second-largest consumer of the world's water supply, and pollutes the oceans with microplastics.</p>
            <p> There are many ways you can reduce your personal impact including: </p>
            <ul>
              <li>Buy used clothing</li>
              <li>Minimize how much clothing you buy and throw away each year</li>
              <li>Shop locally</li>
              <li>Find sustainable and ethical clothing brands</li>
            </ul>
            <p>You can use Witchy Wardrobe to help you keep track of your wardrobe! Check out the other tabs for ideas for helping you minimize your wardrobe.</p>
        </div>
        <div class="tab-pane fade" id="profile">
            <h4 class="mt-2">Project 333</h4>
            <p>The premise: Wear just 33 items for 3 months and find the joy you miss out on when you spend too much time worrying about what to wear.</p>
            <p>Check out <a class="links" href="https://bemorewithless.com/">Courtney Carver's website</a> to learn more about how to get started.</p>
            </div>
        <div class="tab-pane fade" id="messages">
            <h4 class="mt-2">Create a Capsule Wardrobe</h4>
            <p>Try using themed colors throughout your entire wardrobe so you can pair down to just 16 or fewer pieces of clothing. </p>
            <p>The mix and max nature of this type of clothing setup makes it ideal for creating a minimalist wardrobe or when preparing to travel.</p>
            <p>Check out the <a class="links" href="https://www.theviviennefiles.com/four-by-four-wardrobes/">Vivienne Files</a> to learn more about the capsule wardrobe and get great ideas for color schemes.</p>    
        </div>
        <div class="tab-pane fade" id="profile">
          <h4 class="mt-2">Joy</h4>
          <p>The premise: Wear just 33 items for 3 months and find the joy you miss out on when you spend too much time worrying about what to wear.</p>
          <p>Check out <a class="links" href="https://bemorewithless.com/">Courtney Carver's website</a> to learn more about how to get started.</p>
        </div>
        <div class="tab-pane fade" id="joy">
            <h4 class="mt-2">Spark Joy</h4>
            <p>Do your clothes bring you joy? </p>
            <p>You probably have some items that you love and wear very often, and others that rarely see the light of day but you can't seem to get rid of them "just in case".</p>
            <p>Check out Mari Kondo's <a class="links" href="https://konmari.com/">official website</a> to learn more about her method of tidying up.</p>
            <p>For a quick look at just doing your closet in this way, have a look at this <a class="links" href="https://makinglemonadeblog.com/10-steps-decluttering-your-closet-clothing-konmari-method/">making lemonade blog</a>.</p>    
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