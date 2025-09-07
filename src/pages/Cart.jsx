import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeFromCart, applyCoupon, removeCoupon } from "../store/slice/CartSlice";

import { Table, Button, Image, Container, Row, Col, InputGroup, Form, Card } from "react-bootstrap";
import { Check, Trash2 } from "lucide-react";
import { ArrowLeft, Cart2, Trash } from "react-bootstrap-icons";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { convertToCurrency } from "../utils/utils";

const Cart = () => {
    const dispatch = useDispatch();
    const { cartItems, totalItems, totalPrice, taxAmount, shippingCost, discountAmount, totalPayable, discountCoupon } = useSelector((state) => state.cart);
    const [couponCode, setCouponCode] = useState("");

    const handleApplyCoupon = () => {
        dispatch(applyCoupon(couponCode));
        setCouponCode("");
    };

    if (cartItems.length === 0) {
        return (
            <div className="text-center mt-5">
                <img
                    src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
                    alt="Empty Cart"
                    width="120"
                    className="mb-3"
                />
                <h3>Your cart is empty!</h3>
                <p>Add items to it now.</p>
            </div>
        );
    }

    return (
        <Container className="m-4">
            <Row>
                <Col md={9}>
                    <Card className="mb-3">
                        <Card.Header as="h5">
                            <Cart2 className="me-1" />Shopping Cart
                        </Card.Header>
                        <Card.Body className="p-0">
                            <Table bordered hover responsive className="mb-0">
                                <thead>
                                    <tr>
                                        <th>Product Details</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map(item => (
                                        <tr key={item.id}>
                                            <td>
                                                <div className="d-flex align-items-start gap-3">
                                                    <Image src={item.thumbnail} alt={item.title} width={100} height={100} rounded />
                                                    <div className="d-flex flex-column justify-content-between">
                                                        <span className="fw-semibold">{item.title}</span>
                                                        <Button size="sm" variant="outline-danger" className="mt-2 align-self-start"
                                                            onClick={() => dispatch(removeFromCart(item.id))}>
                                                            <Trash2 size={15} className="me-1" /> Remove
                                                        </Button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center gap-2">
                                                    <Button size="sm" variant="outline-secondary" onClick={() => dispatch(decreaseQuantity(item.id))}>-</Button>
                                                    <span>{item.quantity}</span>
                                                    <Button size="sm" variant="outline-secondary" onClick={() => dispatch(increaseQuantity(item.id))}>+</Button>
                                                </div>
                                            </td>
                                            <td>{convertToCurrency(item.price)}</td>
                                            <td>{convertToCurrency(item.price * item.quantity)}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan={4}>
                                            <Card.Footer className="bg-white d-flex justify-content-between align-items-center">
                                                <div className="d-flex align-items-center gap-2" role="button">
                                                    <NavLink to="/products" className="btn btn-warning text-light">
                                                        <ArrowLeft /> Continue Shopping
                                                    </NavLink>
                                                </div>

                                                <NavLink to="/checkout" className="btn btn-primary">
                                                    <Check size={20} className="me-1" />Checkout
                                                </NavLink>
                                            </Card.Footer>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={3}>
                    <Card>
                        <Card.Header as="h5" className="text-center">Order Summary</Card.Header>
                        <Card.Body>
                            <div className="mb-3">
                                <label className="form-label">Have a coupon code?</label>
                                <InputGroup>
                                    <Form.Control placeholder="Coupon code" value={couponCode} onChange={e => setCouponCode(e.target.value)} />
                                    <Button variant="outline-secondary" onClick={handleApplyCoupon}>Apply</Button>
                                </InputGroup>
                                {discountCoupon && <small className="text-success">Coupon "{discountCoupon}" applied!</small>}
                            </div>

                            <Table bordered responsive className="mb-0">
                                <tbody>
                                    <tr>
                                        <td>Total Items in cart</td>
                                        <td>{totalItems}</td>
                                    </tr>
                                    <tr>
                                        <td>Subtotal</td>
                                        <td>{convertToCurrency(totalPrice)}</td>
                                    </tr>
                                    <tr>
                                        <td>Shipping Cost</td>
                                        <td>{convertToCurrency(shippingCost)}</td>
                                    </tr>
                                    <tr>
                                        <td>Tax ({Math.round((taxAmount / totalPrice) * 100)}%)</td>
                                        <td>{convertToCurrency(taxAmount)}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Discount
                                            {discountCoupon && (
                                                <Trash
                                                    size={18}
                                                    className="ms-2 mb-1 text-danger"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => dispatch(removeCoupon())}
                                                />
                                            )}
                                            <div>
                                                <small className="text-info">
                                                    (<strong>{discountCoupon}</strong>)
                                                </small>
                                            </div>
                                        </td>
                                        <td>{convertToCurrency(discountAmount, "USD")}</td>
                                    </tr>
                                    <tr>
                                        <th>Order Total</th>
                                        <th>{convertToCurrency(totalPayable)}</th>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                        <Card.Footer className="text-center">
                            <NavLink to="/checkout" className="btn btn-primary">
                                <Check size={20} className="me-1" />Proceed to Checkout
                            </NavLink>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;
