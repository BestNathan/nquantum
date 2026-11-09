# 研究数据模型 V0

## 设计原则

将**实体、来源、结论、观测、实验**分离，便于追溯和纠错。首版 Pages 只消费静态 `docs/data/research.json` 里的研究导航信息，真实数值数据库待引入。

## 未来的核心对象

### Source（证据来源）

```json
{
  "id": "src-...",
  "title": "原始标题",
  "url": "https://...",
  "publisher": "机构/作者",
  "source_type": "paper",
  "evidence_level": "E1",
  "published_at": "2026-01-01",
  "accessed_at": "2026-11-09",
  "doi": null
}
```

### Claim（可核实陈述）

```json
{
  "id": "claim-...",
  "statement": "待核实的原文可复述结论",
  "entity_id": "device-...",
  "source_ids": ["src-..."],
  "status": "reported",
  "conditions": "gate set / qubit subset / experiment...",
  "limitations": "需要进一步验证的边界",
  "observed_at": null,
  "observed_at_missing_reason": "原始材料未提供"
}
```

### Observation（定量观测）

```json
{
  "id": "obs-...",
  "entity_id": "device-...",
  "metric_id": "two_qubit_gate_error",
  "value": null,
  "unit": "probability",
  "uncertainty": null,
  "sample_size": null,
  "conditions": {"protocol": "待核实", "gate_set": null, "qubit_subset": null},
  "source_id": "src-...",
  "measured_at": null,
  "measurement_time_missing_reason": "未披露",
  "reported_at": "2026-11-09",
  "status": "reported"
}
```

空值模板**不是有效的观测记录**，正式入库须通过校验规则。

### Experiment（实验复现）

输入：代码仓库及 commit、环境/依赖、模型或后端、设备校准快照、随机种子、shots、任务参数、经典基线、时间/成本预算。输出：原始日志、统计估计、置信区间、误差、是否复现结论。

## 合法性约束

- 所有实际观测都必须有 `source_id` 和 `metric_id`。
- `value` 不可在未知时填 `0`。
- 同指标不代表同条件可比，比较必须走单独的兼容性判定。
- 日期采用 ISO 8601，区分发表、测量、采集时间。
- 历史观测追加，不直接覆盖；修订用 supersedes 关联。
- 数据采集与页面展示解耦；Pages 不直接抓取厂商网站、绕过来源校验。
- 指标释义应有 formula、unit、interpretation、caveats、group 和 provenance 规则。

## Pages V0 与未来演进

V0 静态数据只有研究主题、路线描述、指标释义、来源链接、计划阶段；没有伪造的时序图。V1 接入合法化 observation 后，才开放按时间、厂商和设备过滤的性能趋势图。
