document.addEventListener('DOMContentLoaded', function(){
  const state = {
    pokemons: [],
    offset: 0
  }
  const pokemons = document.querySelector('ul.pokemons')

  document.addEventListener('click', function(e){
    if (e.target.matches('[href="#"]')){
      e.preventDefault()
    }

    if (e.target.matches('.more-pokemons')){
      fetchPokemons()
    }
  })

  function fetchPokemons(){
    fetch('https://pokeapi.co/api/v2/pokemon/' + `?offset=${state.offset}`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(data){ return data.json()})
      .then(function(pokemons){addPokemons(pokemons.results)})
      .then(function(){ state.offset += 20})
    }

  function addPokemons(pokemons){
    state.pokemons = [...state.pokemons,...pokemons] //Los tres puntos rompen el array existente y los ponen en uno nuevo.
    renderPokemons()
  }

  function renderPokemons(){
    state.pokemons.map(function(poke){
      const li = document.createElement('li')
      li.className = 'list-group-item'

      const link = document.createElement('a')
      link.className = 'pokemon-detail d-flex justify-content-between align-items-center'
      link.href = poke.url 

      const text = document.createTextNode(poke.name)

      const span = document.createElement('span')
      span.className = 'badge badge-primary badge-pill'
      span.innerText = '›'

      link.appendChild(text)
      link.appendChild(span)
      li.appendChild(link)
      
      pokemons.appendChild(li)
    })
  }

  fetchPokemons()

})