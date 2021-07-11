import React, { useEffect, useState } from 'react';
import Product from '../components/Product'
import axios from 'axios';


export default function HomeScreen(){
  const [products, setProducts] = useState([]);
  const [loading, setLoading ] = useState(false);
  const [error, setError] = useState(false);


  useEffect(() =>{
    const fecthData = async () => {
      try{
        setLoading(false);
        const { data } = await axios.get('/api/products');
        setLoading(false)
        setProducts(data);

      }catch(error){
        setError(error.message);
        setLoading(false)

      }
    };
    fecthData();

  },[])

  return (
    <div>

        <div className="row center">
      {

        data.products.map(product =>(
          <Product key={product._id} product={product} onAdd={onAdd}></Product>
        ))
      }

    </div>
    </div>
    
  );
}