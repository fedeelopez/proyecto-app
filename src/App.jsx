import Navbar from "./components/Navbar";
import ItemListContainer from "./components/ItemListContainer";
function App() {
  return (
    <div>
      <Navbar />
      <ItemListContainer saludo="Bienvenidos a Termo Tienda" />
    </div>
  );
}

export default App;
