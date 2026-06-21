import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { changePasswordApi } from "../../services/authService";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function ChangePasswordModal({ isOpen, onClose }) {
    const { user } = useSelector((state) => state.auth);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const mutation = useMutation({
        mutationFn: changePasswordApi,
        onSuccess: (data) => {
            toast.success(data.message || "Password changed successfully");
            onClose();
            setCurrentPassword("");
            setNewPassword("");
        },
        onError: (error) => {
            debugger
            toast.error(error.response?.data?.message || "Something went wrong");
        },
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        mutation.mutate({
            userId: Number(user?.userId),
            currentPassword,
            newPassword,
        });
    };

    return (
        <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/40">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg w-full max-w-md p-6">

                <h2 className="text-lg font-semibold mb-4">Change Password</h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="password"
                        placeholder="Current Password"
                        className="w-full p-2 border rounded"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="New Password"
                        className="w-full p-2 border rounded"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <div className="flex justify-end gap-2 mt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            {mutation.isPending ? "Updating..." : "Update"}
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
}