import { useState, useEffect } from 'react'
import './App.css'

const API_KEY = import.meta.env.VITE_NASA_API_KEY

function App() {

  const [nasaData, setNasaData] = useState(null)
  const [banList, setBanList] = useState([])

  useEffect(() => {
    async function fetchNasaData() {
      const res = await fetch(`https://api.nasa.gov/planetary/apod?count=10&api_key=${API_KEY}`)
      const data = await res.json()
      setNasaData(data)
      console.log(data)
    }
    fetchNasaData().catch(console.error)
  },[])

  /*
    <ul>
      {nasaData && Object.entries(nasaData).map((d, i) => (
          <img key={i} src={d[1].hdurl} />
      ))}
    </ul>
  */

  const getNewImage = async () => {
    const res = await fetch(`https://api.nasa.gov/planetary/apod?count=1&api_key=${API_KEY}`)
    const data = await res.json()
    setNasaData(data)
  }

  return (
    <>
      <h1>NASA APOD</h1>

      <div className='thing-holder'>

        {nasaData 
        ? 
        <div className='thing-holder'>
          <h2>{nasaData[0].date}</h2>
          <img src={nasaData[0].hdurl} />
        </div>
        : <></>
        }

        <button onClick={getNewImage}>Get New Image</button>
      </div>
      
    </>
  )
}

export default App
