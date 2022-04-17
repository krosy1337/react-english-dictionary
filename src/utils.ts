export const shuffle = (array: any[]) => {
    const arr = [...array]
    let j, temp
    for (let i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        temp = arr[j]
        arr[j] = arr[i]
        arr[i] = temp
    }
    return arr
}
export const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}