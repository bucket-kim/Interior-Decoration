import { ChangeEvent, FC } from 'react';

interface UserInputProps {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const UserInput: FC<UserInputProps> = ({
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="relative">
      <input
        type={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        required
      />
    </div>
  );
};

export default UserInput;
