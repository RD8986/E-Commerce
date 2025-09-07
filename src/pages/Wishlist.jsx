import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Image, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { RemoveItemFromWishlist } from "../store/slice/WishListSlice";
import { NavLink } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";
import { Basket } from "react-bootstrap-icons";
import { addToCart } from "../store/slice/CartSlice";
import { convertToCurrency } from "../utils/utils";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const handleRemove = (id, title) => {
    dispatch(RemoveItemFromWishlist(id));
    toast.info(`${title} removed from wishlist`);
  };

  const handleMoveToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(RemoveItemFromWishlist(product.id));
    toast.success(`${product.title} moved to Cart`);
  };

  return (
    <Container className="py-5">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="fw-bold text-dark d-flex align-items-center">
          <Heart size={28} className="text-black me-2" />
          My Wishlist
        </h2>
        <span className="badge bg-dark fs-6">{wishlistItems.length} items</span>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center text-muted py-5">
          <Heart size={50} className="mb-3 text-black" />
          <h5>Your wishlist is empty!</h5>
          <p>Start exploring and add your favorite products.</p>
        </div>
      ) : (
        <Table striped bordered hover responsive className="align-middle shadow-sm rounded">
          <thead className="table-dark">
            <tr>
              <th style={{ width: "5%" }}>#</th>
              <th style={{ width: "15%" }}>Preview</th>
              <th>Product</th>
              <th style={{ width: "15%" }}>Price</th>
              <th style={{ width: "15%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {wishlistItems.map((product, index) => (
              <tr key={product.id}>
                <td className="fw-semibold">{index + 1}</td>
                <td>
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    rounded
                    className="shadow-sm"
                    style={{
                      width: "65px",
                      height: "65px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>
                  <NavLink
                    to={`/products/${product.productID}`}
                    className="text-decoration-none fw-semibold text-dark"
                  >
                    {product.title}
                  </NavLink>
                </td>
                <td className="fw-bold text-success">
                  {convertToCurrency(product.price)}
                </td>
                <td className="text-center">
                  <Button
                    size="sm"
                    className="me-4"
                    variant="outline-danger"
                    onClick={() => handleRemove(product.id, product.title)}
                  >
                    <Trash2 size={15} className="me-1" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-info"
                    onClick={() => handleMoveToCart(product)}
                  >
                    <Basket size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Wishlist;
