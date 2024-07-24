import { Link } from "react-router-dom";
import { useState } from "react";
import { useRegisterMutation } from "../../src/apiservices/authApi";

const SignInForm = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    contact_phone: "",
    confirm_contact_phone: "",
    email: "",
    password: "",
    confirm_password: "",
    gender: "",
    address: ""
  });

  const [registerUser, { isLoading, isSuccess, isError }] = useRegisterMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.contact_phone !== formData.confirm_contact_phone) {
      console.error("Phone numbers do not match");
      return;
    }
    if (formData.password !== formData.confirm_password) {
      console.error("Passwords do not match");
      return;
    }
    try {
      await registerUser(formData).unwrap();
      console.log("User registered successfully");
      // Redirect or show success message here
    } catch (err) {
      console.error("Failed to register user: ", err);
    }
  };

  return (
    <div className="flex justify-center gap-20">
      <div className="min-h-screen flex items-center justify-center">
        <div className="card w-96 bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">User Registration</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <input type="text" name="full_name" placeholder="Full Name" className="input input-bordered" value={formData.full_name} onChange={handleChange} />
              </div>
              <div className="form-control">
                <input type="text" name="username" placeholder="Username" className="input input-bordered" value={formData.username} onChange={handleChange} />
              </div>
              <div className="form-control">
                <input type="text" name="contact_phone" placeholder="Contact Phone" className="input input-bordered" value={formData.contact_phone} onChange={handleChange} />
              </div>
              <div className="form-control">
                <input type="email" name="email" placeholder="Email" className="input input-bordered" value={formData.email} onChange={handleChange} />
              </div>
              <div className="form-control">
                <input type="password" name="password" placeholder="Password" className="input input-bordered" value={formData.password} onChange={handleChange} />
              </div>
              <div className="form-control">
                <label className="label">Gender</label>
                <div className="flex space-x-4">
                  <label className="label cursor-pointer">
                    <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} className="radio" />
                    <span className="label-text">Male</span>
                  </label>
                  <label className="label cursor-pointer">
                    <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} className="radio" />
                    <span className="label-text">Female</span>
                  </label>
                  <label className="label cursor-pointer">
                    <input type="radio" name="gender" value="Prefer not to say" checked={formData.gender === "Prefer not to say"} onChange={handleChange} className="radio" />
                    <span className="label-text">Prefer not to say</span>
                  </label>
                </div>
              </div>
              <div className="form-control">
                <input type="text" name="address" placeholder="Address" className="input input-bordered" value={formData.address} onChange={handleChange} />
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  Register
                </button>
                {isError && <p className="text-red-500 mt-2">Failed to register</p>}
                {isSuccess && <p className="text-green-500 mt-2">User registered successfully!</p>}
              </div>
            </form>
            <div className="form-control mt-6">
              <Link to="/login" className="btn btn-secondary">Go to Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
