

const UserProfile = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold">Profile</h2>
      <form className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-700">Full Name</label>
          <input type="text" className="w-full px-3 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input type="email" className="w-full px-3 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contact Phone</label>
          <input type="text" className="w-full px-3 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input type="text" className="w-full px-3 py-2 border rounded-md" />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Save</button>
      </form>
    </div>
  );
};

export default UserProfile;
