# Chapter3  Arithmetic for Computer 

## **数字格式**

| Sign Magnitude | One's Complement（反码） | Two's Complement（补码） |
| :------------: | :----------------------: | :----------------------: |
|    000 = +0    |         000 = +0         |         000 = +0         |
|    001 = +1    |         001 = +1         |         001 = +1         |
|    010 = +2    |         010 = +2         |         010 = +2         |
|    011 = +3    |         011 = +3         |         011 = +3         |
|    100 = -0    |         100 = -3         |         100 = -4         |
|    101 = -1    |         101 = -2         |         101 = -3         |
|    110 = -2    |         110 = -1         |         110 = -2         |
|    111 = -3    |         111 = -0         |         111 = -1         |

**Two's Biased notation（偏码）:**

$$
\begin{align*}
&通常：[X]_b＝~2^n~＋~Ｘ\\
\\
&IEEE~754: [X]_b＝~2^n-1~＋~Ｘ&&&&&&&&&&&&&&&&&&&&&&&&&\\
\end{align*}
$$

## **Integer**

### **Adder**

### **Carry Lookahead Adder (CLA)**

$$
\begin{align*}
C_1&=G_0+P_0C_0\\\\
C_2&=G_1+P_1C_1=G_1+P_1(G_0+P_0C_0)\\\\
&=G_1+P_1G_0+P_1P_0C_0\\\\
C_3&=G_2+P_2C_2=G_2+P_2(G_1+P_1G_0+P_1P_0C_0)\\\\
&=G_2+P_2G_1+P_2P_1G_0+P_2P_1P_0C_0\\\\
G_4&=G_3+P_3G_3=G_3+P_3(P_2G_1+P_2P_1G_0+P_2P_1P_0C_0)\\\\
&=G_3+P_3P_2G_1+P_3P_2P_1G_0+P_3P_2P_1P_0C_0&&&&&&&&&&&\\\\
\end{align*}
$$

<img src="./pic/4.png" alt="4" style="zoom: 50%;" /> 

### **Multiplier**

**• Booth's Algorithm**

 **操作:最后一位补0**

$$
\begin{align*}
1~0:~&左半部分减乘数，右移结果\\
1~1:~&右移结果\\
0~1:~&左半部分加乘数，右移结果\\
0~0:~&右移结果&&&&&&&&&&&&&&&&&&&&&&&&\\
\end{align*}
$$

**Example**

$2\times (-3)=-6$

$0010\times 1101=1111~1010$

<img src="./pic/5.png" alt="5" style="zoom:22%;" /> 

### **Division** 

**Example: 7 / 2**

<img src="./pic/6.png" alt="6" style="zoom: 50%;" /> 

符号数相除：转出同符号相除，最后添加符号

除以0：overflow

## **Floating Point**

### **IEEE标准**

<img src="./pic/9.png" alt="image-20240924144105636" style="zoom: 33%;" /> 

$X=(-1)^S+(1+Fraction)\times2^{(Exponent-Bias)}~~~~~~~~~~$

S：符号位（0正1负）

Exponent:指数部分

• single:8bits        Bias=127

• double:11bits       Bias=1023

Fraction: 小数部分

• single: 23 bits

• double: 52 bits

### **范围**

$$
\begin{align*}
Sing&le:\\
&Samlles:\pm1.0\times2^{-126}\approx\pm1.2\times10^{-38}\\
&Largest:\pm2.0\times2^{+127}\approx\pm3.4\times10^{38}\\
Doub&le:\\
&Samlles:\pm1.0\times2^{-1022}\approx\pm2.2\times10^{-308}\\
&Largest:\pm2.0\times2^{+1023}\approx\pm1.8\times10^{308}&&&&&&&&&&&&&&&&&\\
\end{align*}
$$

### **Denormal Numbers**

$$
\begin{align*}
&Exponent=000……0\\\\
\Rightarrow&X=(-1)^S+(0+Fraction)\times2^{(Exponent-Bias)}&&&&&&&&&&&&&&&\\
\end{align*}
$$

### **Infinity**

$$
Exponent = 111...1,~~~Fraction = 000...0~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$$

### **NANs**

$$
Exponent = 111...1,~~Fraction ≠ 000...0~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$$

### **Addition**

**Example:   $9.999\times10^1 + 1.610 \times 10^{-1}$**
<img src="./pic/7.png" alt="7" style="zoom:33%;" /> 

!!!NOTE
    **大数吃小数**
$$
	\begin{aligned}
    &计算\frac{1}{1}+\frac{1}{2}+\frac{1}{3}+……+\frac{1}{n},\\\\
    &for(i=n;i>=1;i--)~~精度大于			~~for(i=1;i<=n;i++)&&&&&&&&&&&&&&&&
    \end{aligned}
$$

### **Multiplication**

$$
(s_1 \times 2^{e_1}) \times (s_2 \times 2^{e_2})  = (s_1 \times s_2) \times 2^{e_1+ e_2}~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$$



**Example:   $0.5_{ten}\times-0.4375_{ten}~\Rightarrow~1.000_{two}\times2^{-1}\times-1.110_{two}\times2^{-2}$**

<img src="./pic/8.png" alt="8" style="zoom: 40%;" /> 

### **Sticky Bit**

- **guard bit**: 保留最低位的后第一位
- **round bit**: 保留最低位的后第二位
- **sticky bit**: 若round bit后全为0则为0，否则为1

若guard bit为1且round bit和sticky bit有一个为1，则结果进位；否则不进位。