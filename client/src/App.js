import './App.scss';
import {AppContext} from './store';
import {useAppStateContext} from './store/reducer';
import {Routes} from './modules/app/components/Routes';
import {BrowserRouter} from 'react-router-dom';


function App() {
    const [state, dispatch] = useAppStateContext();

    return (
        <BrowserRouter>
            <AppContext.Provider value={[state, dispatch]}>
                <Routes/>
            </AppContext.Provider>
        </BrowserRouter>
    );
}

export default App;
