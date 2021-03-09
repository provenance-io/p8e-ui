import { useEffect, useState } from "react";

type SetValue<T> = (value: T | ((currentValue: T) => T)) => void;

type StorageLocations = 'localStorage' | 'sessionStorage';

const useBrowserStorage = <T>(storageLocation: StorageLocations, key: string, defaultValue?: T): [T, SetValue<T>] => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const existingValue = window[storageLocation].getItem(key);

            return existingValue ? JSON.parse(existingValue) : defaultValue;
        } catch (error) {
            console.log(error);
            return defaultValue;
        }
    });

    const setValue: SetValue<T> = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);

            window[storageLocation].setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const storageListener = (e) => {
            if (!e.key || e.key === key) {
                const updatedValue = window[storageLocation].getItem(key);

                const parsedUpdatedValue = (() => {
                    try {
                        return updatedValue ? JSON.parse(updatedValue) : defaultValue;
                    } catch (error) {
                        return defaultValue;
                    }
                })();
                
                setStoredValue(parsedUpdatedValue);
            }
        };

        window.addEventListener('storage', storageListener);

        return () => window.removeEventListener('storage', storageListener);
    }, [key, defaultValue, storageLocation]);

    return [storedValue, setValue];
}

export const useLocalStorage = <T>(key: string, defaultValue?: T): [T, SetValue<T>] => {
    return useBrowserStorage('localStorage', key, defaultValue);
}

export const useSessionStorage = <T>(key: string, defaultValue?: T): [T, SetValue<T>] => {
    return useBrowserStorage('sessionStorage', key, defaultValue);
}