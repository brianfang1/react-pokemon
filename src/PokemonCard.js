import React from 'react'
import './App.css'

export default function PokemonCard({pokemonData}) {
  return (
    <div className="pokemon-container">
      <div style={{"margin": "auto"}}>#{pokemonData["id"]} {pokemonData["name"]}</div>
      <img src={pokemonData["sprites"]["front_default"]}></img>
    </div>
    
  )
}
