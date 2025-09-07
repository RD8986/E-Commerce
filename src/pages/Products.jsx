import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import CardProducts from './CardProducts'

const Products = () => {
  const [products, setProducts] = useState([])
  const { category } = useParams()

  useEffect(() => {
    const getProducts = async () => {
      if (category) {
        const result = await axios.get(`https://dummyjson.com/products/category/${category}`)
        setProducts(result.data.products)
      } else {
        const result = await axios.get('https://dummyjson.com/products?limit=133')
        setProducts(result.data.products)
      }
    }
    getProducts()
  }, [category])

  return (
    <Row>
      {products.map((item, index) => (
        <Col key={index} lg="4" md="6">
          <CardProducts item={item} />
        </Col>
      ))}
    </Row>
  )
}

export default Products

