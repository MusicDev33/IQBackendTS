## Dev Note
Because TypeScript can complicate things, run the backend using this:

`pm2 start npm --name=iqbdev -- run start`

### For Production
`pm2 start npm --name=iqbprod -- run prod`

### For Remote Dev
`pm2 start npm --name=iqbdev -- run remotedev`
