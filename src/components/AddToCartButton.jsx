import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../store/slice/CartSlice";

const AddToCartButton = ({ item }) => {
  const dispatch = useDispatch();

  const cartItem = useSelector((state) =>
    state.cart.cartItems.find((cart) => cart.productID === item.id)
  );

  const quantity = cartItem ? cartItem.quantity : 0;

  const handleDecrease = () => {
    if (quantity > 1) {
      dispatch(decreaseQuantity(cartItem.id));
      toast.info(`Decreased ${item.title} quantity`, {
        position: "bottom-left",
      });
    } else if (quantity === 1) {
      dispatch(removeFromCart(cartItem.id));
      toast.error(`${item.title} removed from cart`, {
        position: "bottom-left",
      });
    }
  };

  const handleIncrease = () => {
    if (quantity === 0) {
      dispatch(addToCart(item));
      toast.success(`${item.title} added to cart`, {
        position: "bottom-left",
      });
    } else {
      dispatch(increaseQuantity(cartItem.id));
      toast.success(`Increased ${item.title} quantity`, {
        position: "bottom-left",
      });
    }
  };

  return (
    <div className="d-inline-block mt-1">
      {quantity === 0 ? (
        <Button
          variant="outline-warning"
          size="md"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleIncrease();
          }}
        >
          Add to Cart
        </Button>
      ) : (
        <div className="d-flex align-items-center rounded-pill px-2 py-1 border">
          <Button
            variant=""
            className="fw-normal border-0"
            style={{ fontSize: "14px" }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDecrease();
            }}
          >
            −
          </Button>
          <span className="mx-2 fw-bold">{quantity}</span>
          <Button
            variant="light"
            className="fw-normal border-0"
            style={{ fontSize: "14px" }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleIncrease();
            }}
          >
            +
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;


// import { useDispatch, useSelector } from "react-redux";
// import { Button } from "react-bootstrap";
// import { toast } from "react-toastify";
// import {
//   addToCart,
//   increaseQuantity,
//   decreaseQuantity,
//   removeFromCart,
// } from "../store/slice/CartSlice";

// const AddToCartButton = ({ product }) => {
//   const dispatch = useDispatch();

//   const cartItem = useSelector((state) =>
//     state.cart.cartItems.find((item) => item.productID === product.id)
//   );

//   const quantity = cartItem ? cartItem.quantity : 0;

//   const handleDecrease = () => {
//     if (quantity > 1) {
//       dispatch(decreaseQuantity(cartItem.id));
//       toast.info(`Decreased ${product.title} quantity`, {
//         position: "bottom-left",
//       });
//     } else if (quantity === 1) {
//       dispatch(removeFromCart(cartItem.id));
//       toast.error(`${product.title} removed from cart`, {
//         position: "bottom-left",
//       });
//     }
//   };

//   const handleIncrease = () => {
//     if (quantity === 0) {
//       dispatch(addToCart(product));
//       toast.success(`${product.title} added to cart`, {
//         position: "bottom-left",
//       });
//     } else {
//       dispatch(increaseQuantity(cartItem.id));
//       toast.success(`Increased ${product.title} quantity`, {
//         position: "bottom-left",
//       });
//     }
//   };

//   return (
//     <div className="d-inline-block mt-1">
//       {quantity === 0 ? (
//         <Button
//           variant="outline-warning"
//           size="md"
//           onClick={(e) => {
//             e.preventDefault();
//             e.stopPropagation();
//             handleIncrease();
//           }}
//         >
//           Add to Cart
//         </Button>
//       ) : (
//         <div className="d-flex align-items-center rounded-pill px-2 py-1 border">
//           <Button
//             variant=""
//             className="fw-normal border-0"
//             style={{ fontSize: "14px" }}
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               handleDecrease();
//             }}
//           >
//             −
//           </Button>
//           <span className="mx-2 fw-bold">{quantity}</span>
//           <Button
//             variant="light"
//             className="fw-normal border-0"
//             style={{ fontSize: "14px" }}
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               handleIncrease();
//             }}
//           >
//             +
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddToCartButton;
