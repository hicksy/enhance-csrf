import { v4 as uuid } from "uuid";

export default function createCsrfToken(session) {
    let csrf_token = session.get('csrf');

    if (typeof csrf_token === "string") {
        return csrf_token;
    } else {
        let newCsrfToken = uuid();
        session.set('csrf', newCsrfToken);
        return newCsrfToken;
    }
    
}

export default function verifyCsrfToken() {
    
    if (req.body.get('csrf') !== req.session.get('csrf')) {
        throw Error({
            message: "Could not verify CSRF token.",
        });
    }

    if (!req.body.get('csrf')) {
        throw Error({
            message: "Could not find CSRF token in request body",
        });
    }

    
}