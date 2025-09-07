import React from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import Header from '../components/header/Header';
import { Outlet } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumb';

const RootLayout = () => {
  return (
    <Container>
      <Header />
      <Breadcrumbs />
      <Row>
        <Col>
          <Outlet />
        </Col>
      </Row>
    </Container>
  )
}

export default RootLayout;
