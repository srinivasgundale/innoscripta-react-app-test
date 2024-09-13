export const FormInput = ({ label, value, onChange, type = "text", options = [] }) => (
    <div className="mb-4">
      <label className="block mb-1">{label}</label>
      {type === "select" ? (
        <select className="select select-bordered w-full" value={value} onChange={onChange}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input type={type} value={value} onChange={onChange} className="input input-bordered w-full" />
      )}
    </div>
  );
  
 
  