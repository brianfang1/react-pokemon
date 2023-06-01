import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import Pagination from "./Pagination";
import axios from 'axios'
import './App.css'

function App() {

  const baseUrl = "https://pokeapi.co/api/v2/pokemon/"
  const [pokemon, setPokemon] = useState([])
  const [pokemonData, setPokemonData] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)


  // We put this into a useEffect so that we render it once when the application starts and render it everytime "currentPageUrl" changes. We're going to use currentPageUrl for pagination so it makes sense to re-render everytime we change pages
  useEffect(() => {
    /* 
      Axios.get will perform a get request to the specified URL. The ".then()" afterwards is to capture the promise that gets returned. This is because this is an asynchronous call and it "promises" to return once it grabs the data from the api. "res" is the response from api and "res" has a property called "data" that holds the data from the api request, hence res.data
    */
    async function getAllPokemon() {
      let cancel
      const res = await axios.get(currentPageUrl, {
        cancelToken: new axios.CancelToken(c => cancel = c)
      })
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))

      let newPokemonData = []
      await Promise.all(
        res.data.results.map( async (pokemon) => {
        await axios.get(baseUrl + pokemon.name)
        .then(res => {
          newPokemonData.push(res.data)
        }).finally(setPokemonData(newPokemonData))
      }))
      setLoading(false)
      // This will cancel the above axios fetch request if it doesn't finish by the time useEffect() gets called again. Prevents race conditions
      return () => cancel()
    }

    setLoading(true)
    getAllPokemon()
  }, [currentPageUrl])

  

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }


  if (loading) return "Loading..."


  return ( 
    <div>
      <div className="mainApp">
        <PokemonList pokemon={pokemon} pokemonData={pokemonData} />
      </div>
      <Pagination 
      goToNextPage={nextPageUrl ? goToNextPage : null } 
      goToPrevPage={prevPageUrl ? goToPrevPage : null } />
    </div>
    
    )
}

export default App;
