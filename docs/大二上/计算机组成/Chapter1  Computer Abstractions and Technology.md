# **Chapter1  Computer Abstractions and Technology**

## **CPU Time**

Cycle Per Instruction **(CPI)**：执行一条指令所需的周期数（平均时可为小数）  
CPU Clock Cycles：时钟周期数  
Clock Cycle Time：每个时钟的时间  
Clock Rate：时钟速率  
Instruction Count **(IC)**：指令数

$$
\begin{align*}
CPU~Time&=CPU~Clock~Cycles\times Clock~Cycle~Time\\\\
&=\frac{CPU~Clock~Cycles}{Clock~Rate}\\\\
&=Instruction~Count\times CPI \times Clock~Cycle~Time\\\\
&=\frac{Instruction~Count\times CPI}{Clock Rate}&&&&&
\end{align*}
$$

$$
\begin{align*}
Average~CPI&=\frac{Clock~Cycles}{Instruction~Count}\\\\
&=\frac{\sum^n_{i=1}(CPI_i\times Instruction~Count_i)}{Instruction~Count}&&&&&&&&&
\end{align*}
$$

## **MIPS: Millions of Instructions Per Second**

$$
\begin{align*}
MIPS&=\frac{Instruction~Count}{Execution~Time\times 10^6}\\\\
&=\frac{Instruction~Count}{\frac{instruction~Count\times CPI}{Clock~Rate}\times 10^6}\\\\
&=\frac{Clock~Rate}{CPI\times 10^6}&&&&&&&&&&&&&&&
\end{align*}
$$

