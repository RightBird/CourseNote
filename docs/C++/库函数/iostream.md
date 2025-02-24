## iostream库

包含两个基础类型**istream**（输入流）和**ostream**（输出流）。

### 输入

- 标准输入`std::cin`

```C++
//以下两行代码等价
std::cin >> v1 >> v1;
(std::cout >> v1) >> v2;
```

​	`std::cin`遇到文件结束符(end-of-file)或遇到一个无效输入时，状态会变为无效，即存在以下用法:

```c++
if(std::cin >> v1)
while(std::cin >> v1)
```

### 输出

- 标注输出 `std::cout`
- 标准错误(see-err) `std::cerr`
- 一般性信息(see-log) `std::clog`

```C++
//以下两行代码等价
std::cout << "Enter two numbers" << std::endl;
(std::cout << "Enter two numbers") << std::endl;
```

### 运算符

- 输入运算符 `>>`
- 输出运算符 `<<`

!!!Note
	`cin`等属于C++中预定义的对象，在使用时作为**输入运算符(>>)**的左侧运算对象。

