import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useEffect, useState } from "react";

const Breadcrumbs = () => {
  const location = useLocation();
  const { category, id } = useParams();
  const [productName, setProductName] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProductName(data.title))
        .catch(() => setProductName(""));
    }
  }, [id]);

  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="py-2">
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          <FaHome color="black" />
        </Breadcrumb.Item>

        {location.pathname === "/cart" && (
          <Breadcrumb.Item active>Cart</Breadcrumb.Item>
        )}

        {location.pathname === "/wishlist" && (
          <Breadcrumb.Item active>Wishlist</Breadcrumb.Item>
        )}

        {location.pathname === "/checkout" && (
          <Breadcrumb.Item active>Checkout</Breadcrumb.Item>
        )}

        {location.pathname === "/compare" && (
          <Breadcrumb.Item active>Compare</Breadcrumb.Item>
        )}

        {pathnames[0] === "products" && (
          <>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/products" }}>
              Products
            </Breadcrumb.Item>

            {category && !id && (
              <Breadcrumb.Item active>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Breadcrumb.Item>
            )}

            {category && id && (
              <>
                <Breadcrumb.Item
                  linkAs={Link}
                  linkProps={{ to: `/products/${category}` }}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                  {productName || "Loading..."}
                </Breadcrumb.Item>
              </>
            )}
          </>
        )}
      </Breadcrumb>
    </div>
  );
};

export default Breadcrumbs;
