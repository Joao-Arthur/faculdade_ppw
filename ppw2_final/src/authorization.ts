import jwt from 'jsonwebtoken';

function verify(requestToken: string | undefined) {
    try {
        if (!process.env.JWT_KEY) throw new Error();
        if (!requestToken) throw new Error();
        const token = requestToken.slice(7);
        jwt.verify(token, process.env.JWT_KEY, { complete: true }, e => {
            if (e) throw new Error();
        });
    } catch {
        return false;
    }
    return true;
}

function sign(value: string | undefined) {
    if (!value) throw new Error();
    if (!process.env.JWT_KEY) throw new Error();
    return jwt.sign(value, process.env.JWT_KEY);
}

const authorization = { verify, sign };

export default authorization;
