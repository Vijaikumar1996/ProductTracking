import { useNavigate, useParams } from "react-router";

import UserForm from "./UserForm";

/* ---------------- Component ---------------- */

export default function EditUser() {

    const navigate = useNavigate();

    const { id } = useParams();

    /* ---------------- Existing User ---------------- */

    // API CALL HERE

    // const { data: user, isLoading } = useGetUser(id);

    const user = {
        employee_id: "EMP1001",
        name: "Ravi Kumar",
        mobile: "9876543210",
        email: "ravi@gmail.com",
        role: "ADMIN",
        hub: "CHENNAI_HUB",
        password: "",
        status: "ACTIVE",
    };

    /* ---------------- Handlers ---------------- */

    const handleUpdateUser = async (data) => {

        console.log("Update User Payload :", data);

        // API CALL HERE

        // await updateUser(id, data);

        navigate("/users");
    };

    return (

        <div className="max-w-5xl mx-auto">

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

                {/* Header */}

                <div className="border-b border-gray-200 px-8 py-6">

                    <h1 className="text-2xl font-semibold text-gray-800">
                        Edit User
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Update logistics application user details
                    </p>

                </div>


                {/* Form */}

                <div className="p-8">

                    <UserForm
                        defaultValues={user}
                        onSubmit={handleUpdateUser}
                        isLoading={false}
                        onCancel={() => navigate("/users")}
                        isEdit={true}
                    />

                </div>

            </div>

        </div>

    );
}