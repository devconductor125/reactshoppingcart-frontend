import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../slices/productSlice';
import { Link } from 'react-router-dom';

const ProductPage = () => {

  const {products} = useSelector(state => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getAllProducts() {
      const actionResult = await dispatch(getProducts());
      if(getProducts.fulfilled.match(actionResult)){
        console.log('Full')
      } else {
        console.log('Error')
      }
    }
    getAllProducts()
  }, [dispatch])

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);


  const pageCount = Math.ceil(products.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center my-8">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded-xl shadow-2xl hover:shadow-lg transition-shadow duration-300">
            <img src={product.doc.url} alt='product'/>
            <div className='flex justify-between'>
              <div>
                <div>{product.doc.codigo}</div>
                <div>{product.doc.description}</div>
                <div className="text-gray-900 font-bold">$ {product.doc.precio}</div>
              </div>
              <div>
                <Link to={`/product/${product.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">Detail</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        {Array.from({ length: pageCount }, (_, i) => i + 1).map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`px-4 py-2 m-1 border rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white'}`}
          >
            {number}
          </button>
        ))}
      </div>

    </div>
  );
};

export default ProductPage;