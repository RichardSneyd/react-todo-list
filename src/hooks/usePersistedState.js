import { useState, useEffect } from 'react';
// custom hooks should begin with 'use':
const usePersistedState = (key, initialValue) => {
    const lsItem = localStorage.getItem(key);
    const [value, setValue] = useState(lsItem !== null ? JSON.parse(lsItem) : initialValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export default usePersistedState;