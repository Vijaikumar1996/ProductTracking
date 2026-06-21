import { Controller } from "react-hook-form";

export default function InputField({
    name,
    control,
    label,
    type = "text",
    error,
    placeholder,
    required = false,
}) {
    return (
        <div>
            {label && (
                <label className="block mb-1 text-sm font-medium">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        type={type}
                        placeholder={placeholder}
                        className="w-full border px-3 py-2 rounded"
                    />
                )}
            />

            {error && (
                <p className="text-red-500 text-sm mt-1">{error?.message}</p>
            )}
        </div>
    );
}