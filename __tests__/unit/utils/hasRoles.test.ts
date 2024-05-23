import { hasAllRoles, hasAtLeastOneRole } from '@/utils';

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
