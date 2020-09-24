console.log("hello from index.js")
const BASE_URL = 'http://localhost:3000';
const ITEMS_URL = `${BASE_URL}/items`;
const body = document.querySelector('body')
const app = document.createElement('div')
const itemsBtn = document.querySelector("#items-btn")
console.log(itemsBtn)



fetch(`${BASE_URL}/items`)
  .then(res => res.json())
  .then( items => console.log(items))

