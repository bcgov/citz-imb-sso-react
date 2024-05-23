import { SSOUser } from '@/types';
import { normalizeUser } from '@/utils';
import {
  mockOriginalSSOUserBCeID,
  mockOriginalSSOUserGitHub,
  mockOriginalSSOUserIDIR,
  mockSSOUserBCeID,
  mockSSOUserGitHub,
  mockSSOUserIDIR,
} from '__tests__/__mocks__';

// Test suite for user normalization
describe('User Normalization', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test case: normalizes user data correctly for IDIR
  it('normalizes user data correctly for IDIR', () => {
    const normalizedUser: SSOUser = normalizeUser(mockOriginalSSOUserIDIR);
    expect(normalizedUser).toEqual(mockSSOUserIDIR);
  });

  // Test case: normalizes user data correctly for BCeID
  it('normalizes user data correctly for BCeID', () => {
    const normalizedUser: SSOUser = normalizeUser(mockOriginalSSOUserBCeID);
    expect(normalizedUser).toEqual(mockSSOUserBCeID);
  });

  // Test case: normalizes user data correctly for GitHub
  it('normalizes user data correctly for GitHub', () => {
    const normalizedUser: SSOUser = normalizeUser(mockOriginalSSOUserGitHub);
    expect(normalizedUser).toEqual(mockSSOUserGitHub);
  });

  // Test case: normalizes user data correctly when userInfo properties are undefined
  it('normalizes user data correctly when userInfo properties are undefined (IDIR)', () => {
    const normalizedUser: SSOUser = normalizeUser({
      preferred_username: 'compositeUser',
      email: 'composite@example.com',
      display_name: 'Composite User',
      identity_provider: 'idir',
    });
    expect(normalizedUser).toEqual({
      name: '',
      preferred_username: 'compositeUser',
      email: 'composite@example.com',
      display_name: 'Composite User',
      client_roles: [],
      scope: '',
      identity_provider: 'idir',
      guid: '',
      username: '',
      first_name: '',
      last_name: '',
      originalData: {
        preferred_username: 'compositeUser',
        email: 'composite@example.com',
        display_name: 'Composite User',
        identity_provider: 'idir',
      },
    });
  });

  // Test case: normalizes user data correctly when userInfo properties are undefined
  it('normalizes user data correctly when userInfo properties are undefined (BCeID)', () => {
    const normalizedUser: SSOUser = normalizeUser({
      preferred_username: 'compositeUser',
      email: 'composite@example.com',
      display_name: 'Composite User',
      identity_provider: 'bceidboth',
    });
    expect(normalizedUser).toEqual({
      name: '',
      preferred_username: 'compositeUser',
      email: 'composite@example.com',
      display_name: 'Composite User',
      client_roles: [],
      scope: '',
      identity_provider: 'bceidboth',
      guid: '',
      username: '',
      first_name: 'Composite',
      last_name: 'User',
      originalData: {
        preferred_username: 'compositeUser',
        email: 'composite@example.com',
        display_name: 'Composite User',
        identity_provider: 'bceidboth',
      },
    });
  });

  // Test case: normalizes user data correctly when userInfo properties are undefined
  it('normalizes user data correctly when userInfo properties are undefined (GitHub)', () => {
    const normalizedUser: SSOUser = normalizeUser({
      preferred_username: 'compositeUser',
      email: 'composite@example.com',
      display_name: 'Composite User',
      identity_provider: 'githubbcgov',
    });
    expect(normalizedUser).toEqual({
      name: '',
      preferred_username: 'compositeUser',
      email: 'composite@example.com',
      display_name: 'Composite User',
      client_roles: [],
      scope: '',
      identity_provider: 'githubbcgov',
      guid: '',
      username: '',
      first_name: 'Composite',
      last_name: 'User',
      originalData: {
        preferred_username: 'compositeUser',
        email: 'composite@example.com',
        display_name: 'Composite User',
        identity_provider: 'githubbcgov',
      },
    });
  });
});
