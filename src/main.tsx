import ReactDOM from 'react-dom/client';
import { ChatApp } from './ChatApp';
import { Provider } from 'react-redux';
import { store } from '@/store';
import './globals.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    //<React.StrictMode>
    <Provider store={store}>
        <ChatApp />
    </Provider>
    //</React.StrictMode>
);
