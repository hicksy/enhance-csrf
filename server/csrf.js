import { v4 as uuid } from "uuid";

export async function createCsrfToken(req) {
    let csrf_token = req.session['csrf']

    if (typeof csrf_token === "string") {
        return csrf_token;
    } else {
        let newCsrfToken = uuid();
        req.session['csrf'] = newCsrfToken;
    }
    
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