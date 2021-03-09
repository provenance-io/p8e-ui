export const truncate = (str: string | null | undefined, length: number) => {
    if (str && str.length > length) {
        return `${str.substr(0, length)}...`;
    }
    return str;
}