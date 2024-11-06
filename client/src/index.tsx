import { createRoot } from 'react-dom/client'
import './App/Layout/Styles.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './App/Router/router.tsx';
import { Provider } from 'react-redux';
import { store } from './App/store/configurestore.ts';
import React from 'react';

// const root=ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// )

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
)
