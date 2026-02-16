# 工程架构与任务流

本页基于 `nyush-rm-control` 代码结构整理，帮助新成员把“目录结构”映射到“运行时行为”。

## 三层结构

- `bsp/`：对硬件外设的抽象封装
- `modules/`：硬件无关模块（电机、算法、消息中心等）
- `application/`：机器人应用逻辑（cmd/gimbal/chassis/shoot）

核心原则：

- 应用层之间用消息交换，不互相 include
- 上层尽量不直接写 HAL 细节

## 机器人初始化流程（简化）

```text
RobotInit:
  关闭中断
  BSPInit + LEDInit
  初始化 app（cmd/gimbal/shoot/chassis）
  创建 FreeRTOS 任务
  开启中断
```

初始化阶段注意：

- 避免依赖中断的延时调用
- 初始化未完成前不要让中断访问未初始化对象

## 任务频率（当前实现）

| 任务 | 典型周期 | 说明 |
| --- | --- | --- |
| `INSTASK` | 1ms | IMU 姿态更新，要求高稳定 |
| `MOTORTASK` | 1ms 循环 | 电机控制发送与闭环更新 |
| `ROBOTTASK` | 5ms | 应用核心逻辑调度 |
| `DAEMONTASK` | 10ms | 守护、告警、指示灯 |
| `UITASK` | 循环挂起 | 裁判系统 UI |
| `MONITORTASK` | 20ms | Dashboard 遥测 |

## 数据流（应用层）

- `robot_cmd`：处理输入（遥控器/键鼠/视觉），发布控制目标
- `gimbal/chassis/shoot`：订阅控制目标，执行后发布反馈
- 各应用反馈再回到 `robot_cmd` 形成闭环

消息交换依赖 `message_center` 的发布-订阅机制。
