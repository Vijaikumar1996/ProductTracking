import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import InputField from "../../components/form/form-input/InputField";
import FormGrid from "../../components/form/FormGrid";

/* ---------------- Schema ---------------- */

const userSchema = z.object({
    employee_id: z.string().min(1, "Employee ID is required"),

    name: z.string().min(1, "Name is required"),

    mobile: z
        .string()
        .min(10, "Mobile number is required"),

    email: z.string().optional(),

    role: z.string().min(1, "Role is required"),

    hub: z.string().min(1, "Hub is required"),

    password: z.string().optional(),

    status: z.string(),
});

/* ---------------- Component ---------------- */

export default function UserForm({
    defaultValues,
    onSubmit,
    isLoading,
    onCancel,
    isEdit = false,
}) {

    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(userSchema),
        defaultValues,
    });

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
        >

            {/* Employee ID + Name */}

            <FormGrid>

                <InputField
                    name="employee_id"
                    label="Employee ID"
                    control={control}
                    error={errors.employee_id}
                    required
                    placeholder="Enter employee ID"
                />

                <InputField
                    name="name"
                    label="Full Name"
                    control={control}
                    error={errors.name}
                    required
                    placeholder="Enter full name"
                />

            </FormGrid>


            {/* Mobile + Email */}

            <FormGrid>

                <InputField
                    name="mobile"
                    label="Mobile Number"
                    control={control}
                    error={errors.mobile}
                    required
                    placeholder="Enter mobile number"
                />

                <InputField
                    name="email"
                    label="Email"
                    control={control}
                    error={errors.email}
                    placeholder="Enter email"
                />

            </FormGrid>


            {/* Role + Hub */}

            <FormGrid>

                <div>

                    <label className="block text-sm font-medium mb-2">
                        Role
                        <span className="text-red-500 ml-1">*</span>
                    </label>

                    <select
                        {...register("role")}
                        className="
                            w-full
                            border border-gray-300
                            rounded-xl
                            px-4 py-2.5
                            text-sm
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                        "
                    >

                        <option value="">
                            Select Role
                        </option>

                        <option value="ADMIN">
                            Admin
                        </option>

                        <option value="SUPERVISOR">
                            Supervisor
                        </option>

                        <option value="HUB_OPERATOR">
                            Hub Operator
                        </option>

                        <option value="DELIVERY_STAFF">
                            Delivery Staff
                        </option>

                    </select>

                    {errors.role && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.role.message}
                        </p>
                    )}

                </div>


                <div>

                    <label className="block text-sm font-medium mb-2">
                        Assigned Hub
                        <span className="text-red-500 ml-1">*</span>
                    </label>

                    <select
                        {...register("hub")}
                        className="
                            w-full
                            border border-gray-300
                            rounded-xl
                            px-4 py-2.5
                            text-sm
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                        "
                    >

                        <option value="">
                            Select Hub
                        </option>

                        <option value="CHENNAI_HUB">
                            Chennai Hub
                        </option>

                        <option value="BANGALORE_HUB">
                            Bangalore Hub
                        </option>

                        <option value="HYDERABAD_HUB">
                            Hyderabad Hub
                        </option>

                    </select>

                    {errors.hub && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.hub.message}
                        </p>
                    )}

                </div>

            </FormGrid>


            {/* Password + Status */}

            <FormGrid>

                <InputField
                    name="password"
                    label={isEdit ? "Reset Password" : "Password"}
                    type="password"
                    control={control}
                    error={errors.password}
                    placeholder={
                        isEdit
                            ? "Enter new password"
                            : "Enter password"
                    }
                />


                <div>

                    <label className="block text-sm font-medium mb-2">
                        Status
                    </label>

                    <select
                        {...register("status")}
                        className="
                            w-full
                            border border-gray-300
                            rounded-xl
                            px-4 py-2.5
                            text-sm
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                        "
                    >

                        <option value="ACTIVE">
                            Active
                        </option>

                        <option value="INACTIVE">
                            Inactive
                        </option>

                    </select>

                </div>

            </FormGrid>


            {/* Buttons */}

            <div className="flex justify-end gap-3 pt-2">

                <button
                    type="button"
                    onClick={onCancel}
                    className="
                        border border-gray-300
                        px-5
                        py-2.5
                        rounded-xl
                        text-gray-700
                        hover:bg-gray-100
                        transition
                    "
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="
                        bg-blue-600
                        text-white
                        px-6
                        py-2.5
                        rounded-xl
                        hover:bg-blue-700
                        transition
                        disabled:opacity-50
                    "
                >
                    {
                        isLoading
                            ? (
                                isEdit
                                    ? "Updating..."
                                    : "Creating..."
                            )
                            : (
                                isEdit
                                    ? "Update User"
                                    : "Create User"
                            )
                    }
                </button>

            </div>

        </form>

    );
}