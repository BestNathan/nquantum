# R5 · 量子系统与软件基础设施

## 目标

把量子计算视作异构计算基础设施：程序表达、编译优化、噪声建模、QPU 任务调度、实时控制和反馈、结果解释形成完整数据流。

## 分层架构

1. **算法与 DSL**：Qiskit、Cirq、pytket、PennyLane 等生态，区分硬件 SDK 与领域抽象。
2. **中间表示**：OpenQASM 3、QIR 等，记录控制流、测量及门集限制。
3. **Compiler / Transpiler**：拓扑映射、路由、门分解、调度、误差感知编译。
4. **Runtime / Control**：shot batching、任务提交、实时反馈、校准引用、资源隔离。
5. **QPU / Simulator**：物理控制器、噪声模拟、状态向量/张量网络仿真；模型与硬件结果分离。
6. **Observability**：job timing、queue latency、calibration drift、error budget、实际费用、实验 provenance。

## 重点系统问题

- 编译前/后门数与电路深度，能否跨不同工具链公平比较？
- 云接口如何暴露任务失败、计费、排队时间和设备校准快照？
- 如何让实验执行可复现？哪些硬件噪声无法快照化？
- HPC/GPU/CPU 与 QPU 的数据交换是否成为瓶颈？
- 动态线路与实时纠错对编译器/控制器提出哪些硬实时要求？

## 研究输出

参考执行路径图、工具生态矩阵、最小 Qiskit 示例、实验元数据规范，后续可按数据模型接入结果。
