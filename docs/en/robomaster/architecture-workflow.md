# Architecture and Task Flow

This page is derived from the real `nyush-rm-control` codebase and maps repository structure to runtime behavior.

## Three-Layer Structure

- `bsp/`: hardware abstraction layer wrappers
- `modules/`: hardware-agnostic modules (motor, algorithm, message center)
- `application/`: robot-level logic (`cmd/gimbal/chassis/shoot`)

Core principle:

- app modules exchange data by messaging, not by direct include coupling

## Robot Initialization Flow (Simplified)

```text
RobotInit:
  Disable IRQ
  BSPInit + LEDInit
  Initialize apps (cmd/gimbal/shoot/chassis)
  Create FreeRTOS tasks
  Enable IRQ
```

Initialization cautions:

- avoid interrupt-dependent delays during init
- do not let interrupts touch objects that are not initialized yet

## Task Frequencies (Current Implementation)

| Task | Typical Period | Role |
| --- | --- | --- |
| `INSTASK` | 1ms | IMU attitude update |
| `MOTORTASK` | 1ms loop | motor-control dispatch |
| `ROBOTTASK` | 5ms | core app logic |
| `DAEMONTASK` | 10ms | watchdog/alarm/status |
| `UITASK` | suspended loop | referee UI |
| `MONITORTASK` | 20ms | dashboard telemetry |

## App-Level Data Flow

- `robot_cmd`: parses input and publishes control targets
- `gimbal/chassis/shoot`: subscribe targets, execute, then publish feedback
- feedback returns to `robot_cmd` to close decision loops

Messaging is built on `message_center` pub-sub.
