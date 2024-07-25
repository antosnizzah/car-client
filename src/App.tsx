import Home from './pages/Home';
import About from './pages/About';
import Error from './pages/Error';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import SignInForm from './components/SignInForm';
import LoginForm from './components/LoginForm';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import UserProfile from './components/UserProfile';
import VehicleList from './pages/VehicleList';
import BookingList from './components/BookingList';
import AdminLogin from './components/AdminLogin';
import Services from './pages/services';
import UserTable from './components/UserList';
import FleetList from './pages/fleetmanagement';
import { createBrowserRouter,RouterProvider} from "react-router-dom";
import { Toaster } from 'sonner';
import Cardetails from './pages/cardetails';
import CarCard from './components/carcard';
import BookingForm from './components/BookingForm';
import Metrics from './pages/metrics';
import BookingPage from './pages/payment';
import PaymentForm from './components/paymentform';
import CohereChat from './components/open';
import PaymentSuccess from './pages/paymentsucess';



const App = () => {
  const route = createBrowserRouter([
    
    {
      path: '/',
      element: <Home />,
      errorElement: <Error />,
    },
    {
      path: '/paymentsucess',
      element: <PaymentSuccess />,
      errorElement: <Error />,
    },
    {
      path: 'payments/:bookingId',
      element: <PaymentForm amount={0} bookingId={0} />,
      errorElement: <Error />,
    },
    {
      path: 'chatbox',
      element: <CohereChat/>,
      errorElement: <Error />,
    },
    {
      path: 'payments/54', // Added the bookingId parameter
      element: <BookingPage />,
      errorElement: <Error />,
    },
    {
      path: 'fleet-management',
      element: <FleetList />,
      errorElement: <Error />,
    },
    {
      path: 'metrics',
      element: <Metrics/>,
      errorElement: <Error />,
    },
    {
      path: 'about',
      element: <About />,
    },
    {
      path: 'blog',
      element: <Blog />,
    },
    {
      path: 'contact',
      element: <Contact />,
    },
    {
      path: 'register',
      element: <SignInForm />,
    },
    {
      path: 'login',
      element: <LoginForm />,
    },
    {
      path: 'user-dashboard',
      element: <UserDashboard />,
      errorElement: <Error />,
    },
    {
      path: 'admin',
      element: <AdminDashboard />,
      errorElement: <Error />,
    },
    {
      path: 'profile',
      element: <UserProfile />,
    },
    {
      path: 'vehicles',
      element: <VehicleList />,
    },
    {
      path: '/vehicle/:id',
      element: <Cardetails />,
    },
    {
      path: 'bookings',
      element: <BookingList />,
    },
    {
      path: 'admin-login',
      element: <AdminLogin />,
    },
    {
      path: 'services',
      element: <Services />,
    },
    {
      path: 'users',
      element: <UserTable />,
      errorElement: <Error />,
    },
    {
      path: 'carlist',
      element: <CarCard />,
      errorElement: <Error />,
    },
    {
      path: '/vehicle/:id/booking-details',
      element: <BookingForm />,
      errorElement: <Error />,
    },
  ]);
  return (
    <>
      <RouterProvider router={route} />
      <Toaster
        position='top-right'
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'text-green-400',
            warning: 'text-yellow-400',
            info: 'bg-blue-400',
          }
        }}
      />
    </>
  )
}

export default App
