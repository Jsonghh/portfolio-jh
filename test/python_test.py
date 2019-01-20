class Solution:
    """
    @param: :  A list of integers
    @return: A list of unique permutations
    """

    def permuteUnique(self, nums):
        # write your code here
        if len(nums) == 0:
            return [[]]

        nums.sort()
        is_visited = [False for i in range(len(nums))]
        results = []
        self.dfs(is_visited, [], nums, results)
        return results

    def dfs(self, is_visited, cur_list, nums, results):
        if len(cur_list) == len(nums):
            results.append(cur_list[:])
            return

        for i in range(len(nums)):
            if is_visited[i]:
                continue
            if i > 0 and nums[i] == nums[i - 1] and is_visited[i - 1]:
                continue
            
            cur_list.append(nums[i])
            is_visited[i] = True
            self.dfs(is_visited, cur_list, nums, results)
            cur_list.pop()
            is_visited[i] = False