import { useEffect } from "react";
import './App.css'
import { useDispatch, useSelector } from "react-redux";
import Mainroutes from "./routes/Mainroutes";
import Navbar from "./components/Navbar";
import { asyncCurrentUsers } from "./store/actions/userActions"
import { asyncLoadProduct } from "./store/actions/productActions";

function App() {
  const dispatch = useDispatch()
  const { users } = useSelector((state) => state.userReducer);
  const { products } = useSelector((state) => state.productReducer);
  useEffect(() => {
   users && dispatch(asyncCurrentUsers())
    
  }, [])
  useEffect(() => {
  if (products.length === 0) {
    dispatch(asyncLoadProduct());
  }
}, []);

  return (

    <div className="px-[10%] w-screen min-h-screen bg-gray-700 text-white">
      <Navbar />
      <Mainroutes />
    </div>

  )
}

export default App
