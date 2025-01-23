export interface UsersType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export interface AuthModuleTypes {
  formData: UsersType;
  setFormData: (formData: UsersType) => void;
}
