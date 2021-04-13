document.addEventListener('DOMContentLoaded', function(){
  const state = {
    pokemons: []
  }
  const pokemons = document.querySelector('ul.pokemons')

  function fetchPokemons(){
    fetch('https://pokeapi.co/api/v2/pokemon/', {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(data){ return data.json()})
      .then(function(pokemons){
      state.pokemons = pokemons.results
      renderPokemons()
    })
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