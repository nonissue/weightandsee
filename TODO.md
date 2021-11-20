# CatchWeight

## Bugs

- [x] Too many db connections
  - [x] https://github.com/prisma/prisma/issues/1983
  - [x] Tried to fix with prisma singleton
  - [x] Maybe copy blitz.js implementation

## Graph UI (21-11-18)

- [x] fix data color in point hover label (dark mode)
- [x] format date in point hover label in a nicer fashion
  - [x] Right now it's unix timestamp

## General

- [ ] Password
- [ ] CRUD for entries
- [ ] Add check constraint for currentWeight in Postgres
- [ ] Prisma: implement `prisma db push` for dev db
- [ ] Prisma: programmatically switch between prod and dev DBs
- [ ] Slim down `pages/weights/add.tsx`. Currently imports a tonne of stuff from chakra.
  - [ ] Could it use `getStaticProps`? UPDATE: trying it, only 'dynamic' content is `PersonList`
    - [ ] Still big (`235kb`), so many chakra comps
    - [ ] Info: https://bundlephobia.com/result?p=@chakra-ui/react@1.0.0-rc.8
- [x] Date getting messed up with timezone?
  - [x] Set start date hours to 00-00-00 and local to alberta
  - [x] Verify issue resolved? I think it is.
  - [x] Date is recorded in utc, but we are now parsing it back to America/Denver time, so likely resolved?
- [x] Make current weight avaiable somehow
  - Form lets you specify whether or not to update individuals weights
  - The current weight is shown on the People page
- [x] Fix menu line breaking on screen size between mobile and desktop? (480px - 540px) // FIXed I think: Show hamburger on sm & md sizes
- [x] Remove `./env` file from git history
- [x] Setup develop branch
- [x] Fix `favicon`
  - [ ] Generated & loads in prod, but fuck, the pipeline requires a bunch of packages:
    - [ ] `copy`, `rimraf`, `run-s`
    - [ ] And it slows down builds significantly on vercel

## Next

- [ ] Scrollbar shift (fix)
- [ ] Better datepicker (airbnb one is nice)
- [ ] Charts
- [ ] Testing
  - [ ] https://www.prisma.io/blog/backend-prisma-typescript-orm-with-postgresql-rest-api-validation-dcba1ps7kip3
  - [ ] https://github.com/willianantunes/nextjs-playground/blob/master/__tests__/integration/pages/api/health.spec.test.js
  - [ ] https://dev.to/metamas/testing-next-js-api-routes-55g3
  - [ ] https://kakuev.com/blog/testing-nextjs-api
- [ ] Leverage theme `variants` (in `./theme.ts`)
- [ ] Leverage layer styles (https://next.chakra-ui.com/docs/features/text-and-layer-styles#layer-style)

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
- [x] Export all components from `./components/index.tsx` so imports are cleaner
  - [ ] Use `./components` import rather than `./components/CompName`
- [ ] Remove unused `List` components
- [x] Add Footer

### WeightTag

- [ ] Accept Stack Props (`{...props}`)

### Nav

- [ ] when mobile nav open, change hamburger to close button

## Pages

### People

- [x] Fetch current weight of person (and maybe conditionally show green/red based on trend)

### Weights (Weigh-Ins)

- [x] Group entries by date (done with conditional logic)
- [x] Change date display format to YYYY-MM-DD (currently MM-DD-YYYY) (`toLocaleDateString('en-CA', { timeZone: 'Americas/Denver' })`)

## Graphs

### Libaries

- [ ] Nivo - good, lots of options, can customize in playground (https://nivo.rocks/line/)
- [ ] Recharts - good, seems simpler
- [ ] Victory - I like this too (Responsive OOB)

### Everyone

- [ ] Time Series
  - [ ] Absolute Weight
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
