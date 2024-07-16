import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import RootLayout from "./layout/RootLayout";
import { LoginForm } from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import Roboticintelligence from "./pages/Robotic-intelligence";
import HumanRobots from "./pages/Human-Robots";
import Robotfeatures from "./pages/Robot-features";
import FutureTech from "./pages/FutureTech";

function LayoutRouter() {
  let { type } = useParams();
  let renderComponent = null;

  switch (type) {
    case "home":
      renderComponent = <Home />;
      break;
    case "about":
      renderComponent = <About />;
      break;
    case "robotic-intelligence":
      renderComponent = <Roboticintelligence />;
      break;
    case "human-robot-interaction":
      renderComponent = <HumanRobots />;
      break;
    case "robot-features":
      renderComponent = <Robotfeatures />;
      break;
    case "future-tech":
      renderComponent = <FutureTech />;
      break;
    default:
      renderComponent = <div>default</div>;
      break;
  }
  return <RootLayout children={renderComponent} />;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginForm />} />
          <Route
            path='/dashboard'
            element={<RootLayout children={<Dashboard />} />}
          />
          <Route path='/layout/:type' element={<LayoutRouter />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
