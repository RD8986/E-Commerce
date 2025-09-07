import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Button, Spinner, Badge } from "react-bootstrap";
import { convertToCurrency } from "../utils/utils";
import AddToCartButton from "../components/AddToCartButton";
import AddToWishlistButton from "../components/AddToWishlistButton";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`https://dummyjson.com/products/${id}`);
                setProduct(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product details:", error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p>Loading Product Details...</p>
            </Container>
        );
    }

    if (!product) {
        return (
            <Container className="text-center mt-5">
                <h4>Product Not Found</h4>
                <Link to="/products">
                    <Button variant="secondary">Back to Products</Button>
                </Link>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <Row className="align-items-center">
                {/* Left Side - Product Image */}
                <Col md={6} className="text-center">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="img-fluid rounded shadow"
                        style={{ maxHeight: "400px", objectFit: "cover" }}
                    />
                </Col>

                {/* Right Side - Product Details */}
                <Col md={6}>
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>

                    <h4 className="text-success">{convertToCurrency(product.price)}</h4>
                    <p>
                        <strong>Brand:</strong> {product.brand}
                    </p>
                    <p>
                        <strong>Category:</strong>{" "}
                        <Badge bg="info" text="dark">{product.category}</Badge>
                    </p>
                    <p>
                        <strong>Rating:</strong> ⭐ {product.rating}
                    </p>
                    <p>
                        <strong>Stock:</strong> {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </p>

                    <div className="d-flex gap-3 mt-3">
                        <AddToCartButton item={product} />
                        <AddToWishlistButton item={product} />
                    </div>

                    <Link to="/products">
                        <Button variant="secondary" className="mt-3">
                            Back to Products
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetails;
