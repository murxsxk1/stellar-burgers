import { ChangeEvent, SyntheticEvent } from 'react';

export type ProfileUIProps = {
  formValue: {
    name: string;
    email: string;
    password: string;
  };
  passwordDisplayValue: string;
  isFormChanged: boolean;
  editMode: {
    name: boolean;
    email: boolean;
    password: boolean;
  };
  handleSubmit: (e: SyntheticEvent) => void;
  handleCancel: (e: SyntheticEvent) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleEditToggle: (fieldName: 'name' | 'email' | 'password') => void;
  updateUserError?: string;
};
