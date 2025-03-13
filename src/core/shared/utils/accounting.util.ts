function roundToSignificantFigures(
    amount: number,
    significantFigures: number
): number {
    const factor = Math.pow(10, significantFigures)
    return Math.round(amount * factor) / 100
}

export { roundToSignificantFigures }
