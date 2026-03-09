// function solution(A) {
//   const set = new Set(A);

//   let i = 1;

//   // 無限に回る可能性があるので控えた方がいい
//   // for文で要素分だけ回すようにした方がいい
//   while (true) {
//     if (!set.has(i)) {
//       return i;
//     }
//     i++;
//   }
// }