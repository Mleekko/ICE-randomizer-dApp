export default class Format {
    static _percent = new Intl.NumberFormat('en-US', {maximumFractionDigits: 2});
    static _percent1 = new Intl.NumberFormat('en-US', {maximumFractionDigits: 1});
    static _percentum = new Intl.NumberFormat('en-US', {maximumSignificantDigits: 1});


    static percent(num: number): string {
        return num >= 0.05 ? this._percent.format(num) : this._percentum.format(num);
    }
    static percent1(num: number): string {
        return num >= 0.1 ? this._percent1.format(num) : this._percentum.format(num);
    }

    static percent2(num: number): string {
        return this._percent.format(num);
    }


}
