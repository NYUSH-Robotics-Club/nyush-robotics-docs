# RoboMaster 学习路径（循序渐进）

如果你是第一次接触 RoboMaster 电控，建议严格按下面顺序学习，不要跳章。

## 学习顺序

### 阶段 A：先跑起来（第 1 周）

0. [00 前言](/zh/robomaster/00-preface)
1. [01 工具与环境](/zh/robomaster/01-tools-and-env)
2. [02 第一次编译与烧录](/zh/robomaster/02-first-build-flash)

### 阶段 B：理解核心（第 2-3 周）

3. [03 硬件与安全基础](/zh/robomaster/03-hardware-safety)
4. [04 CAN 通信入门](/zh/robomaster/04-can-intro)

### 阶段 C：工程化联调（第 4 周起）

5. [05 架构与任务流](/zh/robomaster/05-app-architecture)
6. [06 Application 层代码结构](/zh/robomaster/06-application-layer-code-structure)
7. [07 调试与调参工作流](/zh/robomaster/07-debug-workflow)

### 阶段 D：赛季交付能力（第 6 周起）

8. [08 裁判系统与 UI 入门](/zh/robomaster/08-referee-system-and-ui)

## 参考附录

- [赛季与规则](/zh/robomaster/season-rules)
- [硬件概览](/zh/robomaster/hardware-overview)
- [硬件手册 PDF](/zh/robomaster/hardware-manuals)
- [Git 与开发环境](/zh/robomaster/git-env)

## 学习路径图

```mermaid
flowchart LR
  A[00 前言] --> C[01 工具与环境]
  C --> D[02 第一次编译与烧录]
  D --> E[03 硬件与安全基础]
  E --> F[04 CAN 通信入门]
  F --> G[05 架构与任务流]
  G --> H[06 Application 层代码结构]
  H --> I[07 调试与调参工作流]
  I --> J[08 裁判系统与 UI 入门]
```
