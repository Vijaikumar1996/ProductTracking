import { useState } from "react";
import { Controller } from "react-hook-form";

export default function FileUploadField({
    name,
    control,
    label,
    error,
    required = false,
    accept = "*",
    helperText,
}) {
    const [selectedFile, setSelectedFile] = useState(null);

    return (
        <div>
            {label && (
                <label className="block mb-2 text-sm font-medium">
                    {label}
                    {required && (
                        <span className="text-red-500 ml-1">*</span>
                    )}
                </label>
            )}

            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <>
                        <label className="cursor-pointer block">
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-5 text-center hover:border-blue-500 hover:bg-blue-50 transition-all duration-200">

                                <div className="text-3xl mb-2">
                                    📄
                                </div>

                                <p className="text-sm font-medium text-gray-700">
                                    Click to upload file
                                </p>

                                {helperText && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        {helperText}
                                    </p>
                                )}

                                {selectedFile && (
                                    <div className="mt-3 flex items-center justify-center gap-2">
                                        <div className="inline-flex items-center px-3 py-1 rounded-lg bg-green-100 text-green-700 text-sm">
                                            {selectedFile.name}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();

                                                setSelectedFile(null);

                                                field.onChange(null);
                                            }}
                                            className="px-2 py-1 text-xs rounded bg-red-100 text-red-600 hover:bg-red-200"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}

                                <input
                                    type="file"
                                    accept={accept}
                                    className="hidden"
                                    onChange={(e) => {
                                        const file =
                                            e.target.files?.[0];

                                        setSelectedFile(file);

                                        field.onChange(
                                            e.target.files
                                        );
                                    }}
                                />
                            </div>
                        </label>
                    </>
                )}
            />

            {error && (
                <p className="text-red-500 text-sm mt-1">
                    {error.message}
                </p>
            )}
        </div>
    );
}