import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addItemToWishlist } from "../store/slice/WishListSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const AddToWishlistButton = ({ item }) => {
    const dispatch = useDispatch();
    const { wishlistItems } = useSelector((state) => state.wishlist);

    const found = wishlistItems.some((wishlistItem) => wishlistItem.productID === item.id);

    const handleAddToWishlist = () => {
        if (found) {
            toast.error(
                `${item.title} has already been added to the wishlist`,
                { position: "bottom-left" }
            );
        } else {
            dispatch(addItemToWishlist(item));
            toast.success(
                `${item.title} has been added to the wishlist`,
                { position: "bottom-left" }
            );
        }
    };

    return (
        <Button
            size="sm"
            variant=""
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToWishlist();
            }}
        >
            {found ? (
                <FaHeart size={26} color="red" />
            ) : (
                <FaRegHeart size={30} />
            )}
        </Button>
    );
};

export default AddToWishlistButton;
