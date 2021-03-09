import moment from "moment";

export const currentLocation = () => window.location.href;
export const handleAndThrow = (onrejected?: (reason: any) => PromiseLike<never>) => (reason: any) => {
    onrejected && onrejected(reason)
    return Promise.reject(reason);
}

export const formatDatetime = (dateTime?: string) => dateTime ? moment(dateTime).utc().format('YYYY-MM-DD HH:mm:ss.SSS UTC') : '--'