## Author: Trevor Drayton

### FightClock Test Suite

The test suite performed on FightClock is a Strong Normal Equivalence Class test suite which means that we are testing with multi-fault assumption of valid input values.

The following are the equivalence classes:

Round1 = {roundTime: > 0}

Rest1 = {restTime: > 0}
Rest2 = {restTime: 0}

Ready1 = {readyTime: > 0}
Ready2 = {readyTime: 0}

Interval1 = {rounds: 1}
Interval2 = {rounds: > 1}

Background01 = from ready to ready, within the same interval

Background02 = from rest to rest, within the same interval

Background03 = from round to round, within the same interval

Background04 = from ready to round, within the same interval

Background05 = from ready to rest, within the same interval

Background05 = from round to rest, within the same interval


Background06 = from ready to ready, outside the same interval

Background07 = from rest to rest, outside the same interval

Background08 = from round to round, outside the same interval

Background09 = from ready to round, outside the same interval

Background10 = from ready to rest, outside the same interval

Background11 = from round to rest, outside the same interval

