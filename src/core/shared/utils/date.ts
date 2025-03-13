export function createFutureDate(date: Date, secondToAdd: number): Date {
    const secondsToMilliseconds = secondToAdd * 1000
    return new Date(date.getTime() + secondsToMilliseconds)
}
