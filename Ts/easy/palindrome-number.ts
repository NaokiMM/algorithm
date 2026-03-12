/**
 * LeetCode #9 Palindrome Number
 *
 * 問題:
 * 整数 x が回文（palindrome）かどうかを判定する。
 * 回文とは、前から読んでも後ろから読んでも同じになる数のこと。
 *
 * 例:
 * 121 → true
 * -121 → false
 * 10 → false
 *
 * 制約:
 * -2^31 <= x <= 2^31 - 1
 */

function isPalindrome(x: number): boolean {
    // 数値を文字列に変換
    const s = x.toString();

    // メソッドチェーン
    // split("") : 文字列を1文字ずつの配列にする
    // reverse() : 配列を逆順にする
    // join("")  : 配列を結合して文字列にする
    const reversed = s.split("").reverse().join("");

    // 元の文字列と逆順文字列を比較
    return s === reversed;
}