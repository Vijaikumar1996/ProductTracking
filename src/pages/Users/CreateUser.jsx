import { useNavigate } from "react-router";

import UserForm from "./UserForm";

/* ---------------- Component ---------------- */

export default function CreateUser() {

    const navigate = useNavigate();

    /* ---------------- Handlers ---------------- */

    const handleCreateUser = async (data) => {

        console.log("Create User Payload :", data);

        // API CALL HERE

        // await createUser(data);

        navigate("/users");
    };

    return (

        <div className="max-w-5xl mx-auto">

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

                {/* Header */}

                <div className="border-b border-gray-200 px-8 py-6">

                    <h1 className="text-2xl font-semibold text-gray-800">
                        Create User
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Create a new logistics application user
                    </p>

                </div>


                {/* Form */}

                <div className="p-8">

                    <UserForm
                        defaultValues={{
                            employee_id: "",
                            name: "",
                            mobile: "",
                            email: "",
                            role: "",
                            hub: "",
                            password: "",
                            status: "ACTIVE",
                        }}
                        onSubmit={handleCreateUser}
                        isLoading={false}
                        onCancel={() => navigate("/users")}
                    />

                </div>

            </div>

        </div>

    );
}