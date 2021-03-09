import qs from 'query-string';

export const parseParams = (params, fallback = {}): Record<string, any>  => (params ? qs.parse(params) : fallback);

export const encodeParams = (params: Record<string, any>) => qs.stringify(params);