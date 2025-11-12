# Turing Machine

PDA仍存在只能在栈顶操作字符的缺陷，而图灵机的基本思想就是把磁带和栈结合在一起，即使用一个可写的磁带。

![](pic/4-1.png)

## 4.1 The Definition of Turing Machine

图灵机可以定义为一个五元组 $(K,\Sigma,\delta,s,H)$ , 其中：

- $K$ 是一个状态的有限集合
- $\Sigma$ 是一个字母表，**包括** $\sqcup$ (blank symblo) 和 $\rhd$ (left end) ，但**不包含** $\rightarrow$ 和 $\leftarrow$ 符号
- $s\in K$ 是最初状态
- $H\subseteq H$ 是停止状态(**halting states**)的集合
- 转移函数 $\delta:(K-H)\times\Sigma\rightarrow K\times (\Sigma\cup\{\leftarrow,\rightarrow\})$ 满足
  $\forall q\in K-H \text{ if } \delta(q,\rhd)=(p,b)\text{, then } b=\rightarrow$
  $\forall q\in K-H \text{ and } a\in\Sigma\text{, if } \delta(q,a)=(p,b) \text{, then }b\neq \rhd$

!!!Note
	$\delta(q,a)=(p,b)$ 表示在状态 $q$ 时如果在磁带上读到 $a$ ，则转移到 $p$ 状态，并进行 $b$ 操作: $b$ 为字符，则不移动磁带头，并写入字符 $b$ ; $b$ 位 $\{\rightarrow,\leftarrow\}$  则向对应方向移动磁带头。

如果机器没有转移函数可以操作，则停止(**halt**)在一个状态。

**Graph Presentation**

![4-2](pic/4-2.png)

**Example**

![](pic/4-3.png)

### Configuration

> **Definition**
>
> TM $M=(K,\Sigma,\delta,s,H)$ 的 **configuration** 定义为 $K\times \rhd\Sigma^*\times (\Sigma^*(\Sigma-\{\sqcup\})\cup\{e\})$
>
> ![](pic/4-4.png)
>
> 若一个configuration的状态(图中 $q$ )属于集合 $H$，则称该配置为**halted configuration**。

一个configuration $(q,wa,u)$ 可以简单表示为 $(q,w\underline{a}u)$

![](pic/4-5.png)

### Computation

> **Defintion**
>
> 对于TM $M=(L,\Sigma,\delta,s,H)$ ，考虑以下两个configurations: $(q_1,w_1\underline {a_1}u_1)$ 和 $(q_2,w_2\underline{a_2}u_2)$ 其中$a_1,a_2\in\Sigma$，则定义图灵机的计算为
> $$
> (q_1,w_1\underline {a_1}u_1)\vdash_M(q_2,w_2\underline {a_2}u_2)
> $$
> 当且仅当存在一个 $b\in\Sigma\cup\{\rightarrow,\leftarrow\},\delta(q_1,a_1)=(q_2,b)$,满足一下之一
>
> 1. $b\in \Sigma,w_1=w_2,u_1=u_2,a_2=b$
> 2. $b=\leftarrow,w_1=w_2a_2$ , 且满足以下之一:
>    如果 $a_1\neq\sqcup$ 或 $u_1\neq e$ , 则需满足 $u_2=a_1u_1$
>    如果 $a_1=\sqcup$ 且 $u_1=e$ , 则需满足 $u_2=e$
> 3. $b=\rightarrow,w_2=w_1a_1$ , 且满足以下之一:
>    如果 $a_2\neq \sqcup$ 或 $u_2\neq e$ 则需满足 $u_1=a_2u_2$
>    如果 $a_2=\sqcup$ 且 $u_2=e$ 则需满足 $u_1=e$
>
> ![](pic/4-6.png)

对于任何一个图灵机 $M$ , $\vdash^*_M$ 是 $\vdash_M$ 在 reflexive, transitive 上的闭包。

图灵机 $M$ 的计算是一个configuration序列 $C_0,C_1,…,C_n$ 满足
$$
C_0\vdash_M C_1\vdash_M…\vdash_M C_n
$$
用 $C_0\vdash^n_M C_n$ 来表示一个长度为 $n$ (即需要 $n$ 步)的图灵机计算。

### Basic Machine

> **Defintion**
>
> 定义两种基本图灵机: **Symbol-writing** 和 **Hand-moving** 机器:
>
> $\Sigma$ 是一个给定的字母表, $a\in \Sigma\cup\{\leftarrow,\rightarrow\}-\{\rhd\}$ , 于是可以定义图灵机 
> 
> $$
> M_a=(\{s,h\},\Sigma,\delta,s,h)
> $$
> 
> 满足对于每一个 $b\in\Sigma-\{\rhd\},\delta(s,b)=(h,a)$ , 对于 $\rhd,\delta(s,\rhd)=(s,\rightarrow)$ 

简单来说，就是一个固定状态转移的图灵机，上述定义中 $a$ 为其他字符是被称为 symbol-writing 机器($M_a$)， $a\in\{\leftarrow,\rightarrow\}$ 时被称为 hand-moving 机器($M_{\leftarrow},M_\rightarrow$)。

![4-7](pic/4-7.png)

### Combining

![4-8](pic/4-8.png)

对于以上的图灵机组合，定义 $M_i=(K_1,\Sigma_i,\delta_i,s_i,H_i),(i=1,2,3)$ ,他们的组合 $M=(K,\Sigma,\delta,s,H)$ 满足:

- $K=K_1\cup K_2\cup K_3$
- $s=s_1$
- $H=H_2\cup H_3$
- 对于每一个 $\sigma\in \Sigma,q\in K-H$ , $\delta(q,\sigma)$ 的定义如下:
  如果 $q\in K_1-H_1$ 则 $\delta(q,\sigma)=\delta_1(q,\sigma)$
  如果 $q\in K_2-H_2$ 则 $\delta(q,\sigma)=\delta_2(q,\sigma)$
  如果 $q\in K_3-H_3$ 则 $\delta(q,\sigma)=\delta_3(q,\sigma)$
  如果 $q\in H_1$ 则若 $\sigma=a$ , $\delta(q,\sigma)=s_2$ ; 若 $\sigma=b$ , $\delta(q,\sigma)=s_3$ ; 否则 $\delta(q,\sigma)\in H$ 



## 4.2 Computing with Turing Machine