import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store'; 
import { logout as logoutAction } from '../store/slices/authSlice';
import { AuthUser } from '../store/slices/authThunks';

// Экспортируем правильный тип User (совпадает с ответом бэкенда)
export type User = AuthUser;

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  //  читаем isLoading вместо loading
  const { user, isAuthenticated, isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const logout = () => {
    // Вызываем action из authSlice, который очистит Redux и localStorage
    dispatch(logoutAction());
  };

  //  isLoading
  const isGuest = !isAuthenticated && !isLoading;

  return {
    user,
    isLoading, // возвращаем isLoading во внешнюю среду
    error,
    logout,
    isAuthenticated,
    isGuest,
  };
};