# **Chapter 4 ---Leftist Heaps and Skew Heaps**

## **Leftist Heaps | 左式堆**

### **Null path length | 零路径长**

从X到一个不具有两个儿子的结点的最短路径的长。

定义 $Npl(NULL) = -1$。

$$
Npl(X) = min \{ Npl(C) + 1~for~all~C~as~children~of~	X \}~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$$

### **性质**

堆中的任何节点，其左儿子的零路径长>=右儿子的零路径长。

### **定理**

右路径上有 $r$ 个节点的 leftist tree 至少有 $2^r-1$ 个节点

### **Merge**

<img src="./pic/21.png" alt="21" style="zoom:50%;" /> 

<img src="./pic/22.png" alt="22" style="zoom:50%;" /> 

### **DeleteMin**

1.删除根节点

2.Merge左右子树

### **Time Complexity**

$$
\begin{aligned}
&Merge&&O(logN)&&\\
\\
&Insertion&&O(logN)&&\\
\\
&Deletion&&O(logN)&&&&&&&&&&&&&&&&&&&&&&&&&\\
\end{aligned}
$$





## **Skew Heaps  | 斜堆**

### **目标**

任何M次连续的操作的时间复杂度为O(MlogN)

### **Heavy node**

右子树节点 > 左子树节点

否则为 **light node**

### **Merge**

(case1) 如果一个空斜堆与一个非空斜堆合并，返回非空斜堆。

(case2) 如果两个斜堆都非空，那么比较两个根节点，取较小堆的根节点为新的根节点。将”较小堆的根节点的右孩子”和”较大堆”进行合并。

(case3) 合并后，**交换新堆根节点的左孩子和右孩子**。

### **Amortized Analysis for Skew Heaps**

<img src="./pic/23.png" alt="23" style="zoom:50%;" /> 

<img src="./pic/24.png" alt="24" style="zoom:50%;" /> 