import React from "react";
import CategoryList from "../pages/CategoryList";
import { Outlet } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Breadcrumbs from "../components/Breadcrumb";

const ProductsLayout = () => {
  return (
    <Container>
      <Row>
        <Col md={3}>
          <CategoryList />
        </Col>
        <Col md={9}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsLayout;



// import React from 'react'
// import CategoryList from '../pages/CategoryList'
// import Products from '../pages/Products'
// import { Outlet } from 'react-router-dom'
// import { Breadcrumb, Col, Container, Row } from 'react-bootstrap'

// const ProductsLayout = () => {
//   return (
//     <Container>
//       <Breadcrumb/>
//         <Row>
//             <Col md={3}>
//             <CategoryList/>
//             </Col>
//             <Col md={9}>
//            <Outlet/>
//             </Col>
//         </Row>
//     </Container>
//   )
// }

// export default ProductsLayout