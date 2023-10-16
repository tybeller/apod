import { useState, useEffect } from 'react'
import './App.css'

const API_KEY = import.meta.env.VITE_CAT_API_KEY

function App() {

  const [nasaData, setNasaData] = useState(null)
  const [banList, setBanList] = useState([])

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

    if (banList.includes(data[0].breeds[0].name) || banList.includes(data[0].breeds[0].origin) || banList.includes(data[0].breeds[0].weight.imperial)) {
      getNewImage()
      return
    }
    setNasaData(data)
    console.log(data)
  }

  const banItem = (item) => {
    if (!banList.includes(item)) {
      setBanList([...banList, item])
    }
  }

  const unbanItem = (item) => {
    setBanList(banList.filter((d) => d !== item))
  }

  return (
    <>
      <h1>NASA APOD</h1>

      <div className='thing-holder'>

        {nasaData 
        ? 
          <div className='thing-holder'>
            <div className='attr-holder'>
              <button onClick={() => banItem(nasaData[0].breeds[0].name)}>{nasaData[0].breeds[0].name}</button>
              <button onClick={() => banItem(nasaData[0].breeds[0].origin)}>{nasaData[0].breeds[0].origin}</button>
              <button onClick={() => banItem(nasaData[0].breeds[0].weight.imperial)}>{nasaData[0].breeds[0].weight.imperial} lbs</button>    
            </div>
            <img className='apod-image' src={nasaData[0].url} />
          </div>
        : <></>
        }

        <button onClick={getNewImage}>Get New Image</button>

        <div className='thing-holder ban'>
          <h2>Ban List</h2>
          <div className='attr-holder'>
            {Object.entries(banList).map((d, i) => (
                <button key={i} onClick={() => unbanItem(d[1])}>
                  {d[1]}
                </button>
            ))}
          </div>
        </div>
      </div>

      
    </>
  )
}

export default App
