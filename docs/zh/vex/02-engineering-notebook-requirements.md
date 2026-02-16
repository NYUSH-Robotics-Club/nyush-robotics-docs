# 02 Engineering Notebook 官方要求

## 本章目标

把官方 notebook 要求转成可执行标准，直接指导你们每周记录。

## 1. notebook 的官方定义

官方 `EN1`：notebook 是学生原创、按时间推进记录的工程设计过程文档，不是专门给评委“临时包装”的展示册。

含义：

- 必须持续记录
- 必须真实反映尝试、失败与迭代
- 不应赛前集中补写“完美故事”

## 2. 形式要求（物理或数字都可）

官方允许：

- 纸质 notebook
- 数字 notebook

两种形式使用同一 rubric 评估，不因形式本身加分。

## 3. 核心内容要求（高价值字段）

你们每周至少应记录：

- 目标与约束
- 方案候选与取舍理由
- 测试方法与原始结果
- 失败案例与修复
- 下一轮迭代计划

这是 EN6 强调的工程设计过程证据链。

## 4. 学术诚信与引用

官方 `EN3` 要求：

- 使用外部资料必须注明来源
- 不得把他人内容当作本队原创

你们建议做法：

- 统一“引用附录”章节
- 每次引用写明来源链接和用途

## 5. AI/LLM 的官方红线

官方 `EN4` 明确：

- 用 AI/LLM 生成或重写 notebook 核心内容，违背 Student-Centered 与行为规范

实践建议：

- AI 可用于语言润色提示，但设计过程和结论必须由学生真实产生并可解释

## 6. 评审操作相关要求

官方给 judge 的执行建议包括：

- notebook 先分“Developing / Fully Developed”
- 再结合 rubric 打分与定性排序
- 单本评审时间通常有限（常见 10-20 分钟）

这意味着：

- 结构清晰比篇幅冗长更重要
- 无目录、信息散乱会直接降低可评估性

## 7. 周度模板（可直接使用）

每周一条主记录，至少包含：

- 本周目标
- 设计改动
- 测试数据
- 决策理由
- 失败与修复
- 下周计划

## 8. 本章实操任务

- 任务 A：把你们现有 notebook 对照 EN1/EN3/EN6 自查。
- 任务 B：补齐最近两周的“失败与修复”记录。
- 任务 C：增加引用附录并补来源。

## 官方来源

- VURC Guide to Judging: Judging Engineering Notebooks（EN1-EN8, EN17-EN23）：[https://vurc-kb.recf.org/hc/en-us/articles/9653457946135-Guide-to-Judging-Judging-Engineering-Notebooks](https://vurc-kb.recf.org/hc/en-us/articles/9653457946135-Guide-to-Judging-Judging-Engineering-Notebooks)

## 本章图示

```mermaid
flowchart LR
  A[设计目标] --> B[方案推导]
  B --> C[实验与证据]
  C --> D[结论与迭代]
```

