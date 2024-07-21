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
import PaymentList from './components/PaymentList';
import AdminLogin from './components/AdminLogin';
import Services from './pages/services';
import AvailableCars from './components/CarAvailability';
import CarList from '../src/components/carlist';
import UserTable from './components/UserList';



// function App() {
//   return (
//     <Router>
//       <Header />
//       <Routes>
//         <Route path="/" element={<Home />} />
//          <Route path="/about" element={<About />} />
//         {/* <Route path="/history" element={<History />} /> */}
//         <Route path="/blog" element={<Blog />} />
//         <Route path="/contact" element={<Contact />} /> 
//         <Route path="/register" element={<SignInForm />} />
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="/dashboard" element={<UserDashboard />} />
//         <Route path="/admin" element={<AdminDashboard />} />
//         <Route path="/profile" element={<UserProfile />} />
//         <Route path="/vehicles" element={<VehicleList />} />
//         <Route path="/bookings" element={<BookingList />} />
//         <Route path="/payments" element={<PaymentList />} />
//         <Route path="/admin-login" element={<AdminLogin />} />
//         <Route path="/services" element={<Services />} />
//         <Route path="/booking" element={<Booking />} />
//         <Route path="/availablecars" element={<AvailableCars />} />
//       </Routes>
//       <Footer />
//     </Router>
    
//   );
// }

// export default App;

import { createBrowserRouter,RouterProvider} from "react-router-dom";
import { Toaster } from 'sonner';



const App = () => {
  const route = createBrowserRouter([
    
    {
      path: '/',
      element: <Home />,
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
      path: 'bookings',
      element: <BookingList />,
    },
    {
      path: 'payments',
      element: <PaymentList />,
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
      path: 'availablecars',
      element: <AvailableCars />,
    },
    {
      path: 'carlist',
      element: <CarList />,
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
