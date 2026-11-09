# 研究来源与引用规范

优先使用原始论文、官方技术文档、开源实验和同行评审材料；商业宣传和路线图仅表明厂商计划/主张。以下是**资料入口**而不是对其中所有结论的背书。

## 主要入口

| 来源 | 链接 | 用途 | 证据使用注意 |
|---|---|---|---|
| arXiv · Quantum Physics | https://arxiv.org/list/quant-ph/recent | 追踪预印本 | 未必同行评审，核对版本/是否撤稿 |
| IBM Quantum / Qiskit 文档 | https://quantum.cloud.ibm.com/docs | SDK、编译、设备与 API | 版本及测试口径必须保存 |
| IBM Quantum 技术路线 | https://www.ibm.com/quantum/technology | 产品路线和技术方向 | 目标日期属于计划，非实际完成 |
| Google Quantum AI 研究 | https://www.research.google/teams/quantum-ai/ | 官方研究进展 | 论文/实验细节优先于博客摘要 |
| Quantinuum Systems 文档 | https://docs.quantinuum.com/systems/ | 离子阱设备和系统接口 | 不同设备版本/门集分别记录 |
| Qiskit 开源代码 | https://github.com/Qiskit/qiskit | 验证编译工具与软件生态 | 固定 commit/tag 与依赖版本 |

## 引用模板

```text
标题 / 作者 / 机构：
原始 URL / DOI：
发表时间 / 访问时间：
设备及固件/软件版本：
实验条件与测量定义：
关键结果：
已知限制/后选择/数据缺失：
证据等级 E1-E4：
验证状态：verified / reported / planned / disputed / superseded
```

## 采集边界

- 不复制受版权保护的长文/完整付费论文至仓库；只存链接、引用与原创分析。
- 不将新闻转载作为原始技术指标来源。
- 对论文中的改进倍数、阈值和“优越性”要保存基线、任务和统计口径。
- 日期不明时记为未知，不用“最新”等表述掩盖时间缺失。
