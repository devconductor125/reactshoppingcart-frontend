import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCart,
  getCart,
  removeProductFromCart,
  makeOrder
} from "../../slices/cartSlice";

const CartPage = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handlePlus = (product) => {
    dispatch(
      addProductToCart({
        productId: product.productDetail.id,
        quantity: 1,
        productDetail: { ...product.productDetail },
      })
    );
  };

  const handleMinus = (product) => {
    if(product.quantity <= 1) {
      handleRemove(product)
      return;
    }
    dispatch(
      addProductToCart({
        productId: product.productDetail.id,
        quantity: -1,
        productDetail: { ...product.productDetail },
      })
    );
  };

  const handleRemove = (product) => {
    dispatch(
      removeProductFromCart({
        productId: product.productDetail.id,
      })
    );
  };

  useEffect(() => {
    async function getCartData() {
      const actionResult = await dispatch(getCart());
      console.log(actionResult.payload);
    }
    getCartData();
  }, [dispatch]);

  const sendOrder = async () => {
    await dispatch(makeOrder());
  }

  return (
    <div className="container mx-auto p-6">
      {cart?.products && cart?.products?.length > 0 ? (
        <>
          <h1 className="text-2xl font-bold mb-5 text-center">My Cart</h1>
          <div className="flex flex-col">
            {cart?.products?.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-4 p-4 shadow-lg rounded-lg hover:shadow-xl"
              >
                <div className="flex items-center">
                  <img
                    src={item.productDetail.url}
                    alt={item.productDetail.description}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.productDetail.description}</h2>
                    <p className="text-sm text-gray-600">
                      Price: ${item.productDetail.precio}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() => handleMinus(item)}
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() => handlePlus(item)}
                  >
                    +
                  </button>
                </div>
                <span className="font-semibold">
                  ${(item.productDetail.precio * item.quantity).toFixed(2)}
                </span>

                <button onClick={() => handleRemove(item)}> X </button>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 shadow-lg rounded-lg">
            <h2 className="text-xl font-bold">Total: ${cart.totalPrice}</h2>
          </div>
          <div className="flex justify-end w-full mt-6">
            <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-6 py-3 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={sendOrder}>Send order</button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-5 text-center">No cart</h2>
        </>
      )}
    </div>
  );
};

export default CartPage;
