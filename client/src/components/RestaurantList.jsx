import React, { useEffect, useContext } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'
import { useNavigate } from 'react-router-dom'

import StarRating from './StarRating'

const RestaurantList = (props) => {
    const { restaurants, setRestaurants } = useContext(RestaurantsContext)
    let navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get("/")
                setRestaurants(response.data.data.restaurant)
            } catch (err) {
                console.log("hi", err)
            }
        }
        fetchData()
    }, [])

    const handleDelete = async (e, id) => {
        e.stopPropagation()
        try {
            const response = await RestaurantFinder.delete(`/${id}`)
            setRestaurants(restaurants.filter(rest => {
                return rest.id !== id
            }))
        } catch (err) {
            console.log(err)
        }

    }

    const handleUpdate = (e, id) => {
        e.stopPropagation()
        navigate(`/restaurants/${id}/update`)
    }

    const handleRestaurantSelect = (id) => navigate(`/restaurants/${id}`)

    const renderRating = (rest) => {
        if (!rest.count) {
            return <span className="text-warning">0 reviews</span>
        }
        
        return (
            <>
                <StarRating rating={rest.id} />
                <span className="text-warning ml-1">({rest.count})</span>
            </>
        )
    }

  return (
      <div className='list-group'>
          <table className="table table-hover table-dark">
              <thead>
                  <tr className="bg-primary">
                      <th scope='col'>Restaurant</th>
                      <th scope='col'>Location</th>
                      <th scope='col'>Price Range</th>
                      <th scope='col'>Ratings</th>
                      <th scope='col'>Edit</th>
                      <th scope='col'>Delete</th>
                  </tr>
              </thead>
              <tbody>
                  {restaurants && restaurants.map(rest => {
                      return (
                          <tr
                              onClick={() => handleRestaurantSelect(rest.id)}
                              key={rest.id}
                          >
                            <td>{rest.name}</td>
                            <td>{rest.location}</td>
                            <td>{"$".repeat(rest.price_range)}</td>
                            <td>{renderRating(rest)}</td>
                            <td>
                                <button
                                    onClick={(e) => handleUpdate(e, rest.id)}
                                    className="btn btn-warning"
                                >
                                    Update
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={(e) => handleDelete(e, rest.id)}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                          
                      )
                  })}
              </tbody>
          </table>
        
      </div>
  )
}

export default RestaurantList