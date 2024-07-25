import { useState } from 'react';
import { useGetUsersQuery, useUpdateUserMutation } from '../apiservices/users';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EditIcon, TrashIcon, Loader2 } from 'lucide-react';
import NavigationButtons from "./backbutton";

interface User {
  user_id: number;
  full_name: string;
  email: string;
  contact_phone: string;
  address: string;
  is_active: boolean;
}

const UserTable = () => {
  const { data: usersData, error, isLoading, isError } = useGetUsersQuery();
  const [updateUser] = useUpdateUserMutation();
  // Remove the declaration and assignment of newUser and setNewUser
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleToggleActiveStatus = async (user: User) => {
    try {
      await updateUser({ id: user.user_id, ...user, is_active: !user.is_active }).unwrap();
      toast.success(`User ${user.is_active ? 'disabled' : 'enabled'} successfully`);
    } catch (err) {
      toast.error('Failed to update user status');
    }
  };

  const handleUpdate = async (user_id: number) => {
    if (editingUser) {
      try {
        await updateUser({ id: user_id, ...editingUser }).unwrap();
        setEditingUser(null);
        toast.success('User updated successfully');
      } catch (err) {
        toast.error('Failed to update user');
      }
    }
  };

  const isFetchBaseQueryError = (error: unknown): error is { status: number; data: unknown } => {
    return typeof error === 'object' && error !== null && 'status' in error && 'data' in error;
  };

  const renderErrorMessage = (error: unknown) => {
    if (isFetchBaseQueryError(error)) {
      const errorData = error.data as { message?: string };
      return errorData.message || 'An unknown error occurred';
    }
    return 'An unknown error occurred';
  };

  return (
    <>
      <NavigationButtons />
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} pauseOnHover={true} draggable={true} />
      <div className="overflow-x-auto bg-gray-800 rounded-lg p-4 text-gray-200">
        <h1 className="text-2xl font-semibold mb-4">Users Data</h1>

        <table className="min-w-full bg-gray-700 text-gray-200 rounded-lg">
          <thead>
            <tr>
              <th className="p-2">user_id</th>
              <th className="p-2">full_name</th>
              <th className="p-2">email</th>
              <th className="p-2">contact_phone</th>
              <th className="p-2">address</th>
              <th className="p-2">status</th>
              <th className="p-2">Options</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="p-2 text-center">
                  <Loader2 className="h-6 w-6 mx-auto animate-spin" />
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={7} className="p-2 text-center">
                  Error: {renderErrorMessage(error)}
                </td>
              </tr>
            ) : (
              usersData &&
              usersData.map((user: User) => (
                <tr key={user.user_id}>
                  <td className="p-2">{user.user_id}</td>
                  <td className="p-2">{user.full_name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.contact_phone}</td>
                  <td className="p-2">{user.address}</td>
                  <td className="p-2">{user.is_active ? 'Active' : 'Inactive'}</td>
                  <td className="p-2 flex gap-2">
                    <button type="button" className="btn btn-sm btn-outline btn-info" onClick={() => setEditingUser(user)} title="Edit User">
                      <EditIcon />
                    </button>
                    <button type="button" className="btn btn-sm btn-outline btn-warning" onClick={() => handleToggleActiveStatus(user)} title={`Set ${user.is_active ? 'Inactive' : 'Active'}`}>
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={7} className="p-2 text-center">
                {usersData ? `${usersData.length} records` : '0 records'}
              </td>
            </tr>
          </tfoot>
        </table>

        {editingUser && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Update User</h3>
              <input
                type="text"
                placeholder="Full Name"
                value={editingUser.full_name || ''}
                onChange={(e) => setEditingUser({ ...editingUser, full_name: e.target.value })}
                className="input input-bordered mb-2"
              />
              <input
                type="text"
                placeholder="Email"
                value={editingUser.email || ''}
                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                className="input input-bordered mb-2"
              />
              <input
                type="text"
                placeholder="Phone"
                value={editingUser.contact_phone || ''}
                onChange={(e) => setEditingUser({ ...editingUser, contact_phone: e.target.value })}
                className="input input-bordered mb-2"
              />
              <input
                type="text"
                placeholder="Address"
                value={editingUser.address || ''}
                onChange={(e) => setEditingUser({ ...editingUser, address: e.target.value })}
                className="input input-bordered mb-2"
              />
              <div className="modal-action">
                <button className="btn btn-primary" onClick={() => handleUpdate(editingUser.user_id)}>
                  Save
                </button>
                <button className="btn" onClick={() => setEditingUser(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserTable;
