import { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSessionStorage } from 'hooks';

export const useDeepLink = () => {
    const location = useLocation();
    const history = useHistory();
    const [hasRedirected, setHasRedirected] = useState(false);
    const [deepLinkLocation, setDeepLinkLocation] = useSessionStorage('deepLinkLocation', '');

    const performDeepLink = () => {
        if (!hasRedirected && !!deepLinkLocation && location.pathname !== deepLinkLocation) {
            history.push(deepLinkLocation);
        }
        setHasRedirected(true);
        setDeepLinkLocation('')
    }

    return {
        location,
        history,
        deepLinkLocation,
        setDeepLinkLocation,
        performDeepLink,
    }
}