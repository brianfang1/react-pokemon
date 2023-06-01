import React from 'react'
import PokemonCard from './PokemonCard'
import './App.css'

export default function PokemonList({ pokemon, pokemonData }) {
  return (
    <div className="pokemonList">
        { pokemonData.map(p => (
            <PokemonCard key={p["name"]} pokemonData={p}/>
        )) }
    </div>
  )
}
