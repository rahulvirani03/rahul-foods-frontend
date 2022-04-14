import axios from 'axios';
import React from 'react';
import {useState, useEffect, useContext} from 'react';

import {URL} from '../components/Constants';

export const ProductContext = React.createContext();

export function getProductsContext() {
  return useContext(ProductContext);
}
export const ProductStoreProvider = ({children}) => {
  const [products, setProducts] = useState();
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    const result = await axios.get(`${URL}/products/all-products`);
    setProducts(result.data);
  };

  const values = {products};

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};
