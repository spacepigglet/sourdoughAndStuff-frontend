class MyHeader extends HTMLElement {
  connectedCallback(){
    this.innerHTML =
    `
    <h1>
          <a href="index.html">
            <img src="/sourdoughAndStuff/assets/img/top left logo design/png/logo-no-background.png" alt="Sourdough & stuff - some sourdough but mostly stuff" />
          </a>
        </h1>

        <nav>
          <ul>
            <li><a href="assets/html/recipeIndex.html">Recipes</a></li>
            <li><a href="assets/html/tips.html">Tips</a></li>
            <li><a href="assets/html/order.html">Order</a></li>
            <li><a href="assets/html/about.html">About</a></li>
          </ul>
        </nav>
        `
  }
}
customElements.define('my-header', MyHeader)