import React, { lazy, Suspense, useEffect, useState } from 'react'
import axios from '../api/axiosconfig'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'
import { loadlazyproduct } from '../store/reducers/productSlice'
import LoadingSkeleton from './LoadingSkeleton'
const ProductTemplate = lazy(() => import('../components/ProductTemplate'))

const Products = () => {
  const products = useSelector((state) => state.productReducer.products)
  const dispatch = useDispatch()
  const [hasMore, sethasMore] = useState(true)
  const [offset, setOffset] = useState(0);
  const fetchProducts = async () => {

    try {
      const LIMIT = 6
      const { data } = await axios.get(`/products?_limit=${LIMIT}&_start=${offset}`)

      if (data.length === 0) {
      sethasMore(false);
    } else {

      const existingIds = new Set(products.map(p => p.id));
      const uniqueData = data.filter(p => !existingIds.has(p.id));

      if (uniqueData.length === 0) {
        sethasMore(false);
        return;
      }

      
        setOffset((prev) => prev + LIMIT);
        dispatch(loadlazyproduct(uniqueData))

      }
    } catch (error) {
      console.log(error)
    }
  }    

  useEffect(() => {
    fetchProducts()
  }, [])



  return products.length > 0 ? (
    <InfiniteScroll
      dataLength={products.length} 
      next={fetchProducts}
      hasMore={hasMore}
      loader={<h4  className='text-9xl bg-black'>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >

      <Suspense fallback={<LoadingSkeleton/>}>
  <div className="flex flex-wrap justify-center">
    {products.map((product) => (
      <ProductTemplate key={product.id} product={product} />
    ))}
  </div>
</Suspense>
    </InfiniteScroll>
  ) : ("Loading...")


}

export default Products