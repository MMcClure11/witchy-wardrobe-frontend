const BASE_URL = 'http://localhost:3000';

fetch(`${BASE_URL}/items`)
  .then(res => res.json())
  .then( items => console.log(items))

