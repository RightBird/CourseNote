# **Chapter 9 ---Greedy | 贪心**

在每一步选择中都采取最优的选择，后续阶段的选择不会改变前面已经做出的选择。

!!!NOTE
	贪心算法仅在局部最优等于全局最优时可行。

## **Activity Selection Problem** 

![38](pic/38.jpg)

**Solution:** 每次选择结束最早且与已选择的不重复的时间段。



## **Huffman Code** (用于文件压缩)

```c
void Huffman ( PriorityQueue  heap[ ],  int  C )
{   consider the C characters as C single node binary trees,
     and initialize them into a min heap;
     for ( i = 1; i < C; i++ ) { 
        create a new node;
        /* be greedy here */
        delete root from min heap and attach it to left_child of node;
        delete root from min heap and attach it to right_child of node;
        weight of node = sum of weights of its children;
        /* weight of a tree = sum of the frequencies of its leaves */
        insert node into min heap;
   }
}

```

$$
T=O(C\log C)
$$



![39](pic/39.jpg)