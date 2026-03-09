// Aには数値の配列が入る
// ): number→これは戻り値の型を示している
function solution(A: number[]): number {
    // A（数値配列）を使って number 型の Set を作る
    const set = new Set<number>(A);
  
    // iは1から順に+1ずつ増やしていく
    // ここA.lengthではなく、set.lengthのほうが早い気がする
    // Aだと数値が重複している可能性がある
    // setだと重複がない。どう思いますか？
    // set.size + 1でも実行可能。
    for (let i = 1; i <= A.length + 1; i++) {
      if (!set.has(i)) {
        return i;
      }
    }
  
    // TypeScriptの型のための保険
    return 1;
  }