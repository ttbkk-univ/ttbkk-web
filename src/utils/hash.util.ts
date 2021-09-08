import { createHash } from 'crypto';

export function getMD5(value: string): string {
  return createHash('md5').update(value).digest('hex');
}
