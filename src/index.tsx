import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import 'semantic-ui-css/semantic.min.css'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import { Provider } from 'react-redux';
import {MainPage} from "./components/mainPage/MainPage";
import {BattlePage} from "./components/BattlePage";

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <MainPage />,
//     },
//     {
//         path: "/battle",
//         element: <BattlePage />,
//     },
// ]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <App />
        {/*<RouterProvider router={router} />*/}
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
