// http://grandzebu.net/informatique/codbar-en/code128.htm
const START_B = 104;
const CODE_B = 100;
const CODE_C = 99;

enum Code128Mode {
    B = "B", // ASCII
    C = "C", // 2-digit numbers
}

export function makeBarCode128(str: string): JSX.Element {
    let accCodePoints = [];
    let mode = Code128Mode.B;
    let i = 0;
    while (i < str.length) {
        if (str.slice(i, i+2).match(/\d{2}/) !== null) {
            if ((mode === Code128Mode.C) || (str.slice(i, i+4).match(/\d{4}/) !== null)) {
                if (mode !== Code128Mode.C) {
                    accCodePoints.push(CODE_C);
                    mode = Code128Mode.C
                }
                const n = parseInt(str.slice(i, i+2));
                accCodePoints.push(n);
                i += 2;
                continue;
            }
        }
        if (mode !== Code128Mode.B) {
            accCodePoints.push(CODE_B);
            mode = Code128Mode.B
        }
        accCodePoints.push(str[i].charCodeAt(0) - 32);
        i++;
    }
    const START_B_CHAR = String.fromCharCode(START_B + 105);
    const chars = accCodePoints.map((v) => String.fromCharCode((v <= 94) ? v+32 : v+105)).join("");
    const END_CHAR = String.fromCharCode(211);

    const checkSum = accCodePoints.reduce((acc, v, i) => (acc + v*(i+1)) % 103, START_B % 103);
    const checkSumChar = String.fromCharCode(checkSum+32);
    return <span className="code128">{START_B_CHAR}{chars}{checkSumChar}{END_CHAR}</span>;
}
