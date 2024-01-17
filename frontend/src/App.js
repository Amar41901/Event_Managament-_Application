import {createBrowserRouter,Outlet,RouterProvider,} from "react-router-dom";
import Register from './pages/Register'
import Login from './pages/Login'
import UpdateCredentials from './pages/UpdateProfile'
import BookedEvent from './pages/BookedEvent'
import Events from './pages/Events'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './components/component.css'
import './style.css'
import "./pages/pages.css"
import CreateEventForm from "./pages/CreateEvent";
import UpdateEventForm from "./pages/UpdateEvent";
import Mainpage from "./pages/Home";
import './pages/items.css'
import Topbar from "./components/Topbar";
import UserEvents from "./pages/Events";
import SearchEvent from "./pages/SearchEvent";


const Layout = () =>{
  return(
    <div className="pad">
    <Navbar/>
    <div className="xyz">
    <Topbar/>
    <Outlet/>
    <Footer/>
    </div>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
      path: "/",
      element:<Mainpage/>
      },
      {
        path: "/eventupdate/:eventId",
        element:<UpdateEventForm/>
      },
      {
        path: "/hostevents",
        element:<CreateEventForm/>
      },
      {
        path: "/myevents",
        element:<UserEvents/>
      },
      {
        path: "/booked",
        element:<BookedEvent/>
      },
      {
        path: "/update",
        element:<UpdateCredentials/>
      },
      {
        path: "/search",
        element:<SearchEvent/>
      },
],
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/login",
    element: <Login/>
  }
]);

function App() {
  return (
    <div className="app">
      <div className="container">
      <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
