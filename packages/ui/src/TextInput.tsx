"use client";

export const TextInput = ({
  children,
  placeholder,
  type,
  label,
  register,
  name,
  errors,
  options,
  size,
  isReadOnly = false,
}: {
  children?: React.ReactNode;
  placeholder: string;
  label: string;
  type?: string;
  register: any;
  name: string;
  errors?: any;
  options?: any;
  size: "sm" | "md";
  isReadOnly?: boolean;
}) => {
  const sizeClasses = {
    sm: "w-[28rem] py-3",
    md: "w-full py-4 ",
  };
  return (
    <div className={size == "md" ? "pt-3" : "mb-2"}>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        {...register(name, { ...options })}
        type={type}
        readOnly={isReadOnly}
        id="first_name"
        className={`bg-gray-50 border border-gray-300 ${isReadOnly ? "text-gray-500 focus:border-gray-300" : "text-gray-900"} ${sizeClasses[size]} px-2.5 text-sm rounded-lg block`}
        placeholder={placeholder}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm">{errors[name].message}</span>
      )}
      <div className="text-red-500 text-sm">{children}</div>
    </div>
  );
};
