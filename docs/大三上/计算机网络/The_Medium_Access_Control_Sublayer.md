# The Medium Access Control Sublayer

## Key Issue

!!!Note
	MAC子层是数据链路层的一部分

![3-1](pic/3-1.png)

网络连接可以被分为两类：

- Point-to-Point connections
- Broadcasting channels: Multi-access channels / random access channels

在任何广播网络中，关键问题在于如何在频道存在竞争时确定谁能使用该频道。

- 用于确定Multi-access channel中下一个发送者的协议属于数据链路层下的一个子层，即 **MAC(Medium Access Control)** sublayer
- MAC子层在**局域网(LANs)**中尤为重要，尤其是无线局域网，因为无线信道本质上是广播信道。

## The Channel Allocation Problem

### Static Channel Allocation

- **FDMA**: 如果有 $N$ 个用户，则带宽被分成 $N$ 个等大的部分，每个用户拥有一部分带宽。这种方式简单高效但是当发送方规模大并且变化大时会出现问题，并且会因为突发性而导致阻塞。

对于静态通道分配的performance，可以使用简单的队列理论来分析。

#### Preliminary Queueing Theory

对于一个系统，记

- $C$ : 系统可以正常工作的最大传输速率(capacity)

- $S$ : 系统工作时需要的平均速率

则当 $R<C$ 时系统可以满足需求，否则系统的容量不足。但是在实际情况下 $R<C$ 时也会由于需求的不规律性而导致系统无法满足需求。

队列理论主要基于两个**不可预测**的变量:

- **the arrival times**: 用户到达系统的时间（不规律）
- **the service times**: 需求不同导致的系统需要处理的时间不同

到达时间和服务时间的特征化及其对排队现象影响的评估构成的队列理论的核心。

接下来用 $C_n$ 表示第 $n$ 个用户, $\tau_n$ 表示用户到达的时间，$x_n$ 表示用户需要的服务时间，则用户到达的间隔时间 $t_n=\tau_n-\tau_{n-1}$，由此可以定义两个随机变量：

- $\tilde{t}$ ：间隔时间
- $\tilde{x}$：服务时间

根据这两个随机变量可以构造对应的分布函数(probability distribution function, **PDF**)

- $A(t)=P[\tilde{t}\leq t]$
- $B(x)=P[\tilde{x}\leq x]$

对应的可以得到密度函数(probability density function, **pdf**)

- $a(t)=\frac{dA(t)}{dt}$
- $b(x)=\frac{B(x)}{dx}$

根据这些函数，可以定义两个新的变量：

- 平均到达率：$\frac1\lambda=E[\tilde{~t~}]$
- 平均服务率：$\frac1\mu=E[\tilde{~x~}]$

!!!Supplyment
	根据 $a(t)$ 和 $b(x)$ 的设定，可以把队列分成三种

	- elementary queueing theory：初级队列理论
	- intermediate queueing theory：中级队列理论
	- advanced queueing theory：高级队列理论

>  为了更简单地描述不同的系统，可以用一个三元表达式来表达 **A/B/m** ：A表示到达时间的分布；B表示服务时间的分布；m表示队列系统有m个服务器。

A和B主要指下面几种分布：

- **M**: exponential

- **Er**: r-stage Erlangian

- **Hr**: r-stage Hyperexponential

- **D**: Deterministic

- **G**: General

对于一个普遍的系统 G/G/1，定义**利用率(utilization factor)** $\rho=\lambda\tilde{x}$ 。在多服务系统 G/G/m 中，对应的利用率为 $\rho=\frac{\lambda\tilde{x}}{m}$。利用率表示了系统被使用的比例：

- 一个**稳定(stable)**的系统在任何情况下都可以满足 $0\leq \rho <1$
- $\rho$ 越接近1，则说明系统的队列越大，等待时间越长。

在一个系统中，平均时间简单来说是由服务时间和等待时间构成的，记等待时间为 $W$，则有
$$
T=\tilde{x}+W
$$

> **Little's Result**
>
> 是一种联系系统中用户数与到达率和平均延迟的方法，定义在系统中的平均用户数为 $\overline{N}=\lambda T$ ，则平均队列大小 $\overline{N_q}=\lambda W$。
>
> - 对于 G/G/m，$\overline{N_q}=\overline{N}-m\rho$（可以理解为系统中平均的客户数减去正在被服务的客户数）

另一种联系方法是通过系统的输入和输出率函数的累加来表示。

- $E_k$ 表示系统中有 $k$ 个用户的状态
- $P_k(t)=P[N(t)=k]$ 表示中时间 $t$ 时系统中 $E_k$ 状态的概率

则 $\frac{dP_k(t)}{dt}$ 表示 $t$ 时间用户的流动率（流入率-流出率）

对于 M/M/1 队列，系统的输入是一个 Poisson input，则 $P_k(t)=\frac{(\lambda t)^k}{k!}e^{-\lambda t}$，于是有
$$
\overline{N(t)}=\sum^{+\infty}_{k=0}kP_k(t)=\lambda t
$$
接下来考虑稳态的情况，系统中有 $k$ 个用户的概率 $p_k=(1-\rho)\rho^k$，则系统中的评价用户数：
$$
\overline{N}=\sum^{+\infty}_{k=0}kp_k=\frac{\rho}{1-\rho}
$$
根据 **Little's Result**，以及 $\rho=\lambda\tilde{x}=\lambda/\mu$，可以得到
$$
T=\overline{N}/\lambda=\frac{\frac{\rho}{1-\rho}}{\lambda}=\frac{1/\mu}{1-\rho}
$$
根据流动函数也同样可以得出 $W=\overline{N_q}/\lambda=(\overline{N}-m\rho)/\lambda=\frac{\rho/\mu}{1-\rho}$，
$$
T=\tilde{x}+W=\frac{1}{\mu}+\frac{\rho/\mu}{1-\rho}=\frac{1/\mu}{1-\rho}
$$
![3-2](pic/3-2.png)

#### Performance of Static FDM

对于一个capacity为 $C$ bps的通道，假设平均到达率为 $\lambda$ frames/sec，帧的平均长度为 $1/\mu$ bits，则平均服务时间 $\tilde{x}=\frac{1/\mu}{C}=\frac{1}{\mu C}$

根据队列理论中 M/M/1 队列的结论以及 $\rho=\lambda\tilde{x}$ ，平均延迟为
$$
T=\frac{\tilde{x}}{1-\rho}=\frac{1}{\mu C-\lambda}
$$
接下来把单通道分别分配到 $N$ 个通道，即每个通道的capacity为 $C/N$ bps，则平均输入率变为 $\lambda/N$ ，根据 M/M/m 队列，平均延迟为
$$
T_N=\frac{1}{(\mu C/N)-(\lambda/N)}= \frac{N}{\mu C -\lambda}=NT
$$
从中可以看出FDMA的平均延迟比所有帧有序排列在中央队列中要差N倍。

### Dynamic Channel Allocation

- **Statistical Multiplexing**

所有动态信道分配方法均基于以下五个关键假设：

- **独立流量(Independent Traffic)**：模型由N个独立站点（如计算机、电话）组成，每个站点均配备生成传输帧的程序或用户。帧生成后，该站点将被阻塞直至帧成功传输。帧生成具有不可预测性，但保持恒定速率。
- **单一信道(Single Chnnel)**：仅存在一条可用信道。所有终端均可在此信道上传输数据并接收数据。假设各终端能力均等。
- **可观测碰撞(Observable Collisions)**：若两个数据帧同时传输，将发生时间重叠导致碰撞。所有终端均能实时检测碰撞事件。发生碰撞的数据帧必须稍后重新传输。（有线信道与无线信道的区别）
- **Continuous or Slotted Time**：帧传输可在任意时刻开始，或必须在slot开始时启动。一个slot可能包含0、1个或多个帧，分别对应空闲时隙、成功传输或碰撞。
- **Carrier Sense or No Carrier Sense**：采用载波侦听机制时，节点可在尝试使用信道前判断信道状态。当侦测到信道繁忙时（有线信道），任何节点均不会尝试占用该信道。若无载波侦听机制，节点在尝试使用信道前无法感知信道状态，仅能直接发送数据，事后才能判断传输是否成功（无线信道）。

## Multiple Access Protocols

### ALOHA

**ALOHA** 是一种**随机接入协议（Random Access Protocol）**，具有以下特点：

- **随机发送**：终端有数据就发送，而不需要等待特定时间或轮到自己。
- **冲突检测与重发**：如果两个或多个终端同时发送导致数据碰撞（collision），发送端会等待一个**随机时间**后重发数据。
- **中央广播/反馈机制**（原始 ALOHA）：中央计算机接收数据后，会将数据广播给所有终端(**Rebrocast**)，发送端通过接收广播判断发送是否成功。

#### Pure ALOHA

完全随时发送，无时隙限制。

![3-3](pic/3-3.png)

假设平均每个帧时间内期望产生的帧数量为 $G$，实际产生的帧数量为 $k$

根据泊松分布， $P(k)=\frac{G^ke^{-G}}{k!}$ ( $G\sim\lambda t$ )

对于纯 ALOHA，帧发送成功的条件是前后两个帧时间内都没有帧发送，而两个帧时间对应的平均期望帧数应为 $2G$ ，概率分布为 $P(k)=\frac{(2G)^ke^{-2G}}{k!}$，则 $P_0=e^{-2G}$

定义通道吞吐量，即单位时间成功传输的帧数： $S=G P_0=Ge^{-2G}$

求导求可得 $G=0.5$ 时取到最大值 $S=0.5e^{-1}=0.1839$

**即最好情况下，Pure ALOHA的信道利用率约为 18.39%**

#### Slotted ALOHA

帧发送被限制到时隙，只能在时隙开始时发送。

![3-4](pic/3-4.png)

对应的通道吞吐量为 $S=Ge^{-G}$，在 $G=1$ 时取到最大值 $S=e^{-1}=0.368$

**即最好情况下，Slotted ALOHA的信道利用率约为 36.8%**

![3-5](pic/3-5.png)

接下来考虑**通道负载**，假设一次传输需要 $k$ 次尝试，则 $P_k=e^{-G}(1-e^{-G})^{k-1}$

传输次数的期望为 $E=\sum^{+\infty}_{k=1}kP_k=e^G$

即重传次数与 $G$ 是指数关系，那么 $G$ 一个很小的增加都会给通道带来巨大的负载。

### Carrier Sense Multiple Access Protocols

- **Carrier Sense Protocols**: 终端会监听 carrier 并据此采取行动的协议

#### 1-persistent CSMA

- 当一个终端需要传输数据时，先监听通道内有无其他终端正在传输

- 如果通道空闲，则传输；否则持续监听直到通道空闲，然后传输

- 如果发生collision，则终端等待一个随机时间然后重新开始

由于通道空闲时通道的传输率位1，这个协议被称为**1-persistent CSMA**

#### Nonpersistent CSMA

- 当一个终端需要传输数据时，先监听通道内有无其他终端正在传输
- 如果通道空闲，则传输；否则，终端不会持续监听，而是**在一个随机时间后重新执行算法**

该算法相比于1-persistent CSMA有更高的通道利用率但是也会导致更大的传输延迟。

#### p-persistent CSMA

- 该协议用于**时隙通道(slotted channels)**
- 如果通道空闲，则以 $p$ 的概率发送，以 $q=1-q$ 的概率推迟到下一个slot
- 如果通道被占用，则等到下一个slot再执行算法
- 重复执行直到成功发送

![3-6](pic/3-6.png)

#### CSMA with Collision Detection(CSMA/CD)

发送端在发送的同时持续监听返回的信号，如果不一致 ，则说明发生了collision，立即终止传输。

CSMA/CD模型的传输过程可以分成三个时期：竞争期(contention period)、传输期(transmission period)、空闲期(idle period)。竞争期多个终端同时访问通道，最后某个终端成功占用通道，进入传输期，传输结束后进入空闲期。

![3-7](pic/3-7.png)

在最坏情况下，假设两个最远的终端之间的传输时间为 $\tau$ 

- 在 $t_0$ 时间时，第一个终端发送信息
- 取一个很小的 $\epsilon$ ，第二个终端在 $t_0+\tau-\epsilon$ 时还没有检测到碰撞，发送信息。
- 第二个终端刚发出时就收到了第一个终端的信息，检测到碰撞，立即停止
- 但是第一个终端需要等到 $t_0+2\tau-\epsilon$ 才能接收到碰撞信息。

于是可以把 CSMA/CD 的竞争看成一个时隙长度为 $2\tau$ 的 slotted ALOHA 系统。

### Collision Free Protocols

#### A Bit-Map Protocol —— Reservation Protocol

- 每个竞争期包含恰好N个时隙。
- 节点 $j$ 可通过在第 $j$ 时隙插入1位来宣告其有帧要发送。当所有N个时隙经过后（即竞争期结束），每个节点便完全知晓哪些节点希望传输。
- 此时，进入传输期，它们开始按数字顺序传输帧。
- 由于所有节点都知晓下一个发送者，因此永远不会发生冲突。
- 当最后一个准备就绪的节点完成帧传输后，将启动另一个N时隙竞争期

![3-8](pic/3-8.png)

#### Token Passing

- 将名为令牌(token)的小型消息按预定义顺序从一个站传递至下一个站。
- 终端接收令牌时已有待传输帧，可在传递令牌前发送该帧。
- 问题：帧也会沿令牌传递方向传输。如此它们将在环形网络中循环，最终抵达目标站。然而为防止帧像令牌般无限循环，需由特定节点将其移出环路。该节点可能是：帧完成完整环路后返回的原始发送节点，或帧的实际目标接收节点。
- 令牌传递机制无需物理环形网络，只需设定一个逻辑环路即可。

![3-9](pic/3-9.png)

#### Binary Countdown

Bit-Map Protocol 和 Token Passing 在网络终端过多时都效果都不理想。Binary Countdown可以解决这个问题。

- 每个终端都有一个地址，在传输消息前先在通道里广播从高位到低位自己的地址。
- 使用逻辑 **OR 运算** 来比较发送的比特。（通道优先接收1）
- 发送0的终端接收到1时自动放弃传输。
- 地址大的终端的优先级高于地址地的终端。

### Limited-Contention Protocols

!!!Note
	两个衡量通道表现的参数是：1. 低负载时的延迟 2. 高负载时的效率

融合竞争协议与无碰撞协议的优势特性。

在现有的竞争协议下，每个终端都以 $p$ 的概率竞争通道。假设有 $k$ 个终端参与竞争，则有终端竞争成功并发送消息的概率为 $kp(1-p)^{k-1}$（1个终端成功，k-1个终端失败）

根据这个式子，可以得到概率值最大时应该取 $p=\frac{1}{k}$

![3-10](pic/3-10.png)

从图中可以看出终端数大于5之后成功率快速降低逼近 1/e。因此只有减少竞争数量才能提高成功通信的概率。于是

- 把站点划分成多个组
- 仅允许组内的成员去竞争对应的时隙。如果出现时隙空闲或发生冲突，则让把时隙给下一组竞争。
- 通过合理分组可降低各时隙的竞争强度，使每个时隙运行状态接近图中左端区域。
- 低负载时每个时隙分配多个站点，高负载时则分配少量站点

#### The Adaptive Tree Walk Protocol

把每个终端看出二叉树里的叶子节点

![3-11](pic/3-11.png)

- 负载越重，搜索就应从树的更深层开始。

### Wireless LAN Protocols

CSMA/CD无法在802.11无线网络中使用。无线网络存在以下几个问题：

- **Different Coverage Areas**: 无线网络的传输只有附近的站点可以接收到，不能使用carrier sense
  ![3-12](pic/3-12.png)

- **The Hidden Terminal Problem**: 节点A和节点C在向节点B发送消息时属于隐藏终端，节点A与节点C无法相互通信以协调行动。因此，若两者同时向节点B发送消息，则消息将在节点B处发生冲突。
  ![3-13](pic/3-13.png)

- **The Exposed Terminal Problem**: 节点B和节点C在分别向节点A和节点D发送消息时处于暴露终端状态，由于节点B和节点C处于彼此的无线电覆盖范围内，因此它们能够互相接收信号，产生不必要的冲突。
  ![3-14](pic/3-14.png)

- **Nodes Cannot Hear while Sending**: 在无线系统中，某一站点的接收信号可能极其微弱，其强度或许仅为传输信号的百万分之一。无线局域网节点在发送消息时几乎无法接收任何信号，无法实时检监测冲突。

#### MACA(Multiple Access with Collision Avoidance)

使用一个简单的握手，协议规则：

- 发送节点发送RTS（请求发送，附带帧长度）
- 接收节点回复CTS（允许发送，附带帧长度）
- 发送节点传输帧，同时听到CTS的节点保持静默

在RTS/CTS仍然可能会发生冲突，但是冲突发生率大大减小。

![3-15](pic/3-15.png)

A范围内任何监听到RTS的站点必须保持一段时间静默来确保CTS的传输。B范围内任何监听到CTS的站点必须保持一段时间静默来确保数据的传输。



