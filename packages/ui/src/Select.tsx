"use client";

export const Select = ({
  options,
  onSelect,
  register,
  errors,
  name,
}: {
  onSelect?: (value: string) => void;
  options: {
    key: string;
    value: string;
  }[];
  register?: any;
  name: string;
  errors?: any;
}) => {
  return (
    <div className="pt-2">
      <select
        {...register(name)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        {options.map((option) => (
          <option value={option.key}>{option.value}</option>
        ))}
      </select>
      {errors[name] && (
        <span className="text-red-500 text-sm">{errors[name].message}</span>
      )}
    </div>
  );
};
