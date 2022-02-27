/**
 * A Node.js port of: https://github.com/SergeBakharev/privacypass/blob/main/privacypass/voprf.py
 * Which is just a Python port of the vanilla JS version: https://github.com/privacypass/challenge-bypass-extension/blob/master/src/background/voprf.js
 * Ideally this would use native Node EC libraries, however Node Crypto doesn't have a `decodePoint` function, so we use `elliptic` instead.
 * It's ultimately a horrible mix of native Node and vanilla JS implementations...
 */

import crypto from 'crypto';
import elliptic from 'elliptic';

/**
 * Derives the shared key used for redemption MACs
 * @param unblindedPoint Signed curve point associated with token
 * @param token client-generated token data
 * @returns bytes of derived key
 */
export const deriveKey = (unblindedPoint: string, token: Buffer): Buffer => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { curve }: { curve: elliptic.curve.short } = (elliptic.curves as any).p256;
  const point = curve.decodePoint(Buffer.from(unblindedPoint, 'base64'));
  const pointBytes = Buffer.from(point.encode('array', false));

  const tagBytes = Buffer.from('hash_derive_key', 'utf-8');
  const h = crypto.createHmac('sha256', tagBytes);
  h.update(token);
  h.update(pointBytes);
  const keyBytes = h.digest();
  return keyBytes;
};

/**
 * Creates a request base64 string of HMAC("hash_request_binding", <derived-key>, <shared-info>)
 * @param key derived-key
 * @param data shared-info
 * @returns Resulting base64 encoded HMAC digest
 */
export const createRequestBinding = (key: Buffer, data: crypto.BinaryLike[]): string => {
  const tagBits = Buffer.from('hash_request_binding', 'utf-8');
  const h = crypto.createHmac('sha256', key);
  h.update(tagBits);
  data.forEach((datum) => h.update(datum));
  return h.digest('base64');
};
