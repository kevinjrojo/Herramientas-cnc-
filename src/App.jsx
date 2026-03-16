import ToolModal from "./components/ToolModal";

function App() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 to-blue-100 px-4 py-10">
      <h1 className="mb-8 text-center text-4xl font-bold text-slate-800">
        Inventario de herramientas CNC
      </h1>

      <ToolModal />
    </main>
  );
}

export default App;
