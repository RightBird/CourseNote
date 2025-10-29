# Context-Free Language and Pushdown Automata

**Introduction**

对于 $L=\{a^nb^n|n\geq 0\}$，可以通过一下方式生成：

- **Basis**: $e\in L$
- **Recursion**: 如果 $w\in L$ ，则 $awb\in L$

## 3.1 Context-Free Grammars

> **Definiton**
>
>  **Context-Free Grammar(CFG)** 是一个四元组 $G=(V,\Sigma,R,S)$，满足：
>
> - $V$是一个字母表
> - $\Sigma\subseteq V$ 是终止符号的集合（终止符号是出现在最终结果中的符号，即不包括 $S$ 等过程符号）
> - $S\in V-\Sigma$ 是开始符号
> - $R$ 是生成规则的集合，是 $(V-\Sigma)\times V^*$ 的一个**有限**子集

!!!Note
	**Regular Expression and CFG**

	- 两者都是 **generation** devices
	- $L$ 是一个正则语言当且仅当存在正则表达式 $\alpha$, $L=L(\alpha)$
	- $L$ 是一个上下文无关语言(**CFL**)当且仅当存在 CFG $G$, $L=L(G)$

> **Theorem**
>
> 所有正则语言都是上下文无关语言(CFL)

#### **Proof**

对于一个正则语言对应的DFA $M=(K,\Sigma,\delta,s,F)$

构造一个CFG $G=(V,\Sigma,R,S)$ ，满足：

- $V=K\cup\Sigma$
- $\Sigma = \Sigma$
- $S=s$
- $R=\{q\rightarrow ap:\delta(q,a)=p\}\cup\{q\rightarrow e:q\in F\}$

![3-1](pic/3-1.png)

#### **Regular Expression VS CFG** 

|                                       | Regular Expression（正则表达式）               | Context-Free Grammar（上下文无关文法）      |
| ------------------------------------- | ---------------------------------------------- | ------------------------------------------- |
| **生成工具 (Generation Device)**      | Regular Expression                             | Context-Free Grammar                        |
| **识别工具 (Recognition Device)**     | Finite Automata (有限自动机, FA)               | Pushdown Automata (下推自动机, PDA)         |
| **生成语言类型 (Generated Language)** | Regular Language (正则语言)                    | Context-Free Language (CFL, 上下文无关语言) |
| **等价关系 (Equivalence)**            | FA ↔ Regular Expression                        | PDA ↔ CFG                                   |
| **非所属语言 (Not in this Class)**    | Not Regular Language                           | Not Context-Free Language                   |
| **判定方法 (Non-Membership Test)**    | Pumping Lemma for Regular Languages (抽引引理) | Pumping Lemma for CFLs (CFL 抽引引理)       |

#### **Remark**

- 在 $V-\Sigma$ 中的符号被称为非终止符(nonterminals)，对于所有 $A\in V-\Sigma$ 和 $u\in V^*$，满足 $A\rightarrow _Gu\Leftrightarrow (A,u)\in R$
- $u\Rightarrow _Gv\Leftrightarrow\exists x,y\in V^*,A\in V-\Sigma$，满足 $u=xAy,v=xv'y,A\rightarrow _Gv'$  
- $\Rightarrow^*_G$ 是 $\Rightarrow_G$ 的自反、传递闭包
- 关于 $G$ 的**Derivation**: $w_0\Rightarrow_G w_1\Rightarrow_G … \Rightarrow_G w_n$，$n$是derivation的长度
- 由 $G$ 产生的语言: $L(G)=\{w\in\Sigma^*:S\Rightarrow^*_G w\}$

!!!Note
	证明CFG $G$ 和 语言 $L$ 等价(e.g. $L$ 是 context-free):  $w\in L\Leftrightarrow w\in L(G)$ 。	
	可使用归纳法。



## 3.2 Parse Tree

CFG $G=(S,V,\Sigma,R)$ 的一个 derivation可以用**符号树(parse tree)**来表示:

- 叶节点：终止符
- 根节点：开始符
- 节点：$V$ 中的元素

![3-2](pic/3-2.png)

其中：

- 叶节点构成输出
- 终止符只出现在叶节点
- 过程变量只能出现在中间节点
- 最终的字符串由终止符从左到右组合生成

> **Definition**
>
> 定义 derivations 的相似性



















