# Weight&See

[http://weightandsee.vercel.app](http://weightandsee.vercel.app)

## Version

0.1.1 (beta)

## Technologies

- Next.js
- Prisma
- Chakra-UI
- React-Hook-Form
- Postgres
- TypeScript
  
## Setup

- Add env variables on `vercel`: 
  - Required: `DATABASE_URL`, `GA_TRACKING_ID`

```bash
yarn
yarn build
```

## Misc

### Regenerate Favicons

- We don't want to run this on each build because it's super slow, so rerun it when your favicon changes.
  - Build speeds: don't gen favicon: `55s`, gen favicon: `2m`

```bash
yarn gen-favicons # builds favicons and plunks them in public
```

