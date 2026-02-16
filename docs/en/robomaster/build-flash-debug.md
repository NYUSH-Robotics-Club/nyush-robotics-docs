# Build, Flash, and Debug

## Build

```bash
make -j12
make ROBOT_TYPE=infantry -j12
make ROBOT_TYPE=hero -j12
make ROBOT_TYPE=sentry -j12
```

## Flash

```bash
make flash_dfu
make flash_dap
make flash_stlink
make flash_jlink
```

Recommended minimum loop:

1. reproducible build
2. successful flash
3. single-module closed-loop validation
4. full integration

## Practical Debug SOP

- hardware first, software second
- then timing/bus load/interrupt priority
- then control parameters and feedback sources

## HardFault Starting Checklist

First suspects:

- wild pointers
- out-of-bounds access
- uninitialized pointers
- incorrect force-cast behavior

## Engineering Red Lines

- no interrupt-dependent delay in critical sections
- no warning-tolerant merges (warnings are treated as errors)
- every new module needs docs and safety checks
