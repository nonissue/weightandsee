# Catchweight

[http://catchweight.nonissue.vercel.app](http://catchweight.nonissue.vercel.app)

## Now With Postgres!

### -Ish

- Issues deploying and accessing prisma
- Prisma client wasn't being generated at build time on vercel
- I think it was because I set the version to "latest" in package.json
- After changing that, it's in build logs.
- 20-10-25 yah now it's working.