import { useState } from "react";

function Form(){
  const [value, setValue] = useState<String>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <input onChange={handleChange} />
      <p>入力値：{value}</p>
    </div>

  )
}

export default Form
