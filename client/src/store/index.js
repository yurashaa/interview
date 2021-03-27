import {createContext, useContext} from 'react';

export const AppContext = createContext();

export const useAppState = () => {
    const [state, _dispatch] = useContext(AppContext);

    const dispatch = function (action, args = {}) {
        action(_dispatch, args);
    }

    return [state, dispatch];
}
