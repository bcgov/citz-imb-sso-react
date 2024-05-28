import { decodeJWT } from '@/utils';

// Test suite for utils
describe('JWT Utilities', () => {
  // Test case: decodes a valid JWT correctly
  it('decodes a valid JWT correctly', () => {
    const jwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    const decodedData = decodeJWT(jwt);
    expect(decodedData).toEqual({
      sub: '1234567890',
      name: 'John Doe',
      iat: 1516239022,
    });
  });

  // Test case: returns undefined for an invalid JWT
  it('returns undefined for an invalid JWT', () => {
    const invalidJwt = 'invalid.jwt.string';
    const decodedData = decodeJWT(invalidJwt);
    expect(decodedData).toBeUndefined();
  });
});
