# Tuning and Telemetry

## PID Tuning Order

Recommended order:

1. inner loop first (current/speed), outer loop second (angle)
2. tune `P`, then `D`, then `I`
3. use feedforward for steady-state and lag compensation

Notes:

- do not start with all loops enabled
- frequency, filtering, and output limits must be tuned together with gains

## Ozone Observation Practice

Track time-domain metrics:

- rise time
- overshoot
- steady-state error

Change one variable at a time to preserve causality.

## RTT Dashboard in Integration

`rtt-dashboard` gives live visibility into:

- motor targets vs measurements
- gimbal targets vs actual angles
- remote status bits
- CAN online bitmaps
- CRC/drop trends

Treat telemetry as the primary integration surface, not optional tooling.
