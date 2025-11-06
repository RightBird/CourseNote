# Network Layer

## Overview of network layer

### Two Important Network LayerFunctions

网络层的主要任务是将数据包（packet）从发送主机传送到接收主机。

每个路由器都有一个转发表(**forwarding(internal, routing) table**)。转发表通过数据包头中的目标地址(**destination address**)或所属连接标识(**indication of connection**)进行索引。

#### Forwarding

路由器的主要功能。

- 转发(forwarding)指在**单台路由器**内部，将数据包从入站链路转移至出站链路。
- 转发是 **router-local操作**。

#### Routing

为每一个路由器建立转发表

- 路由涉及整个网络的路由器，它们通过路由协议(**routing protocols**)的集体交互确定数据包从源节点到目标节点传输的路径。路由算法决定了路由器转发表中插入的值。
- 路由是 **network-wide**过程。(可采用集中式/分布式)

### Network Layer Design Issues

包括为传输层提供的服务以及网络的内部设计。

- **Store-and-forward Packet Switching**: 数据包在路由器中存储，直至其完整到达且链路通过校验完成处理。随后它沿路径转发至下一台路由器，直至到达目标主机并完成交付。
  ![4-1](pic/4-1.png)

### Services Provided to the Transport Layer

#### Design goals

- 服务应独立于路由技术
- 传输层应该与现有的路由器数量、类型、拓扑保持隔离
- 网络地址应该采用统一的编码方案

#### Connection-oriented & Connecitionless service

争议焦点：网络层应提供面向连接服务还是无连接服务。

- internet community: Connectionless service
- telephone company: Connection-oriented

#### Implementation of Connectionless Service

数据包被单独注入网络，并相互独立地进行路由。这些数据包(packet)通常被称为数据报(**datagram**)。

每个路由器都有一个**转发表**，每条表项由一对信息组成：目标地址及其对应的出站线路。![4-2](pic/4-2.png)

#### Implementation of Connection-Oriented Service

每个数据包都携带一个标识符，表明其所属的虚拟电路。

路由器A会为不同连接分配不同标识符，即使它们可能使用相同的虚拟电路——Lable Switching(**MPLS**, MultiProtocol LS)![4-3](pic/4-3.png)

### Virtual-Circuit vs. Datagram Networks

| Issue            | Datagram Networks                    | Virtual-circut Network                       |
| ---------------- | ------------------------------------ | -------------------------------------------- |
| 电路建立         | 不需要                               | 需要                                         |
| 寻址方式         | 每个数据包包含完整的源地址和目的地址 | 每个数据包包含短的虚电路号                   |
| 状态信息         | 路由器不维护连接状态信息             | 每个虚电路需要在路由器上占用连接表空间       |
| 路由方式         | 每个数据包独立路由                   | 虚电路建立时选择路由；所有数据包遵循同一路由 |
| 路由器故障的影响 | 无，除了故障期间丢失的数据包         | 所有经过故障路由器的虚电路都会终止           |
| 服务质量         | 困难                                 | 容易（如果能为每个虚电路预先分配足够资源）   |
| 拥塞控制         | 困难                                 | 容易（如果能为每个虚电路预先分配足够资源）   |



## Routing algorithms

在数据报中，最佳路由可能会在上一次使用而发生改变。而在虚电路中，只有在建立新虚电路时才对路由进行决策。

在设计中，理想的特性有：**correctness**, **simplicity**, **robustness**, **stability**, **fairness** and **efficiency**.

路由算法可以被分为全局路由(**Global routing**)算法和分布式(**decentralized**)算法：

- 全局路由算法利用完整的全局网络来计算源节点和目标节点之间的least-cost路径。(**LS**(Link-state) 算法，适合小规模网络)
- 分布式算法，通过迭代和分布式的方式计算least-cost路径。(**DV**(Distance-vector)算法，更适合大规模网络)

路由算法的第二种广泛分类方式是根据其静态或动态特性进行划分。

- **Static routing algorithms**(non-adaptive): e.g.人工手动编辑路由器的转发表
- **Dynamic routing algorithms**(adaptive):  能响应网络变化，但更易受路由环路和路径振荡等问题影响

### Static routing

**Example**

![4-4](pic/4-4.png)

### The Link-State (LS) Routing Algorithm

在 LS 算法中，网络拓扑结构和所有链路成本是已知的，即作为链路状态算法的输入参数。在实际实现上，通过让每个节点向网络中所有其他节点广播(**broadcast**)链路状态数据包来完成，每个链路状态数据包包含其连接链路的标识和成本。

- 例如，Internet 的 **OSPF** 路由协议就是通过 LS 广播算法实现的。

需要保证<u>所有节点对网络的认知完全一致且完整</u>。每个节点运行链路状态算法后，计算出的最小成本路径集与其他节点完全相同。

- 比较有名的 LS 算法是 **Dijkstra's** 算法（计算一个节点到其他所有节点的least-cost路径）。

这里需要用到的算法为最短路算法，通常路径的cost可以用以下数据来衡量：

- 跳数 (number of hops)
- 延迟
- 距离
- 带宽
- 通信成本 (communication cost)
- 平均流量 (average traffic)

**最优性原则**：若路由器J位于路由器I到路由器K的最优路径上，则从J到K的最优路径也必经此路线。

#### Sink Tree







