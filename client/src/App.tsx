import AddProduct from "./AddProduct";
import "./App.css";

function App() {
  return (
    <div
      style={{
        height: "100vh",
        gap: 10,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        display: 'flex',
      }}
    >
      <AddProduct />
    </div>
  );
}

export default App;
