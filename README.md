# Node - Vercel Login and deploy
Quick and dirty POC to login using Vercel API fetch token and use it to deploy a template html with custom data.

### login.js
- Edit line 3 to add your email 
- Run `node login.js`
- Accept email
- Press enter
- Copy token from log
- Press ctrl+c

### index.js
- Edit line 7 and 8 add token from before 
- Run `node index.js`

## Vercel Docs:

Register Vercel User & Get Token:
```bash
curl -X POST "https://api.vercel.com/now/registration" \                                                        
  -H "Content-Type: application/json" \
  -d '{
  "email": "email@email.com",
  "tokenName": "customweb"
}' 
```  

Validate login and get bearer token
```bash
curl "https://api.vercel.com/now/registration/verify?email=email@email.com&token=<TOKEN>"
```

Deploy new project
```bash
curl -X POST "https://api.vercel.com/v12/now/deployments" \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "my-instant-deployment",
  "files": [
    {
      "file": "index.html",
      "data": "<!doctype html>\n<html>\n <body>\n    <h1>Truffll example</h1>\n</body>\n</html>"
    }
  ],
  "projectSettings": {
    "framework": null
  }
}'
```

Assign alias
```bash
curl -X POST "https://api.vercel.com/v2/now/deployments/dpl_32FVfidtapHmMLU5wLukWxB9Nom1/aliases" \
  -H "Authorization: Bearer inWmrCxgszzRZdxFycjxi2Rf" \
  -H "Content-Type: application/json" \
  -d '{
  "alias": "test.truffll.com"        
}'
```