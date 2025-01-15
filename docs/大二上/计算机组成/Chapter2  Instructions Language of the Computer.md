# **Chapter2  Instructions: Language of the Computer**

## **RISC-V assembly language** 

### **Arithmetic**

<table style="table-layout: fixed; width: 100%;">
  <thead>
    <tr>
      <th style="width: 20%;"><strong>Instruction</strong></th>
      <th style="width: 20%;"><strong>Example</strong></th>
      <th style="width: 25%;"><strong>Meaning</strong></th>
      <th style="width: 35%;"><strong>Comments</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>add</td>
      <td>add x5,x6,x7</td>
      <td>x5 = x6 + x7</td>
      <td>Add two source register operands</td>
    </tr>
    <tr>
      <td>subtract</td>
      <td>sub x5,x6,x7</td>
      <td>x5 = x6 - x7</td>
      <td>First source register subtracts second one</td>
    </tr>
    <tr>
      <td>add immediate</td>
      <td>addi x5,x6,20</td>
      <td>x5 = x6 + 20</td>
      <td>Used to add constants</td>
    </tr>
  </tbody>
</table>



### **Data transfer**
<table style="table-layout: fixed; width: 100%;">
  <thead>
    <tr>
      <th style="width: 20%;"><strong>Instruction</strong></th>
      <th style="width: 20%;"><strong>Example</strong></th>
      <th style="width: 25%;"><strong>Meaning</strong></th>
      <th style="width: 35%;"><strong>Comments</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>load doubleword</td>
      <td>ld x5, 40(x6)</td>
      <td>x5 = Memory[x6 + 40]</td>
      <td>doubleword from memory to register</td>
    </tr>
    <tr>
      <td>store doubleword</td>
      <td>sd x5, 40(x6)</td>
      <td>Memory[x6 + 40] = x5</td>
      <td>doubleword from register to memory</td>
    </tr>
    <tr>
      <td>load word</td>
      <td>lw x5, 40(x6)</td>
      <td>x5 = Memory[x6 + 40]</td>
      <td>word from memory to register</td>
    </tr>
    <tr>
      <td>load word, unsigned</td>
      <td>lwu x5, 40(x6)</td>
      <td>x5 = Memory[x6 + 40]</td>
      <td>Unsigned word from memory to register</td>
    </tr>
    <tr>
      <td>store word</td>
      <td>sw x5, 40(x6)</td>
      <td>Memory[x6 + 40] = x5</td>
      <td>word from register to memory</td>
    </tr>
    <tr>
      <td>load halfword</td>
      <td>lh x5, 40(x6)</td>
      <td>x5 = Memory[x6 + 40]</td>
      <td>Halfword from memory to register</td>
    </tr>
    <tr>
      <td>load halfword, unsigned</td>
      <td>lhu x5, 40(x6)</td>
      <td>x5 = Memory[x6 + 40]</td>
      <td>Unsigned halfword from memory to register</td>
    </tr>
    <tr>
      <td>store halfword</td>
      <td>sh x5, 40(x6)</td>
      <td>Memory[x6 + 40] = x5</td>
      <td>halfword from register to memory</td>
    </tr>
    <tr>
      <td>load byte</td>
      <td>lb x5, 40(x6)</td>
      <td>x5 = Memory[x6 + 40]</td>
      <td>byte from memory to register</td>
    </tr>
    <tr>
      <td>load byte, unsigned</td>
      <td>lbu x5, 40(x6)</td>
      <td>x5 = Memory[x6 + 40]</td>
      <td>Unsigned byte from memory to register</td>
    </tr>
    <tr>
      <td>store byte</td>
      <td>sb x5, 40(x6)</td>
      <td>Memory[x6 + 40] = x5</td>
      <td>byte from register to memory</td>
    </tr>
    <tr>
      <td>load reserved</td>
      <td>lr.d x5, (x6)</td>
      <td>x5 = Memory[x6]</td>
      <td>Load; 1st half of atomic swap</td>
    </tr>
    <tr>
      <td>store conditional</td>
      <td>sc.d x7, x5, (x6)</td>
      <td>Memory[x6] = x5; x7 = 0/1</td>
      <td>Store; 2nd half of atomic swap</td>
    </tr>
    <tr>
      <td>Load upper immediate</td>
      <td>lui x5, 0x12345</td>
      <td>x5 = 0x12345000</td>
      <td>Loads 20-bits constant shifted left 12 bits</td>
    </tr>
  </tbody>
</table>


### **Logical**
<table style="table-layout: fixed; width: 100%;">
  <thead>
    <tr>
      <th style="width: 20%;"><strong>Instruction</strong></th>
      <th style="width: 20%;"><strong>Example</strong></th>
      <th style="width: 25%;"><strong>Meaning</strong></th>
      <th style="width: 35%;"><strong>Comments</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>and</td>
      <td>and x5, x6, 3</td>
      <td>x5 = x6 & 3</td>
      <td>Arithmetic shift right by register</td>
    </tr>
    <tr>
      <td>inclusive or</td>
      <td>or x5, x6, x7</td>
      <td>x5 = x6 | x7</td>
      <td>Bit-by-bit OR</td>
    </tr>
    <tr>
      <td>exclusive or</td>
      <td>xor x5, x6, x7</td>
      <td>x5 = x6 ^ x7</td>
      <td>Bit-by-bit XOR</td>
    </tr>
    <tr>
      <td>and immediate</td>
      <td>andi x5, x6, 20</td>
      <td>x5 = x6 & 20</td>
      <td>Bit-by-bit AND reg. with constant</td>
    </tr>
    <tr>
      <td>inclusive or immediate</td>
      <td>ori x5, x6, 20</td>
      <td>x5 = x6 | 20</td>
      <td>Bit-by-bit OR reg. with constant</td>
    </tr>
    <tr>
      <td>exclusive or immediate</td>
      <td>xori x5, x6, 20</td>
      <td>x5 = x6 ^ 20</td>
      <td>Bit-by-bit XOR reg. with constant</td>
    </tr>
  </tbody>
</table>


### Shift

<table style="table-layout: fixed; width: 100%;">
  <thead>
    <tr>
      <th style="width: 20%;"><strong>Instruction</strong></th>
      <th style="width: 20%;"><strong>Example</strong></th>
      <th style="width: 25%;"><strong>Meaning</strong></th>
      <th style="width: 35%;"><strong>Comments</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>shift left logical</td>
      <td>sll x5, x6, x7</td>
      <td>x5 = x6 &lt;&lt; x7</td>
      <td>Shift left by register</td>
    </tr>
    <tr>
      <td>shift right logical</td>
      <td>srl x5, x6, x7</td>
      <td>x5 = x6 &gt;&gt; x7</td>
      <td>Shift right by register</td>
    </tr>
    <tr>
      <td>shift right arithmetic</td>
      <td>sra x5, x6, x7</td>
      <td>x5 = x6 &gt;&gt; x7</td>
      <td>Arithmetic shift right by register</td>
    </tr>
    <tr>
      <td>shift left logical immediate</td>
      <td>slli x5, x6, 3</td>
      <td>x5 = x6 &lt;&lt; 3</td>
      <td>Shift left by immediate</td>
    </tr>
    <tr>
      <td>shift right logical immediate</td>
      <td>srli x5, x6, 3</td>
      <td>x5 = x6 &gt;&gt; 3</td>
      <td>Shift right by immediate</td>
    </tr>
    <tr>
      <td>shift right arithmetic immediate</td>
      <td>srai x5, x6, 3</td>
      <td>x5 = x6 &gt;&gt; 3</td>
      <td>Arithmetic shift right by immediate</td>
    </tr>
  </tbody>
</table>

!!!NOTE
    **sra（算数右移）：**右移，最高位补符号位
    
    **srl（逻辑右移）：**右移，最高位补0



### **Conditional branch**

<table style="table-layout: fixed; width: 100%;">
  <thead>
    <tr>
      <th style="width: 20%;"><strong>Instruction</strong></th>
      <th style="width: 20%;"><strong>Example</strong></th>
      <th style="width: 25%;"><strong>Meaning</strong></th>
      <th style="width: 35%;"><strong>Comments</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>branch if equal</td>
      <td>beq x5, x6, 100</td>
      <td>if(x5 == x6) go to PC+100</td>
      <td>PC-relative branch if registers equal</td>
    </tr>
    <tr>
      <td>branch if not equal</td>
      <td>bne x5, x6, 100</td>
      <td>if(x5 != x6) go to PC+100</td>
      <td>PC-relative branch if registers not equal</td>
    </tr>
    <tr>
      <td>branch if less than</td>
      <td>blt x5, x6, 100</td>
      <td>if(x5 &lt; x6) go to PC+100</td>
      <td>PC-relative branch if registers less</td>
    </tr>
    <tr>
      <td>branch if greater or equal</td>
      <td>bge x5, x6, 100</td>
      <td>if(x5 &gt;= x6) go to PC+100</td>
      <td>PC-relative branch if registers greater or equal</td>
    </tr>
    <tr>
      <td>branch if less, unsigned</td>
      <td>bltu x5, x6, 100</td>
      <td>if(x5 &lt; x6) go to PC+100</td>
      <td>PC-relative branch if registers less, unsigned</td>
    </tr>
    <tr>
      <td>branch if greater or equal, unsigned</td>
      <td>bgeu x5, x6, 100</td>
      <td>if(x5 &gt;= x6) go to PC+100</td>
      <td>PC-relative branch if registers greater or equal, unsigned</td>
    </tr>
  </tbody>
</table>



### **Unconditional branch**
<table style="table-layout: fixed; width: 100%;">
  <thead>
    <tr>
      <th style="width: 20%;"><strong>Instruction</strong></th>
      <th style="width: 20%;"><strong>Example</strong></th>
      <th style="width: 25%;"><strong>Meaning</strong></th>
      <th style="width: 35%;"><strong>Comments</strong></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>jump and link</td>
      <td>jal x1, 100</td>
      <td>x1=PC+4 ; go to PC + 100</td>
      <td>PC-relative procedure call</td>
    </tr>
    <tr>
      <td>jump and link register</td>
      <td>jalr x1, 100(x5)</td>
      <td>x1=PC+4 ; go to x5 + 100</td>
      <td>procedure return; indirect call</td>
    </tr>
  </tbody>
</table>





## **$\blacktriangledown$  Register Operands**

**32 registers in RISC-V**（越少越快，寄存器个数一般不超过32个）

**64 bits (doubleword) for each register in RISC-V**




## **$\blacktriangledown$ RISC-V register conventions（约定）**

| Name    | Register  name | Usage                          | Preserved  On  call? |
| ------- | -------------- | ------------------------------ | -------------------- |
| x0      | 0              | The  constant value 0          | n.a.                 |
| x1(ra)  | 1              | Return  address(link register) | yes                  |
| x2(sp)  | 2              | Stack  pointer                 | yes                  |
| x3(gp)  | 3              | Global  pointer                | yes                  |
| x4(tp)  | 4              | Thread  pointer                | yes                  |
| x5-x7   | 5-7            | Temporaries                    | no                   |
| x8-x9   | 8-9            | Saved                          | yes                  |
| x10-x17 | 10-17          | Arguments/results              | no                   |
| x18-x27 | 18-27          | Saved                          | yes                  |
| x28-x31 | 28-31          | Temporaries                    | no                   |



## **$\blacktriangledown$ RISC-V 指令格式**

![13](./pic/13.png)

### **R-format**

![1](pic/1.png)

| **Instruction** | **Opcode** | **Funct3** | **Funct6/7** |
| --------------- | ---------- | ---------- | ------------ |
| add             | 0110011    | 000        | 0000000      |
| sub             | 0110011    | 000        | 0100000      |
| sll             | 0110011    | 001        | 0000000      |
| xor             | 0110011    | 100        | 0000000      |
| srl             | 0110011    | 101        | 0000000      |
| sra             | 0110011    | 101        | 0000000      |
| or              | 0110011    | 110        | 0000000      |
| and             | 0110011    | 111        | 0000000      |
| lr.d            | 0110011    | 011        | 0001000      |
| sc.d            | 0110011    | 011        | 0001100      |

#### **I-format**

<img src="./pic/2.png" alt="2" style="zoom:150%;" />

| **Instruction** | **Opcode** | **Funct3** | **Funct6/7** |
| --------------- | ---------- | ---------- | ------------ |
| lb              | 0000011    | 000        | n.a.         |
| lh              | 0000011    | 001        | n.a.         |
| lw              | 0000011    | 010        | n.a.         |
| ld              | 0000011    | 011        | n.a.         |
| lbu             | 0000011    | 100        | n.a.         |
| lhu             | 0000011    | 101        | n.a.         |
| lwu             | 0000011    | 110        | n.a.         |
| addi            | 0010011    | 000        | n.a.         |
| slli            | 0010011    | 001        | 000000       |
| xori            | 0010011    | 100        | n.a.         |
| srli            | 0010011    | 101        | 000000       |
| srai            | 0010011    | 101        | 010000       |
| ori             | 0010011    | 110        | n.a.         |
| andi            | 0010011    | 111        | n.a.         |
| jalr            | 1100111    | 000        | n.a.         |

### **S-format**

![3](pic/3.jpg)

| **Instruction** | **Opcode** | **Funct3** | **Funct6/7** |
| --------------- | ---------- | ---------- | ------------ |
| sb              | 0100011    | 000        | n.a.         |
| sh              | 0100011    | 001        | n.a.         |
| sw              | 0100011    | 010        | n.a.         |
| sd              | 0100011    | 111        | n.a.         |

### **U-format**

![10](pic/10.jpg) 

| **Format** | **Instruction** | **Opcode** | **Funct3** | **Funct6/7** |
| ---------- | --------------- | ---------- | ---------- | ------------ |
| U-type     | lui             | 0110111    | n.a.       | n.a.         |

### **SB-format**

例：bne x10, x11, 2000

![11](./pic/11.jpg) 

| **Instruction** | **Opcode** | **Funct3** | **Funct6/7** |
| --------------- | ---------- | ---------- | ------------ |
| beq             | 1100011    | 000        | n.a.         |
| bne             | 1100011    | 001        | n.a.         |
| blt             | 1100011    | 100        | n.a.         |
| bge             | 1100011    | 101        | n.a.         |
| bltu            | 1100011    | 110        | n.a.         |
| bgeu            | 1100011    | 111        | n.a.         |

!!!NOTE
	immediate为13位（imm[0]=0）
	

	跳转范围$-2^{12}~\sim~2^{12}$

### **UJ-format**

例：jal x0, 2000 

![12](./pic/12.jpg)

| **Instruction** | **Opcode** | **Funct3** | **Funct6/7** |
| --------------- | ---------- | ---------- | ------------ |
| jal             | 1101111    | n.a.       | n.a.         |



!!!NOTE
	immediate为21位（imm[0]=0）
	

	跳转范围$-2^{20}~\sim~2^{20}$





## **汇编程序书写**

### **Six steps**

1. Place Parameters in a place where the procedure can access them

2. Transfer control to the procedure

3. Acquire the storage resources needed for the procedure

4. Perform the desired task

5. Place the result value in a place where the calling program can access it 

6. Return control to the point of origin 

### **寄存器使用**

• **Preserved**  $\Rightarrow$  子函数保护

• **Not Preserved**  $\Rightarrow$  主函数(caller)保护，子函数(callee)不需保护

| **Preserved**                        | **Not preserved**                        |
| :----------------------------------- | :--------------------------------------- |
| Saved registers:  **x8–x9, x18–x27** | Temporary registers:  **x5–x7, x28–x31** |
| Stack pointer register:  **x2 (sp)** | Argument/result registers:  **x10–x17**  |
| Frame pointer:  **x8 (fp)**          |                                          |
| Return address:  **x1 (ra)**         |                                          |
| Stack above the stack pointer        | Stack below the stack pointer            |



## **Addition**

### 寻址方式

$\bullet$  **Register addressing:**                     add x5,x6,x7

$\bullet$  **Base addressing:**                            ld x5,100(x6)

$\bullet$  **Immediate addressing:**                addi x5,x6,4

$\bullet$  **PC-relative addressing:**                beq x5,x6,L1

### **Two principles of stored-program computers**
$\bullet$  Use instructions as numbers

$\bullet$  Use alterable memory for programs

### **Four design principles**
$\bullet$  Simplicity favors regularity

$\bullet$  Smaller is faster

$\bullet$  Good design demands good compromises

$\bullet$  Make the common case fast

