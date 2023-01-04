export const randomIntBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}
export const randomBetween = (min, max) => {
    return (Math.random() * (max - min)) + min;
}
export const randomItem = (arr) => {
    return arr[randomIntBetween(0, arr.length)];
}
export const distanceSquared = (x1, y1, x2, y2) => {
    const a = x1 - x2;
    const b = y1 - y2;
    return (a*a + b*b);
}
export const getLast = (arr) =>
{
    return arr[arr.length-1];
}
export const getLastX = (arr, x) =>
{
    const newArr = [];
    for (let i = 1; i <= x; i++)
    {
        newArr.push(arr[arr.length-i]);
    }
    return newArr;
}