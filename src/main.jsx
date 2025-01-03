import { createRoot } from 'react-dom/client';
import './index.css'; // Ensure the path to CSS is correct
import App from './App.jsx'; // Ensure the path to App component is correct
import { store } from './redux/Store.js'; // Adjusted relative path to redux store
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import  {Toaster}  from 'react-hot-toast';

// Create the root element for the app and render it
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Toaster/>
      </Provider>
    </BrowserRouter>
);
