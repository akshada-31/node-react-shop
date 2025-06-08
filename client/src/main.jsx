import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {store,persistor} from "./Redux/store.js"
import {Provider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import 'flowbite';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProductDetail from './pages/ProductDetail.jsx';
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App/>
    </PersistGate>
  </Provider>
);
