import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useSelector } from "react-redux";
import { Toaster } from 'react-hot-toast';
import Footer from "./Footer";



export default function DefaultLayout() {
  const isAuthorized = useSelector(state => state.auth.isAuthenticated);

  return (
    <div className="default-container">
      <Header isAuthorized={isAuthorized}/>

      <Toaster
        position="top-right"
        toastOptions={{
          className: '',
          success: {
            className: 'bg-green-600',
            duration: 3000,
          },
          error: {
            className: 'bg-red-600',
            duration: 3000,
          },
          info: {
            className: 'bg-blue-600 text-white',
            duration: 3000,
          },
          danger: {
            className: 'bg-yellow-600 text-white',
            duration: 3000,
          },
        }}
      />

      <div className="main-box min-h-[90vh]">
        <Outlet />
      </div>

      <Footer/>
    </div>
  );
}