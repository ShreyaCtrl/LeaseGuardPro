import React, {useEffect, useState} from 'react'

const App = () => {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("/login").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, []);
  return (
    <div>
      
    </div>
  )
}

export default App