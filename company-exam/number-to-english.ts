/*
【問題概要】
与えられた非負の整数（0以上の整数）または小数を英語表記に変換する。

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
  
    // 0から9までの数字を英語表記にする
    const ones = ["zero","one","two","three","four","five","six","seven","eight","nine"];
    // 10から19までの数字を英語表記にする
    const teens = ["ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
    // 20から99までの数字を英語表記にする
    const tens = ["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
    // 1000から999999999までの数字を英語表記にする
    const units = ["","thousand","million","billion"];
  
    // 数字または小数形式かどうかのバリデーション
    // 不正な形式の場合は -1 を出力して終了するルール
    if (!/^\d+(\.\d+)?$/.test(s)) {
      console.log("-1");
      return;
    }
  
    // 小数点で分割して、整数部分（int）と小数部分（decimal）に分ける
    const [intPart, decPart] = s.split(".");
  
    // 先頭ゼロチェック（例: 01, 002）
    if (intPart.length > 1 && intPart[0] === "0") {
      console.log("-1");
      return;
    }
  
    // 0〜999 を英語化
    // fには処理が入る
    const f = (n: number): string => {
      let r = "";
  
      // 100以上の場合
      if (n >= 100) {
        // 100で割って先頭の整数部分を取り出す
        //小数を切り捨てて整数にする関数Math.floor()
        // ones変数の指定番号を取得する
        r += ones[Math.floor(n / 100)] + " hundred";
        // 100で割った余りを取り出す
        n %= 100;
        // nが0でない場合はスペースを追加
        // 例: 100 -> "one hundred"
        if (n) r += " ";
      }
  
      // 20以上の場合
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
  
    // 入力が0の場合は、英語表記の "zero" を返す
    if (intPart === "0") {
      res = "zero";
    } else {
      let x = intPart;
      let i = 0;
      const arr: string[] = [];
  
      // 整数部分の各桁を3桁ずつに分割して、各桁を英語に変換
      while (x.length > 0) {
        // 右から3桁を取り出す
        const c = x.slice(-3);
        // 取り出した3桁を元の文字列から削る
        x = x.slice(0, -3);

        // 文字列を数値に変換している
        const n = Number(c);
        if (n !== 0) {
          // units[i] がある場合は「スペース + 単位」を付ける（例: " thousand"）
          // units[i] がない場合は何も付けない（空文字）
          const u = units[i] ? " " + units[i] : "";
          // f(n) + uは、f(n)とuを結合した文字列を返す
          // fはf(n)を返す関数
          // umshiftは配列の「先頭（最初）」に追加する
          arr.unshift(f(n) + u);
        }
        i++;
      }
  
      res = arr.join(" ");
    }
  
  // 小数がある場合
  if (decPart !== undefined) {
    // 小数部分を1桁ずつ分割し、各桁を英語に変換
    // d：各桁の文字列（例: "3"）
    // +d：単項プラス演算子で文字列を数値に変換（"3" → 3）
    // ones[+d]：数値を英語に変換（3 → "three"）
    // join(" ")：配列をスペース区切りの文字列に結合
    res += " point " + decPart.split("").map(d => ones[+d]).join(" ");
  }
  
    // main関数の最後の処理
    // resを大文字にして、その後resは小文字のまま
    console.log(res[0].toUpperCase() + res.slice(1));
  }
  
  // readFromStdin
  function readFromStdin(): Promise<string[]> {
    return new Promise(resolve => {
      let data = "";
      process.stdin.resume();
      process.stdin.setEncoding("utf8");
  
      process.stdin.on("data", d => data += d);
      process.stdin.on("end", () => resolve(data.split("\n")));
    });
  }

  // 標準入力を読み込み、完了後に main を実行（処理の入口）
  readFromStdin().then(main);
