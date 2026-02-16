# Hardware Overview

This page summarizes core RoboMaster electrical-control hardware and key specs available on official product pages. Always re-check official docs before integration.

## Controller: RoboMaster Development Board Type C

Official page highlights:

- MCU: `STM32F407IGH6`
- Core: `Cortex-M4`
- Clock: `168 MHz`
- SRAM: `192 KB`
- Flash: `1 MB`

Engineering meaning:

- Enough for multi-task control loops (IMU + motor + comm + UI)
- Still resource-constrained, so timing and memory budgets matter

## Common Chassis Pair: M3508 + C620

### M3508 (Motor)

Official page shows:

- Rated voltage: `24V`
- No-load speed: `476 rpm`
- Rated torque: `0.3 N·m`
- Max torque: `3 N·m`

### C620 (ESC)

Official page shows:

- Working voltage: `24V`
- Continuous current: `20A`
- Peak current: `40A`

Engineering note:

- Enforce both current limits and power limits in control logic.

## Common Shooter / Light-Load Pair: M2006 + C610

### C610 (ESC)

Official page shows:

- Working voltage: `24V`
- Continuous current: `10A`
- Peak current: `20A`

Use cases:

- feeder and light-load mechanisms with high dynamic requirements

## Common Gimbal Motor: GM6020

Official page shows:

- Working voltage: `24V`
- Max output torque: `1.2 N·m`
- Encoder resolution: `13-bit`

Engineering note:

- Distinguish angular-rate control and angular-position control chains.

## Reference Pages

- Development Board C: [Type C Board](https://www.robomaster.com/en-US/products/components/detail/122)
- M3508: [M3508 Motor](https://www.robomaster.com/en-US/products/components/general/M3508)
- C620: [C620 ESC](https://www.robomaster.com/en-US/products/components/general/C620)
- C610: [C610 ESC](https://www.robomaster.com/en-US/products/components/general/C610)
- GM6020: [GM6020 Motor](https://www.robomaster.com/en-US/products/components/general/GM6020)
