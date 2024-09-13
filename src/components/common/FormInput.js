export const FormInput = ({ label, type = "text", value, onChange }) => (
  <div className="mb-4">
    <label className="block mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="input input-bordered w-full"
    />
  </div>
);
