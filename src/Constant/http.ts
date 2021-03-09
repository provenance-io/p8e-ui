export const isDev = () => !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
export const isLocal = () => window.location.origin.startsWith('http://localhost');
export const isFigure = (url?: string) => url && new URL(url).origin.endsWith('figure.com');
export const isProvenance = (url?: string) => url && new URL(url).origin.endsWith('provenance.io');

const dockerEnv: { P8E_URL: string } = (window as any).dockerEnv;

export const P8E_URL = (isDev()
    ? process.env.REACT_APP_P8E_URL || 'http://localhost:8090'
    : dockerEnv.P8E_URL || `${window.location.origin}/p8e/api`)
    .trim()
    .replace(/\/*$/, '');