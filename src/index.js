import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./assets/css/App.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { GlobalProvider } from "./pages/GlobalState";

AOS.init();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GlobalProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </GlobalProvider>
);
