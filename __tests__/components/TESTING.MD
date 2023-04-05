## Author: Trevor Drayton

### FightClock Test Suite

The test suite performed on FightClock is a Strong Normal Equivalence Class test suite which means that we are testing with multi-fault assumption of valid input values. There are 8 strong normal equivalence class cases and
12 special test cases.

The following are the equivalence classes:
- Rest1: {restTime: > 0}
- Rest2: {restTime: 0}
- Ready1: {readyTime: > 0}
- Ready2: {readyTime: 0}
- Interval1: {rounds: 1}
- Interval2: {rounds: > 1}
