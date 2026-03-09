// LeetCode上の問題と条件

// 整数の配列 nums と整数 target が与えられる。
// 配列の中から 2つの数を選んで足すと target になる組み合わせを探す。
// そして その2つの数の「インデックス（位置）」を返す。

// Example 1:
// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
// →9が欲しいので、0番目と1番目を返す。

// Example 2:
// Input: nums = [3,2,4], target = 6
// Output: [1,2]

// Example 3:
// Input: nums = [3,3], target = 6
// Output: [0,1]

// 制約
// 2 <= nums.length <= 104 →　2〜10000
// -109 <= nums[i] <= 109 →　-1000000000 ～ 1000000000
// -109 <= target <= 109 →　-1000000000 ～ 1000000000

// ----------------------------------------

// 個人的注意事項
// 重複している数字がある際は、古いものを使用する。
// mapを使用する理由は計算時にkey, valueを使用するため。
// Input: nums = [2,7,11,15], target = 9

function twoSum(nums: number[], target: number): number[] {

    // key, value使用時は<number, number>();で記述する。
    const map = new Map<number, number>();
  
    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];
  
      // targetからnums[i]を引いた値がmapにあるかどうかを確認
      if (map.has(complement)) {

        // !はTsエラー回避用
        // complementの位置番号とiの位置番号を返す。
        return [map.get(complement)!, i];
      }
  
      // 必要なkey, valueが存在しない場合に設定する。
      map.set(nums[i], i);
    }
  
    return [];
  }