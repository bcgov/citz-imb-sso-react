import { SSOUser } from '@/types';
import { decodeJWT, hasAllRoles, hasAtLeastOneRole, normalizeUser } from '@/utils';
import { mockOriginalSSOUserIDIR, mockSSOUserIDIR } from '__tests__/__mocks__';

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

// Test suite for role utils
describe('Role Utilities', () => {
  const userRoles: string[] = ['admin', 'user', 'editor'];

  // Test case: returns true when user has all specified roles
  it('returns true when user has all specified roles', () => {
    const requiredRoles = ['admin', 'user'];
    const result = hasAllRoles(userRoles, requiredRoles);
    expect(result).toBe(true);
  });

  // Test case: returns false when user does not have all specified roles
  it('returns false when user does not have all specified roles', () => {
    const requiredRoles = ['admin', 'superuser'];
    const result = hasAllRoles(userRoles, requiredRoles);
    expect(result).toBe(false);
  });

  // Test case: returns true when user has at least one of the specified roles
  it('returns true when user has at least one of the specified roles', () => {
    const requiredRoles = ['editor', 'superuser'];
    const result = hasAtLeastOneRole(userRoles, requiredRoles);
    expect(result).toBe(true);
  });

  // Test case: returns false when user has none of the specified roles
  it('returns false when user has none of the specified roles', () => {
    const requiredRoles = ['superuser', 'guest'];
    const result = hasAtLeastOneRole(userRoles, requiredRoles);
    expect(result).toBe(false);
  });
});

// Test suite for user normalization
describe('User Normalization', () => {
  // Test case: normalizes user data correctly
  it('normalizes user data correctly', () => {
    const normalizedUser: SSOUser = normalizeUser(mockOriginalSSOUserIDIR);
    expect(normalizedUser).toEqual(mockSSOUserIDIR);
  });
});