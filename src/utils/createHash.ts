import * as crypto from 'crypto';

export function createHash(data: string) {
  return crypto.createHash('sha1').update(data).digest('hex');
}
