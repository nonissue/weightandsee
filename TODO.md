# Non-Starter Todo

# Project

- [x] Add .vscode folder with tasks
- [x] Add Chakra-UI, configured for next
- [x] Add prisma + sqlite
- [x] Add default components
  - [x] NextLinkChakra
  - [x] Layout
  - [x] Header
- [ ] Add basic tests
- [ ] Simple tests
- [ ] Add auth?
- [ ] Refactor style implementation to make it consistent sitewide, rather than hodgepodge of custom tweaks as it is ATM
- [ ] Demo Content
  - [ ] Blog
- [ ] State: https://github.com/pmndrs/jotai

## Bugs

- [x] SQLite doesn't work on vercel?
  - [x] DB ENV issue?
  - [x] FIXED, I think by changing `DATABASE_URL="file:./dev.db"` to `DATABASE_URL="file:dev.db"`

## Typescript

- [ ] Figure out post/next typings (see [slug].tsx)
  - [ ] Is it okay to just expect a string we parse?

## Prisma

- [ ] Add Tags
- [x] Add Posts
- [ ] Slugify post title to create url

## Components

- [ ] Post *Is this strictly necessary? Maybe not*
  - [x] Display
  - [ ] Create
  - [ ] Edit
- [ ] Dashboard
  - [ ] Login
  - [ ] Logout
  - [ ] Signup
- [ ] Tag Page
- [ ] Footer
- [x] Mobile Nav

## Styling 

- [ ] Abstract layout padding/width implementation to either component wrapper or reusable variable
  - [ ] increase X padding on smaller viewports
- [ ] Transitions/hover for links, menu
- [ ] Handle custom colors in dark/light modes
  - [x] FullbleedPost
  - [x] MobileNavBurger
  - [x] HeaderLink
- [ ] Implement fullbleed on post page, check if it works for image (full span)
- [ ] Fix scrollbar causing overflow on mobile (check desktop)
- [ ] Layout shift from home -> posts, probably related to scrollbar

## Functionality

- [ ] Authentication & Authorization
  - [ ] Protected routes

## Possible Additions

- [ ] SWR or React Query
- [ ] React-hook-form
- [ ] Next Auth

## Readme

- [ ] Features
- [ ] Stack
- [ ] The Why
- [ ] The How