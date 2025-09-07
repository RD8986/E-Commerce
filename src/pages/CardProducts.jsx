import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton";
import AddToWishlistButton from "../components/AddToWishlistButton";
import { convertToCurrency } from "../utils/utils";

const CardProducts = ({ item }) => {
    if (!item) return null;

    const { id, title, price, thumbnail } = item;

    return (
        <Card className="h-100 shadow-sm border-0">
            {/* Make the image clickable */}
            <Link to={`/products/details/${id}`}>
                <Card.Img
                    variant="top"
                    src={thumbnail}
                    alt={title}
                    style={{ height: "250px", objectFit: "cover" }}
                />
            </Link>

            <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                    {/* Make the title clickable */}
                    <Card.Title className="text-truncate" title={title}>
                        <Link
                            to={`/products/details/${id}`}
                            className="text-decoration-none text-dark"
                        >
                            {title}
                        </Link>
                    </Card.Title>
                    <Card.Text className="fw-bold text-success">
                        {convertToCurrency(price)}
                    </Card.Text>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-2">
                    <AddToCartButton item={item} />
                    <AddToWishlistButton item={item} />
                </div>
            </Card.Body>
        </Card>
    );
};

export default CardProducts;

