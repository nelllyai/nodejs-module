import crypto from 'node:crypto';

const hash = file => crypto.createHash('sha256').update(file).digest('hex');

export default hash;
