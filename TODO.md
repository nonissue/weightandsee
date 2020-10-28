# CatchWeight

## Components

- [x] Enter single data point
- [x] Enter group data points
- [ ] Edit group data point
- [ ] Edit single data point
- [ ] Delete data point
- [ ] Add User
- [ ] Edit User
- [ ] Delete user
- [x] User List
- [x] Move to postgres
- [x] Person List
- [x] Weight Entry list
- [ ] Add current weight to person schema
  - [ ] How/When to calculate?
    - [ ] When person is updated, sort their weights by date, take latest.
- [ ] Export all components from `./components/index.tsx` so imports are cleaner
- [ ] Remove unused `List` components

### WeightTag

- [ ] Accept Stack Props (`{...props}`)

## Pages

### People

- [ ] Fetch current weight of person (and maybe conditionally show green/red based on trend)

### Weights (EntryList)

- [x] Group entries by date (done with conditional logic)
- [ ] Change date display format to YYYY-MM-DD (currently MM-DD-YYYY)

## Graphs

### Everyone

- [ ] Time Series
  - [ ] Absolute   Weight
  - [ ] Relative Weight
- [ ] Histograms
  - [ ] Most lost
    - [ ] Absolute
    - [ ] % of original body weight

### Individual

- [ ] Time line
  - [ ] Absolute Weight
  - [ ] Relative Weight (delta +/-)

## Figures

### Everyone

- [ ] Most lost
    - [ ] Absolute
    - [ ] % of original body weight

### Individual

- [ ] Absolute amount lost
  - [ ] Lifetime
  - [ ] Per week
- [ ] Relative amount lost
  - [ ] Lifetime
  - [ ] Per week