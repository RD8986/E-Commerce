import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const CategoryList = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get('https://dummyjson.com/products/categories')
      setCategories(response.data)
    }
    getCategories()
  }, [])

  return (
    <ListGroup>
      {categories.map((item, index) => (
        <NavLink 
          to={`/products/${item.slug}`} 
          key={index} 
          className="text-decoration-none"
        >
          <ListGroupItem>{item.name}</ListGroupItem>
        </NavLink>
      ))}
    </ListGroup>
  )
}

export default CategoryList
