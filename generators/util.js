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
export const distance = (x1, y1, x2, y2) => {
    const a = x1 - x2;
    const b = y1 - y2;
    return Math.sqrt(a*a + b*b);
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
export const getColour = (p5, c) =>
{
    return p5.color(c.rgb[0], c.rgb[1], c.rgb[2]);
}
export const lerp = (value1, value2, amount) =>
{
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    return value1 + (value2 - value1) * amount;
}
export const angleBetween = (x1, y1, x2, y2) =>
{
    return Math.atan2(y2-y1, x2-x1);
}
export const clamp = (val, min, max) =>
{
    if (val < min)  
        return min;
    if (val > max)
        return max;
    return val;
}
export const isBetween = (val, min, max) =>
{
    if (val < min)  
        return false;
    if (val > max)
        return false;
    return true;
}
export const lerpColourArray = (p5, array, value) =>
{
    const colIndex = Math.floor((value) * array.length)

    const c1 = p5.color(array[colIndex]);
    const c2 = p5.color(array[Math.min(colIndex + 1, array.length - 1)]);

    return (p5.lerpColor(c1, c2, ((value) * array.length) % 1))
}