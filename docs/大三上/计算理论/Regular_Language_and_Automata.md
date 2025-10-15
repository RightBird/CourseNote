# Regular Language and Automata

## 2.1 Deterministic Finite Automata

> **Difinition**
>
> **deterministic finite automata(DFA)** 是一个五元组 $(K,\Sigma,\delta,s,F)$，满足：
>
> - $K$ 是一个状态的有限集合
> - $\Sigma$ 是一个字母表
> - $s\in K$ 是最初状态
> - $F\subseteq K$ 是集合的最终状态
> - $\delta$: 转移函数 $K\times \Sigma\rightarrow K$

- **Graphical Representation**

![2-1](pic/2-1.png)

![2-2](pic/2-2.png)

![2-3](pic/2-3.png)

> **Definition**
>
> DFA $（,\Sigma,\delta,s,F)$ 的一个 **configuration** 有 $K\times \Sigma^*$ 的形式，表示从当前状态 $K$ 开始经过 $\Sigma^*$ 所表示的多个操作。

两个configuration之间的二元关系 $\vdash_M$ 满足：

- $(q,w)\vdash_M(q',w') \Leftrightarrow \exists a\in\Sigma,w=aw',\text{and }\delta(q,a)=q'$

Example: $(n,WSSW)\vdash_M(i,SSW)\vdash_M(n,SW)\vdash_M(u,W)\vdash_M(n,\epsilon)$

![2-4](pic/2-4.png)

!!!Note
	$\vdash_M^*$ 是 $\vdash_M$ 关于 reflexive, transitive 的 closure。
	- $(q,w)\vdash_M^*(q',w')$ 表示 $(q,w)$ 经过若干步之后会到达 $(q',w')$



## 2.2 Nondeterministic Finite Automata

> **Difinition**
>
> **Nondeterministic finite automata(NFA)** 是一个五元组 $(K,\Sigma,\delta,s,F)$，满足：
>
> - $K$ 是一个状态的有限集合
> - $\Sigma$ 是一个字母表
> - $s\in K$ 是最初状态
> - $F\subseteq K$ 是集合的最终状态
> - $\Delta$: 转移关系，是 $K\times (\Sigma\cup\{e\})\times K$ 的子集

$\vdash_M^*$ 是 $\vdash_M$ 关于 reflexive, transitive 的 closure，仍满足。

一个字符串 $w\in\Sigma^*$ 被 $M$ **accept** 当且仅当存在一个状态 $q\in F$ 满足 $(s,w)\vdash_M^*(q,\epsilon)$

- $L(M)$ 是所有被 $M$ 接受的字符串构成的集合。

> **Theorem**
>
> 对于一个NFA $M$的语言 $L=L(M)$，存在一个DFA $M'$ 满足 $L=L(M')$