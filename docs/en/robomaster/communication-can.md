# Communication and CAN

## Three Things to Define First

1. single-board or dual-board mode
2. CAN1 vs CAN2 device allocation
3. control-frame and feedback-frame ownership with conflict-free IDs

## CAN Engineering Essentials

- never reuse IDs on the same bus
- enable termination only at physical bus ends
- match control and feedback rates to real bus bandwidth

## Inter-Board Transport: CANComm

In dual-board mode, `CANComm` wraps inter-board transport.

Key points:

- send/receive lengths are defined by `sizeof()`
- default max payload per transfer is `60` bytes
- communication structs must use `#pragma pack(1)`

## Message Center vs CANComm

- inside one board: prefer `message_center` pub-sub
- across boards: use `CANComm`

Keep logic and transport decoupled.

## Common Failure Priority

1. wiring and power
2. filters and ID map
3. struct length and packing
4. task frequency and bus load
5. interrupt priority and callback behavior
