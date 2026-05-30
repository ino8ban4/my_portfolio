import Button from "./components/Button";
import Card from "./components/Card"; 
import Counter from "./components/Counter"; 
import Form from "./components/InputForm"


function App() {
  return (
    <div>
      <Button label="クリック" onClick={() => console.log("clicked!")} />
      <Card title="タイトル" description="説明文" />
      <Card title="説明無し" />
      <Counter />
      <Form />
    </div>
  );
}

export default App;
