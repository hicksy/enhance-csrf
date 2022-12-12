import { v4 as uuid } from "uuid";

export function createCsrfToken() {
    let csrf_token = req.session.get('csrf');

    if (typeof csrf_token === "string") {
        return csrf_token;
    } else {
        let newCsrfToken = uuid();
        req.session.set('csrf', newCsrfToken);
    }
    
}

export function verifyCsrfToken() {
    
    if (!req.body.get('csrf')) {
        throw Error({
            message: "Could not find CSRF token in request body",
        });
    }

    if (req.body.get('csrf') !== req.session.get('csrf')) {
        throw Error({
            message: "Could not verify CSRF token.",
        });
    }
    
}