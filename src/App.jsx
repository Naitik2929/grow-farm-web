import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/navbar'
import './App.css'
import Feedbackform from './components/feedback'
import CustomerRating from './components/customerRatings'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <Navbar></Navbar> 
   <CustomerRating></CustomerRating>
   <Feedbackform></Feedbackform>
   </>
  )
}

export default App
