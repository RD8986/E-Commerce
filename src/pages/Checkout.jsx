import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../store/slice/CartSlice";
import { Table, Button, Image, Container, Row, Col, Card } from "react-bootstrap";
import { Trash2 } from "lucide-react";
import { ArrowLeft, Cart2 } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";
import { convertToCurrency } from "../utils/utils";

const Checkout = () => {
    const dispatch = useDispatch();
    const { cartItems, totalItems, totalPrice, taxAmount, shippingCost, discountAmount, totalPayable } = useSelector((state) => state.cart);

    if (cartItems.length === 0) {
        return (
            <div className="text-center mt-5">
                <h3>Your Checkout is empty!</h3>
            </div>
        );
    }

    return (
        <Container className="m-4">
            <Row>
                <Col md={9}>
                    <Card className="mb-3">
                        <Card.Header as="h5">
                            <Cart2 className="me-1" />Checkout
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
                                                        <Button
                                                            size="sm"
                                                            variant="outline-danger"
                                                            className="mt-2 align-self-start"
                                                            onClick={() => dispatch(removeFromCart(item.id))}
                                                        >
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
                                                <NavLink to="/cart" className="btn btn-warning text-light">
                                                    <ArrowLeft /> Continue Cart
                                                </NavLink>
                                                <Button variant="primary">Place Order</Button>
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
                                        <td>Discount</td>
                                        <td>{convertToCurrency(discountAmount, "USD")}</td>
                                    </tr>
                                    <tr>
                                        <th>Order Total</th>
                                        <th>{convertToCurrency(totalPayable)}</th>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Checkout;
