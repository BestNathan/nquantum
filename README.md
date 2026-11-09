# nquantum — 量子计算研究工作台

> 一个以**证据、可比指标和可复现实验**为核心的开放研究项目。

nquantum 持续研究量子计算的基础原理、物理硬件、量子纠错、系统与软件栈、算法、产业化进程，以及潜在投资与应用价值。这里不是新闻转载站，也不把厂商的路线图等同于已经实现的能力。

## 研究框架

| 方向 | 核心问题 | 研究文档 |
| --- | --- | --- |
| 量子计算基础 | 量子比特、量子门、线路与复杂性到底是什么？ | [研究范围](research/01-foundations.md) |
| 硬件技术路线 | 超导、离子阱、中性原子、光量子如何比较？ | [硬件路线](research/02-hardware.md) |
| 纠错与容错 | 物理比特如何变成有意义的逻辑比特？ | [纠错与容错](research/03-error-correction.md) |
| 算法与应用 | 哪些任务可能存在有验证力的量子优势？ | [算法与应用](research/04-algorithms.md) |
| 系统与工具链 | 编译器、运行时、控制、云服务和 HPC 如何协同？ | [软件栈](research/05-software-systems.md) |
| 产业与商业化 | 企业、供应链、成本、商业模式与里程碑如何跟踪？ | [产业生态](research/06-industry.md) |
| 指标与实验 | 不同平台的性能数字能否公平比较？ | [研究方法](docs/METHODOLOGY.md) |

## 入口

- [研究范围和关键问题](docs/RESEARCH_PLAN.md)
- [方法论：证据等级、指标可比性、研究结论](docs/METHODOLOGY.md)
- [数据模型和采集规范](docs/DATA_MODEL.md)
- [Pages 产品与信息架构](docs/PAGES_DESIGN.md)
- [分阶段路线图](docs/ROADMAP.md)
- [可信来源与引用规则](docs/SOURCES.md)
- [研究工作台 Pages](https://bestnathan.github.io/nquantum/)（需先在仓库 Settings → Pages → Build and deployment 将 Source 设置为 **GitHub Actions**；发布与验证由 [Pages workflow](.github/workflows/pages.yml) 执行）

## 原则

1. **原始证据优先**：论文、实验补充资料、设备校准与官方接口高于媒体总结。
2. **时间与条件必填**：记录数据的观察日期、平台版本、实验设置与引用 URL。
3. **不可比不强比**：物理比特数、逻辑比特数、门保真度、量子体积等不能被混成单一排名。
4. **计划与事实分离**：路线图、预测、营销口径不写成实际交付结果。
5. **复现优先**：算法实验保留代码、随机种子、依赖版本、后端与噪声模型。
6. **公开更新可追踪**：研究结论通过 PR 更新，原始资料与原文摘要保留出处。
7. **循序渐进**：先建立框架与真实来源，再引入数据抓取、时序指标和自动化。

## 仓库布局

```text
research/      研究方向及问题清单
docs/          规范文档 + GitHub Pages 静态站点
docs/data/     站点使用的结构化研究元数据
```

**当前状态**：研究规范和 Pages V0 原型建设阶段。网页中的示例分组不构成实时硬件基准或投资建议。

## License

暂未选择许可协议。研究资料和代码的复用权限以仓库后续发布的 LICENSE 为准。
