import reducer, {
  forgotPassword,
  resetPassword,
  clearPasswordState,
  initialState
} from '../password';

describe('Тесты, проверяющие работу passwordSlice', () => {
  // === forgotPassword ===
  test('Проверка pending состояния forgotPassword', () => {
    const state = reducer(initialState, { type: forgotPassword.pending.type });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('Проверка fulfilled состояния forgotPassword', () => {
    const state = reducer(initialState, {
      type: forgotPassword.fulfilled.type
    });
    expect(state.loading).toBe(false);
    expect(state.isResetEmailSent).toBe(true);
  });

  test('Проверка rejected состояния forgotPassword', () => {
    const errorMessage = 'Ошибка отправки email для сброса пароля';
    const state = reducer(initialState, {
      type: forgotPassword.rejected.type,
      error: { message: errorMessage }
    });
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  // === resetPassword ===
  test('Проверка pending состояния resetPassword', () => {
    const state = reducer(initialState, { type: resetPassword.pending.type });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('Проверка fulfilled состояния resetPassword', () => {
    const state = reducer(initialState, { type: resetPassword.fulfilled.type });
    expect(state.loading).toBe(false);
    expect(state.isPasswordReset).toBe(true);
  });

  test('Проверка rejected состояния resetPassword', () => {
    const errorMessage = 'Ошибка сброса пароля';
    const state = reducer(initialState, {
      type: resetPassword.rejected.type,
      error: { message: errorMessage }
    });
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  test('Проверка clearPasswordState', () => {
    const filledState = {
      loading: false,
      error: 'Ошибка',
      isResetEmailSent: true,
      isPasswordReset: true
    };
    const state = reducer(filledState, clearPasswordState());
    expect(state.error).toBeNull();
    expect(state.isResetEmailSent).toBe(false);
    expect(state.isPasswordReset).toBe(false);
  });
});
