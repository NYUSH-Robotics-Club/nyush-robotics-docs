# 硬件概览

本页聚焦 RoboMaster 电控常见核心硬件，并给出官方页面可查到的关键参数。参数会随产品迭代变化，使用前请再次核对官方文档。

## 控制板：RoboMaster 开发板 C 型

官方页面关键信息：

- 主控：`STM32F407IGH6`
- 内核：`Cortex-M4`
- 主频：`168 MHz`
- SRAM：`192 KB`
- Flash：`1 MB`

工程含义：

- 能支撑多任务控制链路（IMU + 电机 + 通信 + UI）
- 资源仍然有限，复杂功能要做实时预算与内存预算

## 底盘常见组合：M3508 + C620

### M3508（电机）

官方页面可见：

- 额定电压：`24V`
- 空载转速：`476 rpm`
- 额定扭矩：`0.3 N·m`
- 最大扭矩：`3 N·m`

### C620（电调）

官方页面可见：

- 工作电压：`24V`
- 持续工作电流：`20A`
- 瞬时最大电流：`40A`

工程建议：

- 把电流限幅和功率限幅都纳入控制策略
- 不要只追求响应速度而忽略总线与热管理

## 发射或小负载常见组合：M2006 + C610

### C610（电调）

官方页面可见：

- 工作电压：`24V`
- 持续工作电流：`10A`
- 瞬时最大电流：`20A`

适用场景：

- 拨盘、轻载机构、对动态要求较高但扭矩需求相对可控的执行端

## 云台常见电机：GM6020

官方页面可见：

- 工作电压：`24V`
- 最大输出扭矩：`1.2 N·m`
- 编码器：`13-bit`

工程建议：

- 云台角速度与角度控制应区分链路
- 视觉闭环接入时注意反馈源切换与滤波参数

## 参考页面

- 开发板 C：[RoboMaster Development Board Type C](https://www.robomaster.com/zh-CN/products/components/detail/122)
- M3508：[M3508 无刷直流减速电机](https://www.robomaster.com/zh-CN/products/components/general/M3508)
- C620：[C620 无刷电机调速器](https://www.robomaster.com/zh-CN/products/components/general/C620)
- C610：[C610 无刷电机调速器](https://www.robomaster.com/zh-CN/products/components/general/C610)
- GM6020：[GM6020 无刷电机](https://www.robomaster.com/zh-CN/products/components/general/GM6020)
