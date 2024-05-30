import MainRouter from "./router/router.jsx";
import { BrowserRouter } from "react-router-dom";
import Header from "./layout/Header.jsx";
function App() {

  return (

      <BrowserRouter>
          <Header/>
          <MainRouter/>
      </BrowserRouter>
  )
}

export default App
