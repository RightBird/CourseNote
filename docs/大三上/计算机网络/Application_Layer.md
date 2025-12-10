# Application Layer

## Overview

应用层协议通常就是应用程序的一部分，基于传输层构建分布式网络服务（DNS、Web）。

#### OSI Session/Presentasion Layers

![](pic/6-1.png)

#### Applications and Application Level Protocols

三个关键概念：

- Protocol
- Service model
- Interface

![](pic/6-2.png)

 网络应用不只是应用层协议，完整的网络应用包括三个部分：

- Client site
- Server site
- Application level protocol

不同应用对传输层（TCP/UDP）有不同的需求，主要取决于下面三个参数：

- **Data Loss**
- **Bandwidth**
- **Timing**

![](pic/6-3.png)![](pic/6-4.png)

## DNS (Domain Name System)

IP地址难以记住，并且变化频繁，因此引入了高级可读名称，以实现机器名称与地址的解耦。

DNS的本质是实现一个**分层域式命名方案**并构建**分布式数据库**系统实现主机名与网络地址的转换。为将名称映射至IP地址，应用程序需调用名为**解析器(resolver)**的库程序，并将名称作为参数传递。

- **查询与响应消息均以UDP数据包形式发送。**

由于存在以下问题，DNS服务器不能采用集中式设计：

- Single Point of Failure（单点故障）
- Traffic Volume（流量太大）
- Distant Name Server = Slow Response（远距离查询导致高延迟）
- **Scalability（不可扩展性）**

### Hierarchy of DNS Servers

DNS服务器服务器可以划分成三大类：

- **root** DNS servers
- **top-level domain** (**TLD**) DNS servers
- **authoritative** DNS servers

![](pic/6-5.png)

### Root Nameservers

根域名服务器(Root Nameservers)位于 **DNS 层级最顶端**，负责告诉客户端顶级域名（TLD）服务器的位置。每个“服务器”实际上是 **由多个服务器集群组成**。

大多数服务器都使用 **IP Anycast** 技术提供服务外：

- 同一 IP 地址在 **多个地理位置**上部署
- 可以使用 **anycast routing** 到达
- 数据包会被路由到 **最近的服务器实例**

### The DNS Name Space

DNS 的命名空间是 **分层（Hierarchical）的**，从最顶层的 **根（`.`）** 开始。

**Top-Level domains(TLDs)** 主要有两类

- 22+ **generic TLDs**: Initially .com, .edu, .gov, .mil, .org, .net等
- ~250 **country code TLDs**: 两个字符

![](pic/6-6.png)

### DNS Zones

为了避免集中式信息源的问题，DNS 将命名空间划分为 **不重叠的区域（nonoverlapping zones）**。**区域(Zone)**是命名空间中连续的部分。每个区域由一个或多个域名服务器管理。

![](pic/6-7.png)

![](pic/6-8.png)

### Domain Resource Records

每个域名，无论是单个主机还是顶级域名，都可能关联一组资源记录。这些记录构成了**DNS数据库**。当解析器向DNS提供域名时，返回的是与该名称关联的资源记录。DNS的主要功能是将域名映射到资源记录。

资源记录(resource record)是五元组，格式为: `Domain_name, Time_to_Live, Class, Type, Value`。

- **Domain_name**: 标识该记录所适用的域名。通常每个域名存在多条记录，且每个数据库副本都包含多个域名的信息。因此该字段是满足查询需求的**首要检索键**。
- **Time_to_live**: 反应记录的稳定性。大值表示信息高度稳定；小值表示信息容易变化。
- **Class**: <u>对于Internet信息，始终为 IN</u>。对于其他信息用其他编码，现实中很少见，
- **Type**: ![](pic/6-9.png)
  - `SOA`: 提供区域信息的主要来源名称，告诉 DNS 哪台服务器是该 zone 的主服务器。
  - `A`: 某个主机的接口的32位IPv4地址。
  - `AAAA`: 128位IPv6地址。
  - `MX`: 指定可接收特定域名邮件的主机名称。
  - `NS`: 指定域或子域的name server。该主机持有域数据库的副本。
  - `CNAME`: 允许创建别名（宏定义）。
  - `PTR`: 用于将名称与IP地址关联，用于反向解析(**reverse lookups**)，将 IP 地址映射回域名。
  - `SRV`: 指定某个域内的主机提供特定服务，比MX更通用。
  - `SPF`(Sender Policy Framework): 指定该域允许哪些服务器发送邮件，用于防止邮件伪造 / 垃圾邮件。
  - `TXT`: 最初的设计目的是让域名能够以任意方式标识自己。
- **Value**: 可以是数字、域名或ASCII字符串。其语义取决于记录类型。

![](pic/6-10.png)

### DNS Resolution

DNS协议允许把任何主机域名转换成IP地址，若解析失败，则从根域名服务器开始逐级向下查询区域。

![](pic/6-11.png)

#### Recursive Queries

客户端（通常是主机上的解析器 resolver）向一个 递归 DNS 服务器（通常是本地 DNS 服务器）发送一个 DNS 查询。全部查询操作由递归 DNS 服务器完成，客户端只需发送一次查询请求然后等待结果。（如上图左侧部分）

> 适用于客户端→本地 DNS

**优点**

- 简化客户端DNS解析器的处理流程。
- 递归DNS服务器可通过缓存优化查询过程。

**缺陷**

- 递归DNS服务器可能因接收大量请求而过载。
- 递归DNS服务器存在安全风险，如果递归DNS服务器收到恶意攻击，会导致网络钓鱼或将用户重定向至恶意网站等问题。

#### Iterative Queries

DNS解析器（通常为客户端DNS服务器）向不同DNS服务器发送一系列请求直至获得所需答案的过程。当DNS解析器发起迭代查询时，会从根DNS服务器开始。（如上图右侧部分）

> 适用于本地 DNS→root/TLD/权威

**流程**

1. 本地DNS先查询根DNS，根DNS只知道级域名（TLD）服务器（如.edu服务器），因此返回TLD服务器的IP地址
2. 本地DNS查询TLD，TLD提供washtington.edu域名的权威DNS服务器的IP地址。
3. 本地DNS查询权威DNS服务器，最终提供www.cs.washington.edu的IP地址。

**优点**

- 减轻除根服务器和顶级域名服务器外的DNS服务器负载，因为本地DNS解析器承担了大部分追踪转发的工作。
- 本地DNS服务器可为多个客户端缓存数据，提升性能。

**缺点**

- 由于解析器需向不同服务器发起多次请求并等待响应，处理过程可能更耗时。

### DNS Caching vs. Freshness

- 缓存可降低DNS解析延迟
- 缓存可减轻服务器负载
- 缓存会延迟更新
- 缓存将在一定时间后失效
- 信息缓存时长介于5分钟至72小时（TTL）

### Local Nameservers

通常由IT部门管理（企业、高校、ISP）。 客户端需能连接本地域名服务器，通常通过DHCP配置。

### DNS Protocol

**Query and Response Messages**

- DNS 查询与响应都**基于 UDP**，使用 **端口 53**。
- 使用 ARQ 机制保证可靠性，DNS 服务器是 stateless（无状态）的，服务器不保留客户端状态。
- 利用 **16-bit ID 字段**匹配

**Service reliability via replicas(副本)**

- 为域名运行多个域名服务器。
- 返回服务器列表；客户端仅使用其中一个响应。
- 同时有助于负载均衡

**Security**

- DNSSEC (DNS Security Extensions)



## FTP (File Transfer)

用于在本地主机与远程主机之间传输文件。

**流程**

- 用户首先提供远程主机的主机名，本地主机上的 FTP 客户端进程将与远程主机上的 FTP 服务器进程建立 TCP 连接。
- 然后，用户提供用户名和密码，这些信息将作为 FTP 命令的一部分通过 TCP 连接发送。
- 服务器验证用户身份后，用户将一个或多个存储在本地文件系统中的文件复制到远程文件系统中（反之亦然）。

FTP 使用**两个并行的 TCP 连接**，一个用于控制连接，一个用于数据连接。

- 控制连接：传输控制信息，比如用户名、密码、远程路径转移命令、put/get命令。即FTP的控制信息采用**out-of-band**的方式传输，独立于数据信息，命令与响应采用 **7-bit ASCII**。（**端口21**）
- 数据连接：用于发送文件。（**端口20**）

![](pic/6-12.png)

## Email (Electronic Mail)

Email是一种**异步(asynchronous)**的通信媒介。主要有三个组成部分：

- 用户代理（客户端，例如 Outlook、Gmail 网页版）
- 邮件传输代理（邮件服务器）
- 简单邮件传输协议：SMTP

![](pic/6-13.png)

### SMTP

SMTP 是互联网电子邮件的主要应用层协议。使用 TCP 的可靠数据传输服务将邮件从发件人的邮件服务器传输到收件人的邮件服务器。

与大多数应用层协议一样，SMTP 分为两部分：

- 客户端：在发件人的邮件服务器上运行
- 服务端：在收件人的邮件服务器上运行

<u>SMTP 的客户端和服务器端都运行在每个邮件服务器上。</u>

SMTP要求邮件消息只能是**7位 ASCII**，因此二进制多媒体数据在通过 SMTP 发送之前编码为 ASCII，到达后需要进行解码。

SMTP 发送邮件时一般不使用中间邮件服务器转发，传输流程如下：

- 客户端 SMTP通过 **TCP** 协议与服务器 SMTP的 **25 端口**建立连接。（如果服务器宕机，则在一段时间后重试）
- 连接建立后，服务器和客户端会执行一些应用层握手。在 SMTP 握手阶段，SMTP 客户端会提供发件人的电子邮件地址和收件人的电子邮件地址。
- SMTP 客户端和服务器完成相互验证后，客户端会发送邮件。如果客户端还有其他消息要发送到服务器，则会通过同一 TCP 连接重复此过程，否则断开TCP连接。

### Email Message Format

- Envelope: 封装了消息。它包含传输消息所需的所有信息，例如目标地址、优先级和安全级别。**消息传输代理使用信封进行路由**。
- Message：分为 **header** 和 **body** 两个部分，header包含用户代理的控制信息，body是供对方查看的内容。

![](pic/6-14.png)

#### Internet Message Format

![](pic/6-15.png)![](pic/6-16.png)

### User Agent

用户代理是一种程序（也称为“电子邮件阅读器”）,用于撰写、接收和回复邮件，以及操作邮箱，流行的用户代理有Google Gmail、Microsoft Outlook等。发送和接收的邮件存储在服务器上。

### MIME (The Multimedia Internet Mail Extension)

![](pic/6-17.png)

![](pic/6-18.png)

### Mail Access Protocols

SMTP 是 **推送（push）协议**，无法拉取(pull)信息。**Mail Access Protocol**用于**从收件服务器获取邮件**：

- **POP(端口110)**: 授权与下载，不维护会话状态，无法在服务器上直接管理邮件。
- **IMAP(端口143)**: 功能更强大，支持服务器端操作，可以操作服务器上的消息存储，维护用户状态（会话期间同步状态）。
- **HTTP**: 用户通过浏览器访问服务器，速度慢。



## HTTP (The HyperText Transfer Protocol)

Web的应用层协议，是Web的核心。

HTTP是一个简单的请求-响应协议，通常运行在 **TCP** 上运行。（HTTP 只负责传输数据，而不关心浏览器如何显示或执行网页内容）

**Web Page**（也称为document）由对象组成。对象就是一个文件，例如HTML文件、JPEG图像、Java小程序或视频片段等，可以通过单个URL访问。

### Web Context

![](pic/6-19.png)

### HTTP Context

HTTP是用于请求网页资源的请求-响应协议：

- 使用 **TCP** ，通常在 **端口80**
- 是浏览器/服务器应用程序的一部分，Web 浏览器（例如 Internet Explorer 和 Google 浏览器）实现了 HTTP 的客户端。
- HTTP 是一种无状态协议。（服务器将请求的文件发送给客户端，而不会存储任何关于客户端的状态信息。）

![](pic/6-20.png)

### Fetching a Web page with HTTP (the Client Side)

从网页的URL开始：![](pic/6-21.png)

**流程：**

- 将服务器名称解析为 IP 地址（DNS）
- 建立与服务器的TCP连接
- 发送HTTP请求，等待HTTP响应
- 执行/获取嵌入式资源/渲染 (不只是展示网页中内容，可能还要运行程序等)
- 清理空闲的 TCP 连接

URL 设计具有开放性，这意味着浏览器可以轻松地使用多种协议来获取不同类型的资源。

![](pic/6-22.png)

### The Server Side

**流程：**

- 接受来自客户端（浏览器）的TCP连接
- 获取页面路径，即所请求的文件名称
- 从磁盘获取文件
- 向客户端发送文件内容
- 释放TCP连接

![](pic/6-23.png)

![](pic/6-24.png)