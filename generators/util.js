export const randomIntBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}
export const randomBetween = (min, max) => {
    return (Math.random() * (max - min)) + min;
}
export const distanceSquared = (x1, y1, x2, y2) => {
    const a = x1 - x2;
    const b = y1 - y2;
    return (a*a + b*b);
}