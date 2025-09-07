import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { route } from './routes/Router';
import { store } from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={route} />
        <ToastContainer position="top-right" autoClose={3000} />
      </Provider>
    </>
  )
}

export default App;
