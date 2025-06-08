
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productListAction } from "../Redux/Actions/Product";
import { Link } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const productListReducer = useSelector((state) => state.productListReducer);
  const { loading, error, products, page, totalPages } = productListReducer;
  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <h1>loading</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div className="bg-white p-4 rounded shadow" key={product._id}>
                  <div className="group relative">
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-60 w-full object-cover object-center"
                      />
                    </div>
                    <div className="mt-4 flex justify-between items-start">
                      <div>
                        <h3 className="text-sm text-gray-700 font-semibold">
                          <Link to={`/products/${product._id}`}>
                            {product.name}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Review Count: {product.numReview}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        </>
      )}
    </div>
  );
};
export default Products;