export enum KEY_PROVIDERS {
    DATABASE = 'DATABASE',
    SMARTKEY = 'SMARTKEY',
}

export const KEY_PROVIDER_META = {
    [KEY_PROVIDERS.DATABASE]: { label: 'Database', description: 'Store keys directly in the database. Note: this is a less secure method of key storage' },
    [KEY_PROVIDERS.SMARTKEY]: { label: 'SmartKey', description: 'Use external cloud Hardware Security Module (HSM) provider Equinix SmartKey® to securely store private keys' },
} as const

export const KEY_PROVIDERS_ARRAY = Object.entries(KEY_PROVIDERS).map(([key, value]) => ({ ...KEY_PROVIDER_META[key], value }));