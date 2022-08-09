import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { RestaurantsContextProvider } from './context/RestaurantsContext'

import Home from './routes/Home'
import RestaurantDetails from './routes/RestaurantDetails'
import Update from './routes/Update'

const App = () => {
    return (
        <RestaurantsContextProvider>
            <div className='container'>
                <Router>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/restaurants/:id/update' element={<Update />} />
                        <Route path='/restaurants/:id' element={<RestaurantDetails />} />
                    </Routes>
                </Router>
            </div>
        </RestaurantsContextProvider>
    )
}

export default App