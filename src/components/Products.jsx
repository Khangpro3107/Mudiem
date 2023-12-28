import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import products from "../data/products.json";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils";

const Products = () => {
  const [data, setData] = useState([]);
  const [filtering, setFiltering] = useState(data);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const filterOptions = [
    {
      text: "All",
      filter: "all",
    },
    {
      text: "Beach",
      filter: "beach",
    },
    {
      text: "Hiking",
      filter: "hiking",
    },
    {
      text: "Cold",
      filter: "cold",
    },
    {
      text: "Accessories",
      filter: "accessories",
    },
  ];
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProducts = () => {
      setLoading(true);
      if (componentMounted) {
        setTimeout(() => {
          setData(products.products);
          setFiltering(products.products);
          setLoading(false);
        }, 500);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const filteringProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFiltering(updatedList);
  };
  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          {filterOptions.map((option) => (
            <button
              className={
                "btn btn-sm m-2 " +
                (selectedCategory === option.filter
                  ? "btn-primary"
                  : "btn-outline-primary")
              }
              onClick={() => {
                if (option.filter === "all") setFiltering(data);
                else filteringProduct(option.filter);
                setSelectedCategory(option.filter);
              }}
              key={option.filter}
            >
              {option.text}
            </button>
          ))}
        </div>
        {filtering.map((product) => {
          return (
            <div
              id={product.id}
              key={product.id}
              className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
            >
              <div className="card text-center h-100" key={product.id}>
                <Link
                  to={"/product/" + product.id}
                  className="text-decoration-none text-dark"
                >
                  <img
                    className="card-img-top p-3 object-fit-fill"
                    src={product.image}
                    alt="Card"
                    height={400}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">
                      {product.description.substring(0, 90)}...
                    </p>
                  </div>
                </Link>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">
                    {formatPrice(product.price)}đ
                  </li>
                </ul>
                <div className="card-body">
                  <Link
                    to={"/product/" + product.id}
                    className="btn btn-primary m-1"
                  >
                    <i className="fa fa-info-circle"></i> View
                  </Link>
                  <button
                    className="btn btn-primary-2 m-1"
                    onClick={() => addProduct(product)}
                  >
                    <i className="fa fa-plus-circle"></i> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
