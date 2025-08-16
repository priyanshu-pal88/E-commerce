import { useEffect } from "react";
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import Mainroutes from "./routes/Mainroutes";
import Navbar from "./components/Navbar";
import { asyncCurrentUsers } from "./store/actions/userActions";
import { asyncLoadProduct } from "./store/actions/productActions";

function App() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userReducer);
  const { products } = useSelector((state) => state.productReducer);

  useEffect(() => {
    if (users) {
      dispatch(asyncCurrentUsers());
    }
  }, []);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(asyncLoadProduct());
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 ">
        <Mainroutes />
      </main>
    </div>
  );
}

export default App;
