/*
【問題概要】
与えられた非負の整数または小数を英語表記に変換する。

【ルール】
・先頭は大文字
・100 → "One hundred"（Oneは省略しない）
・最大単位は billion
・小数は "point" の後に1桁ずつ読む（0 は zero）
・ハイフンやカンマは使わない
・"and" は不要
・整数部に先頭ゼロがある場合は -1
・不正入力は -1
*/

function main(lines: string[]) {
    const s = lines[0]?.trim() ?? "";
  
    const ones = ["zero","one","two","three","four","five","six","seven","eight","nine"];
    const teens = ["ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
    const tens = ["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
    const units = ["","thousand","million","billion"];
  
    // バリデーション
    if (!/^\d+(\.\d+)?$/.test(s)) {
      console.log("-1");
      return;
    }
  
    const [intPart, decPart] = s.split(".");
  
    // 先頭ゼロチェック（例: 01, 002）
    if (intPart.length > 1 && intPart[0] === "0") {
      console.log("-1");
      return;
    }
  
    // 0〜999 を英語化
    const f = (n: number): string => {
      let r = "";
  
      if (n >= 100) {
        r += ones[Math.floor(n / 100)] + " hundred";
        n %= 100;
        if (n) r += " ";
      }
  
      if (n >= 20) {
        r += tens[Math.floor(n / 10)];
        if (n % 10) r += " " + ones[n % 10];
      } else if (n >= 10) {
        r += teens[n - 10];
      } else if (n > 0) {
        r += ones[n];
      }
  
      return r;
    };
  
    // 整数部分
    let res = "";
  
    if (intPart === "0") {
      res = "zero";
    } else {
      let x = intPart;
      let i = 0;
      const arr: string[] = [];
  
      while (x.length > 0) {
        const c = x.slice(-3);
        x = x.slice(0, -3);
  
        const n = Number(c);
        if (n !== 0) {
          const u = units[i] ? " " + units[i] : "";
          arr.unshift(f(n) + u);
        }
        i++;
      }
  
      res = arr.join(" ");
    }
  
    // 小数部分
    if (decPart !== undefined) {
      res += " point " + decPart.split("").map(d => ones[+d]).join(" ");
    }
  
    // 先頭大文字
    console.log(res[0].toUpperCase() + res.slice(1));
  }
  
  function readFromStdin(): Promise<string[]> {
    return new Promise(resolve => {
      let data = "";
      process.stdin.resume();
      process.stdin.setEncoding("utf8");
  
      process.stdin.on("data", d => data += d);
      process.stdin.on("end", () => resolve(data.split("\n")));
    });
  }
  
  readFromStdin().then(main);