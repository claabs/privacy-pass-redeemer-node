import { deriveKey, createRequestBinding } from './voprf';

export interface Points {
  blindedPoint: string;
  unblindedPoint: string;
}

export interface PrivacyPassToken {
  input: number[];
  factor: string;
  blindedPoint: string;
  unblindedPoint: string;
  signed: Points;
}

const defaultECSettings = { curve: 'p256', hash: 'sha256', method: 'increment' };

const getMacKey = (token: PrivacyPassToken): Buffer => {
  if (!token.signed) throw new Error('Unsigned token is used to derive a MAC key');
  return deriveKey(token.signed.unblindedPoint, Buffer.from(token.input));
};

/**
 * Creates a Privacy Pass redemption token
 * @param token A single Privacy Pass CF-Token object
 * @param url URL being requested
 * @param method HTTP verb that will be used with the token. Eg. GET or POST
 * @returns Redemption token
 */
export const getRedemptionToken = (
  token: PrivacyPassToken,
  url: string,
  method: string
): string => {
  const key = getMacKey(token);

  const { hostname, pathname } = new URL(url);

  const binding = createRequestBinding(key, [hostname, `${method.toUpperCase()} ${pathname}`]);

  const contents = [
    Buffer.from(token.input).toString('base64'),
    binding,
    Buffer.from(JSON.stringify(defaultECSettings), 'utf-8').toString('base64'),
  ];
  const redemptionDict = { type: 'Redeem', contents };
  const jsonString = JSON.stringify(redemptionDict);
  const redemptionToken = Buffer.from(jsonString, 'utf-8').toString('base64');
  return redemptionToken;
};

/**
 * Returns a request header with appropriate redemption token
 * @param token A single Privacy Pass CF-Token object
 * @param url URL being requested
 * @param method HTTP verb that will be used with the token. Eg. GET or POST
 * @returns Header object with challenge-bypass-token token
 */
export const getRedemptionHeader = (
  token: PrivacyPassToken,
  url: string,
  method: string
): Record<string, string> => {
  const challengeBypassToken = getRedemptionToken(token, url, method);
  return { 'challenge-bypass-token': challengeBypassToken };
};
