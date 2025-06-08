import { useDispatch } from "react-redux";
import { addToCartAction, removeFromCartAction } from "../Redux/Actions/Cart";





export default function CartItem({cartItems}){
      const dispatch = useDispatch();
      const removeFromCartHandler = (id) => {
          dispatch(removeFromCartAction(id));
        };
      
        const addToCartHandler = (id, qty) => {
          dispatch(addToCartAction(id, qty));
        };
    return(
        <>
         <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {cartItems.map((product) => (
                          <li key={product.product} className="flex py-6">
                            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img alt={product.imageAlt || product.name} src={product.image} className="h-full w-full object-contain" />
                            </div>

                            <div className="ml-3 flex flex-1 flex-col">
                              <div className="flex justify-between text-sm font-medium text-gray-900">
                                <h3>
                                  <a href={product.href}>{product.name}</a>
                                </h3>
                                <p className="ml-4">${product.price}</p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-xs">
                                <p className="text-gray-500">
                                  Qty
                                  <select
                                    value={product.qty}
                                    onChange={(e) => addToCartHandler(product.product, Number(e.target.value))}
                                    className="rounded ml-2 border border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                                  >
                                    {[...Array(product.countInStock).keys()].map((x) => (
                                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                                    ))}
                                  </select>
                                </p>

                                <div className="flex">
                                  <button
                                    type="button"
                                    onClick={() => 
                                      removeFromCartHandler(product.product)
                                    }
                                    className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

        </>
    )
}