import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import DataTable from "../../components/common/DataTable";
import InputField from "../../components/form/form-input/InputField";
import FormGrid from "../../components/form/FormGrid";

import UserForm from "./UserForm";

/* ---------------- Component ---------------- */

export default function Users() {

    const { control } = useForm();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const [isEdit, setIsEdit] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);

    /* ---------------- Sample Data ---------------- */

    const users = [
        {
            id: 1,
            employee_id: "EMP1001",
            name: "Ravi Kumar",
            mobile: "9876543210",
            email: "ravi@gmail.com",
            role: "ADMIN",
            hub: "CHENNAI_HUB",
            status: "ACTIVE",
            createdAt: "23-May-2026",
        },

        {
            id: 2,
            employee_id: "EMP1002",
            name: "Arun Raj",
            mobile: "9876543211",
            email: "arun@gmail.com",
            role: "HUB_OPERATOR",
            hub: "BANGALORE_HUB",
            status: "ACTIVE",
            createdAt: "24-May-2026",
        },

        {
            id: 3,
            employee_id: "EMP1003",
            name: "Kumaravel",
            mobile: "9876543212",
            email: "kumar@gmail.com",
            role: "DELIVERY_STAFF",
            hub: "HYDERABAD_HUB",
            status: "INACTIVE",
            createdAt: "25-May-2026",
        },
    ];

    /* ---------------- Handlers ---------------- */

    const handleCreateUser = async (data) => {

        console.log("Create User :", data);

        // API CALL HERE

        setIsDrawerOpen(false);
    };

    const handleUpdateUser = async (data) => {

        console.log("Update User :", data);

        // API CALL HERE

        setIsDrawerOpen(false);
    };

    /* ---------------- Pinned Columns ---------------- */

    const pinnedColumns = useMemo(
        () => ({
            left: ["employee_id"],
        }),
        []
    );

    /* ---------------- Columns ---------------- */

    const columns = useMemo(
        () => [
            {
                accessorKey: "employee_id",
                header: "Employee ID",
                cell: (info) => (
                    <span className="font-semibold text-gray-800 whitespace-nowrap">
                        {info.getValue()}
                    </span>
                ),
            },

            {
                accessorKey: "name",
                header: "Name",
                cell: (info) => (
                    <span className="text-gray-700 whitespace-nowrap">
                        {info.getValue()}
                    </span>
                ),
            },

            {
                accessorKey: "mobile",
                header: "Mobile",
                cell: (info) => (
                    <span className="text-gray-600 whitespace-nowrap">
                        {info.getValue()}
                    </span>
                ),
            },

            {
                accessorKey: "role",
                header: "Role",
                cell: ({ row }) => {

                    const role = row.original.role;

                    const styles = {
                        ADMIN:
                            "bg-purple-100 text-purple-700",

                        HUB_OPERATOR:
                            "bg-blue-100 text-blue-700",

                        DELIVERY_STAFF:
                            "bg-cyan-100 text-cyan-700",

                        SUPERVISOR:
                            "bg-orange-100 text-orange-700",
                    };

                    return (
                        <span
                            className={`
                                px-3
                                py-1
                                rounded-full
                                text-xs
                                font-medium
                                whitespace-nowrap
                                ${styles[role]}
                            `}
                        >
                            {role.replaceAll("_", " ")}
                        </span>
                    );
                },
            },

            {
                accessorKey: "hub",
                header: "Hub",
                cell: ({ row }) => (
                    <span className="text-gray-600 whitespace-nowrap">
                        {row.original.hub.replaceAll("_", " ")}
                    </span>
                ),
            },

            {
                accessorKey: "status",
                header: "Status",
                cell: ({ row }) => {

                    const status = row.original.status;

                    const styles = {
                        ACTIVE:
                            "bg-green-100 text-green-700",

                        INACTIVE:
                            "bg-red-100 text-red-700",
                    };

                    return (
                        <span
                            className={`
                                px-3
                                py-1
                                rounded-full
                                text-xs
                                font-medium
                                whitespace-nowrap
                                ${styles[status]}
                            `}
                        >
                            {status}
                        </span>
                    );
                },
            },

            {
                accessorKey: "createdAt",
                header: "Created At",
                cell: (info) => (
                    <span className="text-gray-600 whitespace-nowrap">
                        {info.getValue()}
                    </span>
                ),
            },

            {
                id: "actions",
                header: "Actions",
                cell: ({ row }) => (
                    <button
                        onClick={() => {
                            setSelectedUser(row.original);
                            setIsEdit(true);
                            setIsDrawerOpen(true);
                        }}
                        className="
                            text-blue-600
                            hover:underline
                            whitespace-nowrap
                            font-medium
                        "
                    >
                        Edit
                    </button>
                ),
            },
        ],
        []
    );

    return (

        <div className="space-y-6">

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-2xl font-semibold text-gray-800">
                        Users
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Manage logistics application users
                    </p>

                </div>

                <button
                    onClick={() => {
                        setIsEdit(false);
                        setSelectedUser(null);
                        setIsDrawerOpen(true);
                    }}
                    className="
                        px-5
                        py-2.5
                        bg-blue-600
                        text-white
                        rounded-xl
                        hover:bg-blue-700
                        transition
                    "
                >
                    + Create User
                </button>

            </div>


            {/* Main Section */}

            <div className="bg-white p-5 rounded-2xl border border-gray-200">

                {/* Filters */}

                <div className="mb-5">

                    <FormGrid cols={4} gap={4}>

                        <InputField
                            name="employee_id"
                            label="Employee ID"
                            placeholder="Search employee ID"
                            control={control}
                        />

                        <InputField
                            name="mobile"
                            label="Mobile Number"
                            placeholder="Search mobile number"
                            control={control}
                        />

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Role
                            </label>

                            <select
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
                                    All Roles
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

                        </div>

                        <div className="flex items-end">

                            <button
                                className="
                                    w-full
                                    bg-gray-900
                                    text-white
                                    rounded-xl
                                    px-4 py-2.5
                                    hover:bg-black
                                    transition
                                "
                            >
                                Search
                            </button>

                        </div>

                    </FormGrid>

                </div>


                {/* Data Table */}

                <DataTable
                    data={users}
                    columns={columns}
                    pageSize={10}
                    pinnedColumns={pinnedColumns}
                    emptyMessage="No users found"
                    globalSearch={false}
                />

            </div>


            {/* Drawer */}

            {
                isDrawerOpen && (
                    <div className="fixed inset-0 bg-black/40 z-1000 flex justify-end">

                        <div className="w-full max-w-3xl bg-white h-full overflow-y-auto shadow-2xl">

                            {/* Header */}

                            <div className="flex items-center justify-between p-6 border-b">

                                <div>

                                    <h2 className="text-xl font-semibold text-gray-800">

                                        {
                                            isEdit
                                                ? "Edit User"
                                                : "Create User"
                                        }

                                    </h2>

                                    <p className="text-sm text-gray-500 mt-1">

                                        {
                                            isEdit
                                                ? "Update user details"
                                                : "Create logistics application user"
                                        }

                                    </p>

                                </div>

                                <button
                                    onClick={() => setIsDrawerOpen(false)}
                                    className="
                                        text-gray-500
                                        hover:text-black
                                        text-2xl
                                    "
                                >
                                    ×
                                </button>

                            </div>


                            {/* Form */}

                            <div className="p-6">

                                <UserForm
                                    defaultValues={
                                        selectedUser || {
                                            employee_id: "",
                                            name: "",
                                            mobile: "",
                                            email: "",
                                            role: "",
                                            hub: "",
                                            password: "",
                                            status: "ACTIVE",
                                        }
                                    }
                                    onSubmit={
                                        isEdit
                                            ? handleUpdateUser
                                            : handleCreateUser
                                    }
                                    isLoading={false}
                                    onCancel={() => setIsDrawerOpen(false)}
                                    isEdit={isEdit}
                                />

                            </div>

                        </div>

                    </div>
                )
            }

        </div>

    );
}