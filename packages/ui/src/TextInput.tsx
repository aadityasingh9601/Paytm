"use client";

export const TextInput = ({
  placeholder,
  type,
  label,
  register,
  name,
  errors,
  options,
  size,
}: {
  placeholder: string;
  label: string;
  type?: string;
  register: any;
  name: string;
  errors?: any;
  options?: any;
  size: "sm" | "md";
}) => {
  const sizeClasses = {
    sm: "w-[25rem] py-2",
    md: "w-full py-4",
  };
  return (
    <div className="pt-2">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        {...register(name, { ...options })}
        type={type}
        id="first_name"
        className={`bg-gray-50 border border-gray-300 ${sizeClasses[size]} px-2.5 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block`}
        placeholder={placeholder}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm">{errors[name].message}</span>
      )}
    </div>
  );
};
