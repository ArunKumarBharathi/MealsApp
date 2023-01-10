import "./Input.css";

export const Input = (props) => {
  const { label, name, type, placeholder, handleChange, error, value } = props;
  return (
    <>
      <div className="form-control">
        <label>{label}</label>
        <input
          type={type}
          name={name}
          id=""
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required
        />
      </div>
      {error && <p className="error-txt">{error}</p>}
      <hr />
    </>
  );
};
