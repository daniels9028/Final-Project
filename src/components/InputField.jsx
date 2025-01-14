import React from "react";

const InputField = () => {
  return (
    <div className="flex flex-col justify-center gap-2">
      <label htmlFor="email">Email</label>
      <input
        type="text"
        placeholder="Input your email..."
        className="bg-[#EAF0F7] py-2 px-4 rounded-lg outline-none focus:border-blue-500 border-2 placeholder:italic"
      />
    </div>
  );
};

export default InputField;
