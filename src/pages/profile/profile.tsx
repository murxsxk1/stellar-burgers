import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { updateUser } from '../../services/slices/user';

export const Profile: FC = () => {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  const getPasswordDisplayValue = () => {
    if (editMode.password) {
      return formValue.password;
    }
    return '••••••••';
  };

  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    password: false
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!isFormChanged) return;
    const updateData = {
      name: formValue.name,
      email: formValue.email,
      ...(formValue.password && { password: formValue.password })
    };

    await dispatch(updateUser(updateData));

    setEditMode({
      name: false,
      email: false,
      password: false
    });
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });

    setEditMode({
      name: false,
      email: false,
      password: false
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editMode[e.target.name as keyof typeof editMode]) {
      setFormValue((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }));
    }
  };

  const handleEditToggle = (fieldName: keyof typeof editMode) => {
    setEditMode((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName]
    }));
    if (editMode[fieldName]) {
      if (fieldName === 'name') {
        setFormValue((prev) => ({ ...prev, name: user?.name || '' }));
      } else if (fieldName === 'email') {
        setFormValue((prev) => ({ ...prev, email: user?.email || '' }));
      } else if (fieldName === 'password') {
        setFormValue((prev) => ({ ...prev, password: '' }));
      }
    }
  };

  return (
    <ProfileUI
      formValue={formValue}
      passwordDisplayValue={getPasswordDisplayValue()}
      isFormChanged={isFormChanged}
      editMode={editMode}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      handleEditToggle={handleEditToggle}
    />
  );
};
