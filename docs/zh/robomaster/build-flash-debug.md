# 构建、烧录与调试

## 构建

```bash
make -j12
make ROBOT_TYPE=infantry -j12
make ROBOT_TYPE=hero -j12
make ROBOT_TYPE=sentry -j12
```

## 烧录

```bash
make flash_dfu
make flash_dap
make flash_stlink
make flash_jlink
```

建议最小闭环：

1. 先编译通过
2. 再成功烧录
3. 再单模块验证（例如单电机）
4. 最后整机联调

## 调试 SOP（实用版）

- 先硬件后软件：接线、电源、ID、外设句柄
- 再看实时性：任务耗时、总线负载、中断优先级
- 最后看控制：参数、限幅、反馈源

## HardFault 排查起点

优先怀疑：

- 野指针
- 越界访问
- 未初始化指针
- 错误强制类型转换

## 开发红线

- 禁止在临界区使用依赖中断更新的延时。
- 禁止忽略 warning（当前构建配置按 error 处理 warning）。
- 新增模块必须附带文档与安全检查。
