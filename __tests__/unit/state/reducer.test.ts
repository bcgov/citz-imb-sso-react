import { AuthAction, AuthState } from '@/types';
import { AuthActionType, initialState, reducer } from '@/state/reducer';
import { mockOriginalSSOUserIDIR } from '__tests__/__mocks__';

// Test suite for reducer
describe('SSO Reducer', () => {
  // Test case: handles logout action correctly
  it('handles logout action correctly', () => {
    const currentState: AuthState = {
      accessToken: 'dummy_access_token',
      idToken: 'dummy_id_token',
      userInfo: mockOriginalSSOUserIDIR,
    };
    const action: AuthAction = { type: AuthActionType.LOGOUT };
    const newState = reducer(currentState, action);
    expect(newState).toEqual(initialState);
  });

  // Test case: handles refresh token action correctly
  it('handles refresh token action correctly', () => {
    const currentState: AuthState = {
      accessToken: 'old_access_token',
      idToken: 'old_id_token',
      userInfo: mockOriginalSSOUserIDIR,
    };
    const action: AuthAction = {
      type: AuthActionType.REFRESH_TOKEN,
      payload: {
        accessToken: 'new_access_token',
        idToken: 'new_id_token',
        userInfo: mockOriginalSSOUserIDIR,
      },
    };
    const newState = reducer(currentState, action);
    expect(newState.accessToken).toBe('new_access_token');
    expect(newState.idToken).toBe('new_id_token');
    expect(newState.userInfo).toEqual(mockOriginalSSOUserIDIR);
  });

  // Test case: throws error for invalid action type
  it('throws error for invalid action type', () => {
    const invalidAction: AuthAction = { type: 'INVALID_ACTION' as AuthActionType };
    expect(() => reducer(initialState, invalidAction)).toThrow(
      'Invalid AuthActionType in SSO reducer',
    );
  });
});
