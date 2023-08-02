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
export const trim_array = ( arr, max_length = 20 ) => {

    let new_arr = arr
    
    if(arr.length > max_length) {
        
        let cutoff = Math.ceil(arr.length - max_length)
        cutoff = isEven(cutoff) ? cutoff : cutoff + 1
        
        new_arr = arr.slice(cutoff)
  
    }
  
    return new_arr
  
}  