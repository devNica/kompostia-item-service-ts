export class DateVO {
    private readonly _date: Date

    private constructor(date: Date) {
        this._date = date
    }

    static create(dateInMs: number): DateVO {
        return new DateVO(new Date(dateInMs))
    }

    get date(): Date {
        return this._date
    }

    public toString(): string {
        return this._date.toString()
    }

    public toSeconds(): number {
        return this._date.getTime()
    }
}
