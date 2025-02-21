import { v4 as uuid } from "uuid";
import arc from '@architect/functions';
import busboy from 'busboy';


/* Standalone parse function to use new busboy version. Modified from original code `https://github.com/francismeynard/lambda-multipart-parser.git` */

const parse = (event) => new Promise((resolve, reject) => {
    const _busboy = busboy({
        headers: {
            'content-type': event.headers['content-type'] || event.headers['Content-Type']
        }
    });
    const result = {
        files: []
    };

    _busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        const uploadFile = {};

        file.on('data', data => {
            uploadFile.content = data;
        });

        file.on('end', () => {
            if (uploadFile.content) {
                uploadFile.filename = filename;
                uploadFile.contentType = mimetype;
                uploadFile.encoding = encoding;
                uploadFile.fieldname = fieldname;
                result.files.push(uploadFile);
            }
        });
    });

    _busboy.on('field', (fieldname, value) => {
        result[fieldname] = value;
    });

    _busboy.on('error', error => {
        reject(error);
    });

    _busboy.on('finish', () => {
        resolve(result);
    });

    const encoding = event.encoding || (event.isBase64Encoded ? "base64" : "binary");
 
    _busboy.write(event.body, encoding);
    _busboy.end();
});

export async function createCsrfToken(req) {
    let session = await arc.http.session.read(req)
    
    if (typeof session.csrf !== "string") {
        session.csrf = uuid();
    }
    
    req.session.csrf = session.csrf;
}

export async function verifyCsrfToken(req) {
   
    let providedCsrf;
    let session = await arc.http.session.read(req)
    
    if(req.headers['content-type'].includes('multipart/form-data')) {
        req.body = await parse({...req, body: req.body.base64 ? req.body.base64 : req.rawBody});
        providedCsrf = multiPartBody.csrf;
    } 

    providedCsrf = req.body.csrf;
    
    if (!providedCsrf) {
        throw Error("Could not find CSRF token in request body");
    }

    if (providedCsrf !== session['csrf']) {
        throw Error("Could not verify CSRF token.");
    }
    
}