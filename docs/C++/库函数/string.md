# string库

### 定义和初始化

```c++
string s1;
string s2(s1);		//s2是s1的副本
string s2 = s1;		//等价于s2(s1)
string s3("value");	//s3是字面值"value"的副本
string s3 = "value";//等价上一行
string str{"hello"};//C++11引入
string s4(n, 'c');	//把s4初始化为由连续n个字符c组成的串
```

### 其他构造方法

```c++
string s(cp, n);			//s是cp指向的数组中的前n个字符组成的字符串，此数组至少有n个字符
string s(s2, pos2);			//s是string s2从下标pos2开始的字符的拷贝。
							//若pos>s2.size()，构造函数的行为未定义
string s(s1, pos2, len2);	//s是string s2从下表pos2开始len2个字符的拷贝
							//不管len2值为多少，至多拷贝s2.size()-pos2个字符
```

- 示例

  ```c++
  const char *cp = "Hello World!!!";	//以空字符结束的数组
  char noNull[] = {'H', 'i'};			//不是以空字符结束
  string s1(cp);						//s1为"Hello World!!!"
  string s2(noNull, 2);				//s2为"Hi"
  string s3(noNull);					//未定义，noNull不以空字符结尾
  string s4(cp + 6, 5);				//s4为"World"
  string s5(s1, 6, 5);				//s5为"World"
  string s6(s1, 6);					//s6为"World!!!"
  string s7(s1, 6, 20);				//s7为"World!!!"
  string s8(s1, 16);					//out_of_range异常
  ```

### string对象的操作

#### 基本操作

- 将s写到输出流os当中，返回os

  ```c++
  os << s;
  ```

- 从is中读取字符串赋给，字符串以空白分割，返回is

  ```c++
  is >> s;
  ```

- 从is中读取一行赋给s，返回is

  ```c++
  getline(is, s);
  ```

- s为空时返回true，否则返回false

  ```c++
  s.empty()
  ```

- 返回s中的字符数

  ```c++
  auto len = s.size()  //len的类型是string::size_type
  s.length()	//基本等价
  ```

- 返回s中第n个字符的引用，从0开始计

  ```c++
  s[n]
  ```

- 返回s1和s2连接后的结果

  ```c++
  s1 + s2
  string s6 = s1 + "," + "world";		//正确
  string s7 = "hello" + "," +s2;		//错误：不能把字面值直接相加
  ```

- 用s2的副本代替s1中原来的字符

  ```c++
  s1 = s2
  ```

- 如果s1和s2中所含的字符完全一样，则相等

  ```C++
  s1 == s2
  s1 != s2
  ```

- 利用字符在字典中的顺序进行比较

  ```c++
  <, <=, >, >=
  ```

#### 修改操作

- substr操作
  `s.sbustr(pos, n)`返回一个string，包含`s`中从`pos`开始的n个字符的拷贝。`pos`默认值为0。`n`默认值为`s.size()-pos`，即从`pos`开始的所有字符

  ```c++
  string s("hello world");
  string s2 = s.substr(0, 5);		//s2 = "hello"
  string s3 = s.substr(6);		//s3 = "world"
  string s4 = s.substr(6, 11);	//s4 = "world"
  string s5 = s.substr(12);		//out_of_range异常
  ```

- insert操作

  ```c++
  s.insert(s.size(), 5, '!');		//在s末尾插入5个'!'
  s.insert(0, s2);				//在s中位置0之前插入s2的拷贝
  s.insert(0, s2, 0, s2.size());	//在s[0]之前插入s2中s2[0]开始的s2.size()个字符
  ```

- erase操作

  ```c++
  s.erase(s.size() - 5, 5);		//从s删除最后5个字符 	
  ```

- assign操作

  ```c++
  s.assign(args);		//将s中的字符替换为args指定的字符，返回对s的引用
  ```

- append操作

  ```c++
  s.append(args);		//将args追加到s，返回对s的引用
  ```

- replace操作

  ```c++
  s.replace(pos, len, args)	//将从下标pos开始长度为len的字符串替换为args
  ```

#### 查找操作

```c++
s.find(args)				//查找s中args第一次出现的位置
s.rfind(args)				//查找s中args最后一次出现的位置
s.find_first_of(args)		//在s中查找args中任何一个字符第一次出现的位置
s.find_last_of(args)		//在s中查找args中任何一个字符最后一次出现的位置
s.find_first_not_of(args)	//在s中查找第一个不在args中的字符
s.find_last_not_of(args)	//在s中查找最后一个不在args中的字符
```

其中的`args`为以下格式：

- `c, pos`：从s中位置pos开始查找字符c。pos默认为0
- `s2, pos`：从s中位置为pos开始查找字符串s2。pos默认为0
- `cp, pos`：从s中位置为pos开始查找指针cp指向的以空字符结尾的C风格字符串。pos默认为0。
- `cp, pos, n`：从s中位置为pos开始查找指针cp指向的数组的前n个字符。pos和n无默认值。

!!!Note
	若未找到，则返回值为`string:::npos`。

#### 数值转换

```c++
to_string(val)		//返回数值val的string表示

//返回s表示的数值。
//b表示转换所用的基数，默认是10
//p是size_t指针，用来保存s中第一个非数值字符的下表，默认为0，即函数不保存下标
stoi(s, p, b)		//int
stol(s, p, b)		//long
stoul(s, p, b)		//unsigned long
stoll(s, p, b)		//long lonog
stoull(s, p, b)		//unsigned long long
stof(s, p, b)		//float
stod(s, p, b)		//double
stold(s, p, b)		//long double
```



### 处理字符

#### 处理所有字符

- 输出所有字符

```c++
string str("some string");
for (auto c : str)
	cout << c << endl;
```

- 改变原字符串字符

```c++
//转换大写形式
string s("Hello World!!!");
for(auto &c : s)		//c是一个引用，因此赋值语句会改变s的值
	c = toupper(c);
```

#### 处理部分字符

- 把s的第一个词改大写

```c++
for (decltype(s.size()) index = 0; index != s.size() && !isspace(s[index]); ++index)
	s[index] = toupper(s[index]);
```



### cctype库

| 库函数        | 作用                                                         |
| ------------- | ------------------------------------------------------------ |
| `isalnum(c)`  | c为字母或数字时为真                                          |
| `isalpha(c)`  | c为字母时为真                                                |
| `iscntrl(c)`  | c为控制字符时为真                                            |
| `isdigit(c)`  | c为数字时为真                                                |
| `isgraph(c)`  | c不是空格但可以打印时为真                                    |
| `islower(c)`  | c为小写字母时为真                                            |
| `isprint(c)`  | c为可打印字符时为真（即c是空格或c具有可视形式）              |
| `ispunct(c)`  | c为标点符号时为真（即c不是控制字符、数字、字母、可打印空白中的一种） |
| `isspace(c)`  | c为空白时为真（即c是空格、横向制表符、纵向制表符、回车符、换行符、进纸符中的一种） |
| `isupper(c)`  | c为大写字母时为真                                            |
| `isxdigit(c)` | c为十六进制数字时为真                                        |
| `tolower(c)`  | 如果c是大写字母，输出对应小写字母；否则原样输出c             |
| `toupper(c)`  | 如果c是小写字母，输出对应大写字母；否则原样输出c             |
