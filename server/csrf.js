import { v4 as uuid } from "uuid";

export async function createCsrfToken(req) {
    console.log(req)
    let session = req.session

    if (typeof session.csrf_token !== "string") {
        let newCsrfToken = uuid();
        session.csrf = newCsrfToken;
    }
    
    req.session = session;
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