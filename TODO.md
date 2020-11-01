# CatchWeight

## General

- [ ] Scrollbar shift (fix)
- [ ] Password
- [ ] CRUD for entries
- [ ] Date getting messed up with timezone?
  - [x] Set start date hours to 00-00-00 and local to alberta
  - [x] Verify issue resolved? I think it is.
  - [x] Date is recorded in utc, but we are now parsing it back to America/Denver time, so likely resolved?
- [ ] Make current weight avaiable somehow
- [x] Fix menu line breaking on screen size between mobile and desktop? (480px - 540px) // FIXed I think: Show hamburger on sm & md sizes

## Next

- [ ] Better datepicker (airbnb one is nice)
- [ ] Charts
- [ ] Testing

## Components

- [x] Enter single data point
- [x] Enter group data points
- [ ] Move components into subfolders
- [ ] Copy style from: https://github.com/vercel/commerce
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

### Nav

- [ ] when mobile nav open, change hamburger to close button

## Pages

### People

- [ ] Fetch current weight of person (and maybe conditionally show green/red based on trend)

### Weights (Weigh-Ins)

- [x] Group entries by date (done with conditional logic)
- [x] Change date display format to YYYY-MM-DD (currently MM-DD-YYYY) (`toLocaleDateString('en-CA', { timeZone: 'Americas/Denver' })`)

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