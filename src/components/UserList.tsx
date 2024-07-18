import { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { useGetUsersQuery, useDeleteUserMutation, useAddUserMutation, useUpdateUserMutation } from '../apiservices/users';
import { Toaster, toast } from 'sonner';
import { EditIcon, TrashIcon } from 'lucide-react';

interface User {
  user_id: number;
  full_name: string;
  email: string;
  contact_phone: string;
  address: string;
}

const UserTable = () => {
  const { data: usersData, error, isLoading, isError } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [newUser, setNewUser] = useState<Partial<User>>({});
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleDelete = async (user_id: number) => {
    await deleteUser(user_id);
    toast.success('User deleted successfully');
  };

  const handleAdd = async () => {
    if (newUser.full_name && newUser.email && newUser.contact_phone && newUser.address) {
      await addUser(newUser as User);
      setNewUser({});
    } else {
      toast.error('All fields are required');
    }
  };

  const handleUpdate = async (user_id: number) => {
    if (editingUser) {
      await updateUser({ id: user_id, ...editingUser });
      setEditingUser(null);
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
      <Toaster position="top-center" toastOptions={{ classNames: { error: 'bg-red-400', success: 'text-green-400', warning: 'text-yellow-400', info: 'bg-blue-400' } }} />
      <div className="overflow-x-auto text-base-content bg-gray-800 rounded-lg p-4">
        <h1 className="text-xl my-4 text-white">Users Data</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Full Name"
            value={newUser.full_name || ''}
            onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })}
            className="input input-bordered mr-2"
          />
          <input
            type="text"
            placeholder="Email"
            value={newUser.email || ''}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="input input-bordered mr-2"
          />
          <input
            type="text"
            placeholder="Phone"
            value={newUser.contact_phone || ''}
            onChange={(e) => setNewUser({ ...newUser, contact_phone: e.target.value })}
            className="input input-bordered mr-2"
          />
          <input
            type="text"
            placeholder="Address"
            value={newUser.address || ''}
            onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
            className="input input-bordered mr-2"
          />
          <button className="btn btn-primary" onClick={handleAdd}>
            Add User
          </button>
        </div>

        <table className="table table-xs">
          <thead>
            <tr>
              <th>user_id</th>
              <th>full_name</th>
              <th>email</th>
              <th>contact_phone</th>
              <th>address</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6}>Loading...</td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={6}>Error: {renderErrorMessage(error)}</td>
              </tr>
            ) : (
              usersData &&
              usersData.map((user, index) => (
                <tr key={index}>
                  <th>{user.user_id}</th>
                  <td>{user.full_name}</td>
                  <td>{user.email}</td>
                  <td>{user.contact_phone}</td>
                  <td>{user.address}</td>
                  <td className="flex gap-2">
                    <button type="button" className="btn btn-sm btn-outline btn-info" onClick={() => setEditingUser(user)} title="Edit User">
                      <EditIcon />
                    </button>
                    <button type="button" className="btn btn-sm btn-outline btn-warning" onClick={() => handleDelete(user.user_id)} title="Delete User">
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={6}>{usersData ? `${usersData.length} records` : '0 records'}</td>
            </tr>
          </tfoot>
        </table>

        {editingUser && (
          <div className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Update User</h3>
              <input
                type="text"
                placeholder="Full Name"
                value={editingUser.full_name}
                onChange={(e) => setEditingUser({ ...editingUser, full_name: e.target.value })}
                className="input input-bordered mb-2"
              />
              <input
                type="text"
                placeholder="Email"
                value={editingUser.email}
                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                className="input input-bordered mb-2"
              />
              <input
                type="text"
                placeholder="Phone"
                value={editingUser.contact_phone}
                onChange={(e) => setEditingUser({ ...editingUser, contact_phone: e.target.value })}
                className="input input-bordered mb-2"
              />
              <input
                type="text"
                placeholder="Address"
                value={editingUser.address}
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
