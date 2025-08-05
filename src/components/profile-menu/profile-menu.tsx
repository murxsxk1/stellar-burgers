import { FC } from 'react';
import { ProfileMenuUI } from '@ui';
import { useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { logoutUser } from '../../services/slices/user';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return <ProfileMenuUI pathname={pathname} handleLogout={handleLogout} />;
};
