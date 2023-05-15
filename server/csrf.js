import { v4 as uuid } from "uuid";
import arc from '@architect/functions';
import multipart from 'lambda-multipart-parser'

export async function createCsrfToken(req) {
    let session = await arc.http.session.read(req)
    
    if (typeof session.csrf !== "string") {
        session.csrf = uuid();
    }
    
    req.session.csrf = session.csrf;
}

export async function verifyCsrfToken(req) {
   
    let providedCsrf;
    
    if(req.headers['content-type'].includes('multipart/form-data')) {
        const multiPartBody = await multipart.parse({...req, body: req.body.base64 ? req.body.base64 : req.rawBody});
        providedCsrf = multiPartBody.csrf;
    } else {
        providedCsrf = req.body.csrf;
    }
    
    if (!providedCsrf) {
        throw Error("Could not find CSRF token in request body");
    }

    if (providedCsrf !== req.session['csrf']) {
        throw Error("Could not verify CSRF token.");
    }
    
}