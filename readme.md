# CSRF component for Enhance projects


### example usage

```
import { createCsrfToken, verifyCsrfToken } from 'enhance-csrf/server/csrf.js'

export let get = [createCsrfToken, two]

export let post = [verifyCsrfToken, two]

async function two (req) {
  console.log('hi from two')
  console.log(req)
  
  return { 
    session: req.session,
    json: {test: 'one', csrf_token: req.session.csrf}
  }
}
```

