import IshiharaTest from "./components/IshiharaTest";
import ColorRingTest from "./components/ColorRingTest";

function App() {
  return (
    <div className="App">
      <h1 className="text-center text-xl font-bold">Color Vision Test</h1>
      <IshiharaTest />

      <ColorRingTest />
    </div>
  );
}

export default App;
