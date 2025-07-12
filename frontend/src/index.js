import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the correct import for React 18
import './styles.css'; // Custom styles
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap styles
import AppRoutes from './routes';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot instead of render
root.render(
    <React.StrictMode>
        <AppRoutes />
    </React.StrictMode>
);