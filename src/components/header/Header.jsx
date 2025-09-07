import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { BsBasket, BsBasket2, BsBasket2Fill, BsHeart, BsHeartFill } from 'react-icons/bs'
import { IoIosGitCompare } from 'react-icons/io'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <Navbar expand="lg" className="py-3">
      <Container className="d-flex align-items-center justify-content-between">
        <Navbar.Brand as={NavLink} className="fw-bold fs-4" to="/">
          Indi<span className="text-primary">Tronix</span>
        </Navbar.Brand>

        <NavLink to="/products" className="text-decoration-none text-dark">
             Browse Products by Categories
          </NavLink>

        <div className="d-flex align-items-center gap-3">
          <NavLink to="/compare" className="text-decoration-none text-dark">
            <IoIosGitCompare/> Compare
          </NavLink>
          <NavLink to="/wishlist" className="text-decoration-none text-dark">
            <BsHeart /> Wishlist
          </NavLink>
          <NavLink to="/cart" className="text-decoration-none text-dark">
           <BsBasket2Fill/> Cart
          </NavLink>
        </div>
      </Container>
    </Navbar>
  )
}

export default Header
