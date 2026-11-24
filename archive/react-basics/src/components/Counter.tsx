import { useState } from "react";

function Counter(){
const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>カウント：{count}</p>
      <button onClick={() => setCount(count+1)}>+1</button>
    </div>
  )
};


export default Counter;

