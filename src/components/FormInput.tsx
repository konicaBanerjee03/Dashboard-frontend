import React from 'react';

interface FormInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({ label, type, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-1/3 px-4 py-2 border rounded-md"
      />
    </div>
  );
};

export default FormInput;
