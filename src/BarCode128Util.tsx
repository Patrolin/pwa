// http://grandzebu.net/informatique/codbar-en/code128.htm
const FONT_START_B = String.fromCharCode(209);
const FONT_END = String.fromCharCode(211);

const START_B_VALUE = 104;

export function makeBarCode128(str: string): JSX.Element {
    const checkSumValue = Array.from(str).map((v) => v.charCodeAt(0)).reduce((acc, v, i) => {
        console.log(String.fromCharCode(v), i+1);
        return (acc + (v-32)*(i+1)) % 103;
    }, START_B_VALUE);
    const checkSum = String.fromCharCode(checkSumValue+32);
    return <span className="code128">{FONT_START_B}Wikipedia{checkSum}{FONT_END}</span>
}
