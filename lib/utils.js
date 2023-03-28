/** Utility functions */
export function getSimpleId() {
    return Math.random().toString(26).slice(2);
}
export const getUniqueId = () => {
    return (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
}
export const getDataId = () => {
    return Date.now() + Math.random().toString(36).slice(2)
}
export const isEven = (n) => {
    return n % 2 == 0;
}