import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProduct } from '../../slices/productSlice';
import { useParams } from 'react-router-dom';
import { addProductToCart } from '../../slices/cartSlice';

const ProductDetail = () => {
  const {productId} = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState();
  
  useEffect(() => {
    async function getProductById() {
      const actionResult = await dispatch(getProduct({productId}));
      if(getProduct.fulfilled.match(actionResult)){
        console.log('Full', actionResult)
        setProduct(actionResult?.payload?.product ?? {});
      } else {
        console.log('Error')
      }
    }
    getProductById()
  }, [dispatch, productId])

  const [quantity, setQuantity] = useState(1);

  const handleCart = () => {
    console.log({
      productId: product.id,
      quantity: parseInt(quantity, 10),
      productDetail: {...product}
    })
    dispatch(addProductToCart({
      productId: product.id,
      quantity: parseInt(quantity, 10),
      productDetail: {...product}
    }));
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="flex flex-wrap md:flex-nowrap items-center">
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-4">
          <img
            src={product.url}
            alt={product.description}
            className="w-full object-cover"
          />
        </div>

        <div className="w-full text-center md:text-left md:w-1/2 lg:w-1/2 xl:w-1/2 p-4 ml-6">
          <h2 className="text-2xl font-bold mb-2">{product.description}</h2>
          <p className="text-lg font-semibold mb-4">${product.precio}</p>
          <p className="text-sm font-semibold mb-4">{product.codigo}</p>

          <div className="block md:flex items-center space-x-2 mb-4">
            <label htmlFor="quantity" className="text-lg">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border-2 border-gray-300 rounded-md p-2"
            />
          </div>

          <button
            onClick={handleCart}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;