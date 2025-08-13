import { userSlice, clearRegisterError, clearLoginError, clearUpdateError, authChecked, userLogout, getUser, checkUserAuth, updateUser, loginUser, registerUser } from "../user";


describe('Тесты, проверяющие работу user', () => {
  const initialState = {
    data: null,
    isAuthenticated: false,
    isAuthChecked: false,
    registerUserRequest: false,
    loginUserRequest: false,
    updateUserRequest: false,
    registerUserError: null,
    loginUserError: null,
    updateUserError: null,
  };

  it('Проверка authChecked', () => {
    const nextState = userSlice.reducer(initialState, authChecked());
    expect(nextState.isAuthChecked).toBe(true);
  });

  it('Проверка userLogout', () => {
    const prevState = { ...initialState, data: { name: 'Test', email: 'test@example.com' }, isAuthenticated: true };
    const nextState = userSlice.reducer(prevState, userLogout());
    expect(nextState.data).toBeNull();
    expect(nextState.isAuthenticated).toBe(false);
  });

  it('Проверка clearRegisterError', () => {
    const prevState = { ...initialState, registerUserError: 'Error' };
    const nextState = userSlice.reducer(prevState, clearRegisterError());
    expect(nextState.registerUserError).toBeNull();
  });

  it('Проверка clearLoginError', () => {
    const prevState = { ...initialState, loginUserError: 'Error' };
    const nextState = userSlice.reducer(prevState, clearLoginError());
    expect(nextState.loginUserError).toBeNull();
  });

  it('Проверка clearUpdateError', () => {
    const prevState = { ...initialState, updateUserError: 'Error' };
    const nextState = userSlice.reducer(prevState, clearUpdateError());
    expect(nextState.updateUserError).toBeNull();
  });
});

describe('Тесты, проверяющие работу экстра редюсеров user', () => {
  const initialState = {
    data: null,
    isAuthenticated: false,
    isAuthChecked: false,
    registerUserRequest: false,
    loginUserRequest: false,
    updateUserRequest: false,
    registerUserError: null,
    loginUserError: null,
    updateUserError: null,
  };

  // ===== registerUser =====
  it('Проверка pending состояния registerUser', () => {
    const nextState = userSlice.reducer(initialState, { type: registerUser.pending.type });
    expect(nextState.registerUserRequest).toBe(true);
    expect(nextState.registerUserError).toBeNull();
  });

  it('Проверка fulfilled состояния registerUser', () => {
    const user = { name: 'Test' };
    const nextState = userSlice.reducer(initialState, { type: registerUser.fulfilled.type, payload: { user } });
    expect(nextState.data).toEqual(user);
    expect(nextState.isAuthenticated).toBe(true);
    expect(nextState.isAuthChecked).toBe(true);
    expect(nextState.registerUserRequest).toBe(false);
  });

  it('Проверка rejected состояния registerUser', () => {
    const payload = { message: 'Ошибка' };
    const nextState = userSlice.reducer(initialState, { type: registerUser.rejected.type, payload });
    expect(nextState.registerUserError).toBe('Ошибка');
    expect(nextState.isAuthChecked).toBe(true);
    expect(nextState.registerUserRequest).toBe(false);
  });

  // ===== loginUser =====
  it('Проверка pending состояния loginUser', () => {
    const nextState = userSlice.reducer(initialState, { type: loginUser.pending.type });
    expect(nextState.loginUserRequest).toBe(true);
    expect(nextState.loginUserError).toBeNull();
  });

  it('Проверка fulfilled состояния loginUser', () => {
    const user = { name: 'Test' };
    const nextState = userSlice.reducer(initialState, { type: loginUser.fulfilled.type, payload: { user } });
    expect(nextState.data).toEqual(user);
    expect(nextState.isAuthenticated).toBe(true);
    expect(nextState.isAuthChecked).toBe(true);
    expect(nextState.loginUserRequest).toBe(false);
  });

  it('Проверка rejected состояния loginUser', () => {
    const payload = { message: 'Ошибка' };
    const nextState = userSlice.reducer(initialState, { type: loginUser.rejected.type, payload });
    expect(nextState.loginUserError).toBe('Ошибка');
    expect(nextState.isAuthChecked).toBe(true);
    expect(nextState.loginUserRequest).toBe(false);
  });

  // ===== updateUser =====
  it('Проверка pending состояния updateUser', () => {
    const nextState = userSlice.reducer(initialState, { type: updateUser.pending.type });
    expect(nextState.updateUserRequest).toBe(true);
    expect(nextState.updateUserError).toBeNull();
  });

  it('Проверка fulfilled состояния updateUser', () => {
    const user = { name: 'Test' };
    const nextState = userSlice.reducer(initialState, { type: updateUser.fulfilled.type, payload: { user } });
    expect(nextState.data).toEqual(user);
    expect(nextState.updateUserRequest).toBe(false);
  });

  it('Проверка rejected состояния updateUser', () => {
    const payload = { message: 'Ошибка' };
    const nextState = userSlice.reducer(initialState, { type: updateUser.rejected.type, payload });
    expect(nextState.updateUserError).toBe('Ошибка');
    expect(nextState.updateUserRequest).toBe(false);
  });

  // ===== getUser =====
  it('Проверка fulfilled состояния getUser', () => {
    const user = { name: 'Test' };
    const nextState = userSlice.reducer(initialState, { type: getUser.fulfilled.type, payload: { user } });
    expect(nextState.data).toEqual(user);
    expect(nextState.isAuthenticated).toBe(true);
    expect(nextState.isAuthChecked).toBe(true);
  });

  it('Проверка rejected состояния getUser', () => {
    const nextState = userSlice.reducer(initialState, { type: getUser.rejected.type });
    expect(nextState.data).toBeNull();
    expect(nextState.isAuthenticated).toBe(false);
    expect(nextState.isAuthChecked).toBe(true);
  });

  // ===== checkUserAuth =====
  it('Проверка fulfilled состояния checkUserAuth', () => {
    const nextState = userSlice.reducer(initialState, { type: checkUserAuth.fulfilled.type });
    expect(nextState.isAuthChecked).toBe(true);
  });
});