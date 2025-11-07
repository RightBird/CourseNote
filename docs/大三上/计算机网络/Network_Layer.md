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

目的地的 **Sink Tree** 是所有通往该目的地的最短路径的并集。

例如对于下图，Sink Tree 为：

- A→B→C→E
- B→C→E
- C→E
- H→C→E
- D→E
- F→E
- G→F→E (G→B→C→E)

![4-5](pic/4-5.png)

根据最优性原则，每个节点的转发表只要记录对于每一个目的地的下一跳就可以了。

#### Dijkstra Algorithm

用于求解单源最短路问题（所有边的权重必须为非负值），使用贪心算法。先把所有节点都标记为不确定tentative，其他节点的距离设为无穷大（源节点设为0）。

当不确定节点还存在时：

- 从未确定节点里找出一个距离最近的 `n`
- 对 `n` 的所有邻居节点 `v`：
  如果 `dist[n] + weight(n, v) < dist[v]`，
  就更新 `dist[v]`，表示找到了更短的路径。
- 把节点 `n` 标记为“已确定”，不再改变它的距离。

![4-6](pic/4-6.png)

在 Dijkstra 算法中，每 $i$ 轮需要搜索 $n-i+1$ 个节点，即一共需要搜索 $(n+1)n/2$ 次。因此时间复杂度为 $O(n^2)$ 。

#### The Oscillation Problem with the LS Algorithm

当多个节点根据相同的网络状态独立计算最短路径，并根据结果改变其链路代b价或转发方向时，整个网络可能进入一个**反复改变、永不稳定的状态**，这就是振荡问题。

![4-7](pic/4-7.png)

### The Distance Vector (DV) Routing Algorithm

DV算法具有以下三个特性： 

- **Distributed** : 每个节点从一个或多个直接邻居接收信息，执行计算后将结果分发回邻居节点。
- **Iterative** : 该过程持续进行直至邻居节点间不再交换信息，具有自终止特性。
- **Asynchronous** : 无需所有节点同步操作。

> #### **Bellman-Ford Equation**
> 
> 设 $d_x(y)$ 为从节点 $x$ 到节点 $y$ 的最小成本路径的成本。则最小成本由著名的> **Bellman-Ford**方程关联：
> 
> $$
> d_x(y)=\min\{c(x,v)+d_v(y)\}
> $$
> 
> 其中 $v$ 取自与 $x$ 相邻的所有节点。
> 
> **Example** ![4-8](pic/4-8.png)

算法的基本思想是每个节点 $x$ 都对于所有 $N$ 个节点初始化 $D_x(y)$ 值，即从自身到节点 $y$ 的最小成本路径的估计值。用 $\mathbf{D}_x(y)=[D_x(y): y\text{ in }N]$ 表示节点 $x$ 的成本估计向量（距离向量）。在 DV 算法中，每个节点 $x$ 都需要维护以下信息：

- 对于每一个邻居节点 $v$ ，维护 $x$ 到 $v$ 的直接距离 $c(x,v)$
- 维护成本估计向量，即 $\mathbf{D}_x(y)$
- 每一个邻居 $v$ 的成本估计向量 $\mathbf{D_v(y)}$

当 $x$ 接收了来自任意邻居节点 $v$ 的新的距离向量，则保存 $v$ 的向量，并对应地使用 Bellmen-Ford 公式来更新自己的距离向量。
$$
D_x(y)=\min\{c(x,v)+D_v(y)\}
$$
若节点 $x$ 的距离向量因本次更新发生变化，则节点 $x$ 将向所有邻居发送更新后的距离向量，邻居节点据此更新自身的距离向量。

只要所有节点持续以异步方式交换距离向量，每个成本估计值 $D_x(y)$ 都将收敛至 $d_x(y)$。

![4-9](pic/4-9.png)

#### The Count-to-Infinity Problem

当节点 $x$ 告知节点 $y$ 存在某条路径时，节点 $y$ 无法判断自身是否位于该路径上。

![4-10](pic/4-10.png)

在(b)的第二行中，B未收到来自A的任何消息，但C声称拥有通往A的路径，因此B到A的延迟变为3。此时B并不知晓C的路径恰恰经过自身节点。

### LS vs DV

#### Message Complexity

- **LS**: $n$ 个节点, $E$ 个连接，一共发送 $O(nE)$ 条消息
- **DV**: 只在邻居之间发送

#### Speed of Convergence

- **LS**: $O(n^2)$ 算法，需要 $O(nE)$ 条消息
- **DV**: 时间不确定，存在**Count-to-Infinity**问题

#### Robustness

（路由器故障时会发生什么）

- **LS**: 节点可能广播错误链路成本；每个节点都只计算自己的路由表（只影响自己，鲁棒性强）
- **DV**: 节点可能广播错误链路成本；节点路由表被其他节点使用；错误在网络中传播（鲁棒性弱，容易振荡）

### Hierarchical Routing

网络可能无法让每台路由器都存储所有其他路由器的条目。因此路由必须采用分层方式实现。使用分层路由时，路由器会被划分为若干区域(**rigions**)。

最常见的分层单位叫做 **Autonomous System(AS)**。每个路由器仅知道自身AS内数据包转发至目的地的完整细节，对其他AS的内部结构一无所知。

![4-11](pic/4-11.png)

同一个AS内的路由器使用相同的路由协议，即**Intra-AS**路由协议。不同的AS中可以使用不同的Intra-AS路由协议。

直接与其他AS的路由器连接的被称为 **Gateway router**(网关路由器)，比图上图中的1B和1C。

根据Kamoun and Kleinrock (1979)的发现，在有 $N$ 个路由器的网络结构中，最优的网络层级数是 $\log N$。

### Broadcast Routing

在广播路由中，网络层提供将源节点发送的数据包传递至网络中所有其他节点的服务。

#### Uncontrolled flooding

发送节点向每个目的地发送独立的数据包副本，是实现广播通信最简单直接的方式之。

**优点**: 实现简单，不需要新的网络层路由协议

**缺点**: 效率低；源节点需要完整的目标列表；Broadcast storm。

#### Controlled flooding

**Sequence-number-controlled flooding**。

- 源节点将自身地址（或其他唯一标识符）及广播序列号放入广播数据包，随后将该数据包发送至所有邻居节点。
- 每个节点都维护着一份列表，记录其已接收、复制并转发的每个广播数据包的源地址和序列号。
- 当节点接收到广播数据包时，首先检查该数据包是否存在于列表中。若存在则丢弃；若不存在，则复制该数据包并转发至所有邻居节点。

**Reverse Path Forwarding(RPF)**

当广播数据包到达路由器时，路由器会检查该数据包是否通过通常用于向广播源发送数据包的链路抵达。若属实，则该广播数据包极有可能遵循了从路由器出发的最佳路径，因而被认为是首个抵达该路由器的副本。在此情况下，路由器会将其副本转发至除原始链路外的所有链路。但若广播数据包通过非首选链路抵达，则会被视为可能的重复数据包而丢弃。

**优点**: RPF仅需知道其单播最短路径上下一跳邻居节点。它仅利用该邻居的身份来决定是否泛洪接收到的广播数据包，无需记忆序列号。

![4-12](pic/4-12.png)

#### Spanning tree:

生成树包含图中所有节点，且不包含环路。当源节点发送广播数据包时，会通过所有属于生成树的入链路发送该数据包。接收广播数据包的节点将转发该数据包至生成树中所有邻居节点。节点无需了解完整树结构，只需识别图中哪些邻居属于生成树邻居即可。

生成树方法的主要困难在于生成树的创建与维护。以下是基于中心的生成树构建方法：

- 首先定义一个中心节点(**rendezvous point/core**)
- 节点向中心节点单播发送**tree-join messages**。树接入消息通过单播路由向中心转发，直至抵达已属于生成树的节点或到达中心节点。树接入消息所经过的路径定义了节点到中心节点的路径。

![4-13](pic/4-13.png)

### Multicast Routing

向规模明确、数量庞大但相对于整个网络而言较小的群体发送消息。

在实际应用中，已采用两种方法来确定多播路由树(**multicast routing tree**)。

**Source-based tree**

为每个发送者（source）建一棵独立的多播树。

- 为多播组中的每个源构建专属的多播路由树。

- 使用反向路径转发(RPF)算法构建从源 $x$ 出发的多播数据报的转发树。

**Group-shared tree**

整个多播组（group）共用一棵树。

- 类似于生成树广播，组共享树的多播路由基于构建一个包含所有连接至多播组的边缘路由器的树。
- 所有沿路径传递JOIN消息的路由器将会将接收到的多播数据包转发给发起多播加入请求的边缘路由器（中心型树）。

#### Internet Multicast Routing

在 Internet 中，每个多播组(multicast group) 都用一个 **Class D IP 地址** 表示。

组的成员关系由 **IGMP(The Internet Group Management Protocol) 协议** 管理。

Internet 中网络层的多播由两个部分组成：IGBP 和 多播路由协议。

IGMP只有三种消息类型，每种消息都包含一个IP数据报，其中<u>IP protocol number为2</u>，三种消息分别为：

- **membership-query message**: 由路由器向所有主机广播，用于确定该接口上已加入的所有多播组成员。主机在首次加入多播组时，也可以主动生成成员查询消息，而无需等待路由器的查询。  
- **membership-report message**: 主机的响应。
- **leave-group message**: 可选的。当主机停止响应具有特定组地址的成员查询消息时，即表示其已不再属于该多播组。 

Distance-vector multicast routing protocol (**DVMRP**) 实现了基于源的树结构，采用反向路径转发和剪枝机制。

Protocol-Independent Multicast (**PIM**)路由协议明确区分两种多播分发场景：PIM 密集模式是一种洪泛和剪枝的反向路径转发技术，其工作原理类似于 DVMRP；PIM 稀疏模式利用会合点（rendezvous points）建立多播分发树结构。

### Anycast Routing

- Unicast —— 单一目的地
- Broadcast —— 到所有目标
- Multicast —— 到一组目标

**Anycast**一种网络寻址与路由技术，**多个服务器共享同一IP地址**，路由到**“最近”或最易达**的服务器，依据路由协议（如BGP）实现。  

- 因为这些服务器不在一个广播域内，所以不会引起IP地址冲突。
- 在仅仅配置相同IP外，还需要借助BGP协议进行地址宣告，通过BGP，各个站点向Internet宣告相同的AnyCast IP地址。

![4-14](pic/4-14.png)

无需为任播设计新的路由方案，因为常规距离矢量和链路状态路由算法能够生成任播路由。例如，如果我们对组1的成员进行任播，他们都会被分配相同的地址“1”，而不是不同的地址。距离矢量路由将像往常一样传播路向信息，节点将选择到目的地“1”的最短路径。这将导致节点向最近的“1”实例发送数据。这一机制之所以有效，是因为路由协议未识别到存在多个“1”实例。



## The network layer in the Internet



