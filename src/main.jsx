import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './main.css'
import 'tailwindcss/tailwind.css';
import allInfo from "./store/store.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Context =createContext(null)
ReactDOM.createRoot(document.getElementById('root')).render(
<>
    <Context.Provider value={{
        allInfo: new allInfo()
    }}>
        <App />
        <ToastContainer />
    </Context.Provider>
</>

)
