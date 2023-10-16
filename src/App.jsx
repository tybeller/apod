import { useState, useEffect } from 'react'
import './App.css'

const API_KEY = import.meta.env.VITE_CAT_API_KEY

function App() {

  const [nasaData, setNasaData] = useState(null)
  const [banList, setBanList] = useState(
    {
      breeds: [],
      origin: [],
      weight: [],
    }
  )

  /*useEffect(() => {
    async function fetchNasaData() {
      const res = await fetch(`https://api.nasa.gov/planetary/apod?count=10&api_key=${API_KEY}`)
      const data = await res.json()
      setNasaData(data)
      console.log(data)
    }
    fetchNasaData().catch(console.error)
  },[])*/

  /*
    <ul>
      {nasaData && Object.entries(nasaData).map((d, i) => (
          <img key={i} src={d[1].hdurl} />
      ))}
    </ul>
  */

  const getNewImage = async () => {
    const res = await fetch(`https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1&api_key=${API_KEY}`)
    const data = await res.json()
    setNasaData(data)
  }

  const banBreedName = (breedName) => {
    setBanList({
      ...banList,
      breeds: [...banList.breeds, breedName]
    })
  }

  const banOrigin = (origin) => {
    setBanList({
      ...banList,
      origin: [...banList.origin, origin]
    })
  }
  
  const banWeight = (weight) => {
    setBanList({
      ...banList,
      weight: [...banList.weight, weight]
    })
  }

  return (
    <>
      <h1>NASA APOD</h1>

      <div className='thing-holder'>

        {nasaData 
        ? 
        <div className='thing-holder'>
          <div className='attr-holder'>
            <button>{nasaData[0].breeds[0].name}</button>
            <button>{nasaData[0].breeds[0].origin}</button>
            <button>{nasaData[0].breeds[0].weight.imperial} lbs</button>    
          </div>
          <img className='apod-image' src={nasaData[0].url} />
        </div>
        : <></>
        }

        <button onClick={getNewImage}>Get New Image</button>
      </div>
      
      <div>
        banList: {JSON.stringify(banList)}
      </div>
    </>
  )
}

export default App
