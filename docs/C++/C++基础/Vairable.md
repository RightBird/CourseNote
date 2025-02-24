

# 变量

### 初始化

```C++
int units_sold = 0;
int a(0);
//以下为C++11引入新特性
int Units_sold{0};
int units_sold = {0};
```

!!!Note
	前两种初始化赋值错误时编译器会拒绝初始化需求，即丢失数据；后两种使用花括号初始化如果赋值错误编译器会报错。
	

### 声明

变量声明用于多文件工程。

```c++
extern int i; //声明i而非定义i
int j;		  //声明并定义j
```

!!!Note
	变量可以多次声明，但是只能定义一次。



### 引用

即为对象另起一个名字。在修改引用变量时，被引用变量的值会同步修改。

```c++
int ival = 1024;
int &refVal = ival;  //refVal指向ival
int &refVal2;		 //报错：引用必须被初始化
```



### 指针

```C++
int *p = nullptr; //C++11引入，等价于 int *p = 0;
```

!!!Note
	尽量nullptr而非NULL。

#### void* 指针

一种特殊的指针，可以存放任意对象的地址，但是不能访问内存空间中所存的对象。

```c++
double obj = 3.14, *pd = &obj;
void *pv = &obj;
pv = pd;
```

!!!Note
	不能定义指向引用的指针，但是存在对指针的引用。

	指针是对象但是引用不是.



### Const限定符

使用Const限定符定义的变量的值不能被改变。

```c++
const int bufSize = 512;
```

!!!Note
	const定义的变量仅在当前文件有效，如需多文件共享，需要添加extern。

#### 指针与引用

指针和引用也需要使用const。

```c++
const double pi = 3.14;
const double &r = pi;
const double *ptr = &pi;
```

#### 常量指针

必须初始化。一旦初始化完成后，指针所指向的地址不能再改变。

```c++
const double *const pip = &pi;
```

#### 顶层const

- **顶层const**：指针本身是个常量。
- **底层const**：指针所指的对象是个常量。

```c++
int i = 0;
int *const p1 = &i; 	   //不能改变p1的值,顶层const
const int ci = 42;		   //不能改变ci的值,顶层const
const int *p2 = &c2;	   //允许改变p2的值.底层const
const int *const p3 = p2;  //靠右的为顶层const,靠左的为底层const
const int &r = ci;		   //用于声明引用的const为底层const
```



### constexpr和常量表达式

**常量表达式**指值不会改变并且在编译过程就能得到计算结果的表达式。

```c++
const int max_file = 20;		//max_file是常量表达式
const int limit = max_file + 1;	//limit是常量表达式
int staff_size = 27;			//staff_size不是常量表达式
```

#### constexpr变量(C++11引入)

声明常量表达式，且值必须在编译时确定，可以定义常量表达式函数。（const可以在运行时确定）

```c++
constexpr int mf = 20;			//20是常量表达式
constexpr int limit = mf + 1;	//mf + 1是常量表达式
constexpr int sz = size();		//只有当size是一个constexpr函数是正确
```

!!!Note
	常量表达式的计算往往发生在程序的编译阶段，这可以极大提高程序的执行效率，因为表达式只需要在编译阶段计算一次，节省了每次程序运行时都需要计算一次的时间。

#### constexpr修饰函数

```c++
constexpr int square(int n) {
    return n * n;  // 编译时常量表达式
}

int main() {
    int a = square(5);  // 编译时计算，a = 25
}
```

#### 指针和constexpr

`constexpr`声明定义指针，仅对指针有效，与指针所指对象无关。

```c++
const int *p = nullptr;		//p是指向整型常量的指针
constexpr int *q = nullptr; //q是指向整数的常量指针
```

!!!Note
	`constexpr`指针的初始值必须是nullptr或0或存储于某个固定地址中的对象。



### 类别别名

#### typedef

```C++
typedef double wages;	//wages是double的同义词
typedef wages base,*p;	//base是double的同义词，p是double*的同义词
```

#### 别名声明

```c++
using SI = Sales_item; 	//SI是Sales_item的同义词
```

#### 指针

```c++
typedef char *pstring;
const pstring cstr = 0;	//cstr是指向char的常量指针
const pstring *ps;		//ps是一个指针，对象是指向char的常量指针
const char *cstr = 0; 	//与第2行不同，cstr是指向char常量的指针
```



### auto类型说明符

（C++11标准引入）

利用编译器来推算变量类型。

```c++
auto item = val1 + val2; //由val1和val2相加结果判断item类型
```

`auto` 在一条声明语句中只能有一个基本类型。

```c++
auto i = 0, *p = &i;	//正确：i为整型，p为整型指针
auto sz = 0, pi = 3.14;	//错误：sz和pi的类型不同
```

!!!Note
	auto会忽略顶层const，保留底层const。



### decltype类型指示符

（C++11标准引入）

从表达式的类型推断出要定义的变量的类型。

```c++
const int ci = 0, &cj = ci;
decltype(ci) x = 0;			//x的类型是const int
decltype(cj) y = x;			//y的类型是const int&，y绑定到变量x
decltype(cj) z;				//错误：z是一个引用，必须初始化
```

#### decltype与引用

```c++
int i = 42, *p = &i, &r = i;
decltype(r + 0) b;		//正确：加法结果是int，b为未初始化的int
decltype(*p) c;			//错误：c是int&，必须初始化
```

- 双层括号用法

```c++
decltype((i)) d;	//错误：d是int&，必须初始化
decktype(i) e;		//正确：e是一个为初始的int
```

!!!Note
	decltype((variable))的结果永远是引用，而decltype(variable)结果只有当variable本身就是一个引用时才是引用。



### 自定义数据结构

基本等同于C语言的结构体

```c++
struct Sales_data{
	std::string bookNo;
	unsigned units_sold = 0;
	double revenue = 0.0;
};
```



### 自定义头文件

#### 头文件保护符

- `#define`：把一个名字设定为预处理变量。
- `#ifdef`：当且仅当变量已定义时为真。
- `#ifndef`：当且仅当变量未定义时为真。

```c++
#ifndef SALES_DATA_H
#define SALES_DATA_H
#include<string>
struct Sales_data{
	std::string bookNo;
	usigned units_sold = 0;
	double revenue = 0.0;
};
#endif
```

!!!Note
	预处理变量无视C++语言中关于作用域的规则。