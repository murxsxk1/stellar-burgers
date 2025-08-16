import {
  userSlice,
  clearRegisterError,
  clearLoginError,
  clearUpdateError,
  authChecked,
  userLogout,
  getUser,
  checkUserAuth,
  updateUser,
  loginUser,
  registerUser,
  initialState
} from '../user';

describe('Тесты, проверяющие работу user', () => {
  test('Проверка authChecked', () => {
    const nextState = userSlice.reducer(initialState, authChecked());
    expect(nextState.isAuthChecked).toBe(true);
  });

  test('Проверка userLogout', () => {
    const prevState = {
      ...initialState,
      data: { name: 'Test', email: 'test@example.com' },
      isAuthenticated: true
    };
    const nextState = userSlice.reducer(prevState, userLogout());
    expect(nextState.data).toBeNull();
    expect(nextState.isAuthenticated).toBe(false);
  });

  test('Проверка clearRegisterError', () => {
    const prevState = { ...initialState, registerUserError: 'Error' };
    const nextState = userSlice.reducer(prevState, clearRegisterError());
    expect(nextState.registerUserError).toBeNull();
  });

  test('Проверка clearLoginError', () => {
    const prevState = { ...initialState, loginUserError: 'Error' };
    const nextState = userSlice.reducer(prevState, clearLoginError());
    expect(nextState.loginUserError).toBeNull();
  });

  test('Проверка clearUpdateError', () => {
    const prevState = { ...initialState, updateUserError: 'Error' };
    const nextState = userSlice.reducer(prevState, clearUpdateError());
    expect(nextState.updateUserError).toBeNull();
  });
});

describe('Тесты, проверяющие работу экстра редюсеров user', () => {
  // ===== registerUser =====
  test('Проверка pending состояния registerUser', () => {
    const nextState = userSlice.reducer(initialState, {
      type: registerUser.pending.type
    });
    expect(nextState.registerUserRequest).toBe(true);
    expect(nextState.registerUserError).toBeNull();
  });

  test('Проверка fulfilled состояния registerUser', () => {
    const user = { name: 'Test' };
    const nextState = userSlice.reducer(initialState, {
      type: registerUser.fulfilled.type,
      payload: { user }
    });
    expect(nextState.data).toEqual(user);
    expect(nextState.isAuthenticated).toBe(true);
    expect(nextState.isAuthChecked).toBe(true);
    expect(nextState.registerUserRequest).toBe(false);
  });

  test('Проверка rejected состояния registerUser', () => {
    const payload = { message: 'Ошибка регистрации' };
    const nextState = userSlice.reducer(initialState, {
      type: registerUser.rejected.type,
      payload
    });
    expect(nextState.registerUserError).toBe('Ошибка регистрации');
    expect(nextState.isAuthChecked).toBe(true);
    expect(nextState.registerUserRequest).toBe(false);
  });

  // ===== loginUser =====
  test('Проверка pending состояния loginUser', () => {
    const nextState = userSlice.reducer(initialState, {
      type: loginUser.pending.type
    });
    expect(nextState.loginUserRequest).toBe(true);
    expect(nextState.loginUserError).toBeNull();
  });

  test('Проверка fulfilled состояния loginUser', () => {
    const user = { name: 'Test' };
    const nextState = userSlice.reducer(initialState, {
      type: loginUser.fulfilled.type,
      payload: { user }
    });
    expect(nextState.data).toEqual(user);
    expect(nextState.isAuthenticated).toBe(true);
    expect(nextState.isAuthChecked).toBe(true);
    expect(nextState.loginUserRequest).toBe(false);
  });

  test('Проверка rejected состояния loginUser', () => {
    const payload = { message: 'Ошибка входа' };
    const nextState = userSlice.reducer(initialState, {
      type: loginUser.rejected.type,
      payload
    });
    expect(nextState.loginUserError).toBe('Ошибка входа');
    expect(nextState.isAuthChecked).toBe(true);
    expect(nextState.loginUserRequest).toBe(false);
  });

  // ===== updateUser =====
  test('Проверка pending состояния updateUser', () => {
    const nextState = userSlice.reducer(initialState, {
      type: updateUser.pending.type
    });
    expect(nextState.updateUserRequest).toBe(true);
    expect(nextState.updateUserError).toBeNull();
  });

  test('Проверка fulfilled состояния updateUser', () => {
    const user = { name: 'Test' };
    const nextState = userSlice.reducer(initialState, {
      type: updateUser.fulfilled.type,
      payload: { user }
    });
    expect(nextState.data).toEqual(user);
    expect(nextState.updateUserRequest).toBe(false);
  });

  test('Проверка rejected состояния updateUser', () => {
    const payload = { message: 'Ошибка' };
    const nextState = userSlice.reducer(initialState, {
      type: updateUser.rejected.type,
      payload
    });
    expect(nextState.updateUserError).toBe('Ошибка');
    expect(nextState.updateUserRequest).toBe(false);
  });

  // ===== getUser =====
  test('Проверка fulfilled состояния getUser', () => {
    const user = { name: 'Test' };
    const nextState = userSlice.reducer(initialState, {
      type: getUser.fulfilled.type,
      payload: { user }
    });
    expect(nextState.data).toEqual(user);
    expect(nextState.isAuthenticated).toBe(true);
    expect(nextState.isAuthChecked).toBe(true);
  });

  test('Проверка rejected состояния getUser', () => {
    const nextState = userSlice.reducer(initialState, {
      type: getUser.rejected.type
    });
    expect(nextState.data).toBeNull();
    expect(nextState.isAuthenticated).toBe(false);
    expect(nextState.isAuthChecked).toBe(true);
  });

  // ===== checkUserAuth =====
  test('Проверка fulfilled состояния checkUserAuth', () => {
    const nextState = userSlice.reducer(initialState, {
      type: checkUserAuth.fulfilled.type
    });
    expect(nextState.isAuthChecked).toBe(true);
  });
});
