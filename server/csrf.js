import { v4 as uuid } from "uuid";
import arc from '@architect/functions';

export async function createCsrfToken(req) {
    let session = await arc.http.session.read(req)
    console.log('a')
    console.log(session)
    if (typeof session.csrf !== "string") {
        let newCsrfToken = uuid();
        session.csrf = newCsrfToken;
    }
    
    req.session.csrf = session.csrf;
}

export function verifyCsrfToken(req) {
    
    if (!req.body['csrf']) {
        throw Error({
            message: "Could not find CSRF token in request body",
        });
    }

    if (req.body['csrf'] !== req.session['csrf']) {
        throw Error({
            message: "Could not verify CSRF token.",
        });
    }
    
}