import { useState } from "react";
import { tools } from "./tools";

function NewSetup() {
  const [form, setForm] = useState({
    operator: "",
    orderNumber: "",
    partCode: "",
  });
  const [toolsUsed, setToolsUsed] = useState([
    { name: "", code: "", detail: "" },
  ]);

  const [searchTool, setSearchTool] = useState("");

  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(searchTool.toLowerCase()),
  );

  const handleToolChange = (index, field, value) => {
    const updatedTools = [...toolsUsed];

    updatedTools[index][field] = value;

    setToolsUsed(updatedTools);
  };

  const addTool = () => {
    setToolsUsed([...toolsUsed, { name: "", code: "", detail: "" }]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };
  return (
    <div>
      <h2>Nueva Preparación CNC</h2>

      <form>
        <div>
          <label>Nombre del operador</label>
          <input
            type="text"
            name="operator"
            value={form.operator}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>N° de orden</label>
          <input
            type="number"
            name="orderNumber"
            value={form.orderNumber}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Código de pieza</label>
          <input
            type="text"
            name="partCode"
            value={form.partCode}
            onChange={handleChange}
          />
        </div>
      </form>
      <h3>Herramientas utilizadas</h3>
      {toolsUsed.map((tool, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Nombre herramienta"
            value={tool.name}
            onChange={(e) => {
              handleToolChange(index, "name", e.target.value);
              setSearchTool(e.target.value);
            }}
          />

          {searchTool && (
            <div>
              {filteredTools.map((toolOption, i) => (
                <div
                  key={i}
                  onClick={() => {
                    handleToolChange(index, "name", toolOption.name);
                    handleToolChange(index, "code", toolOption.code);
                    handleToolChange(index, "detail", toolOption.detail);

                    setSearchTool("");
                  }}
                >
                  {toolOption.name} - {toolOption.code}
                </div>
              ))}
            </div>
          )}

          <input
            type="text"
            placeholder="Código"
            value={tool.code}
            onChange={(e) => handleToolChange(index, "code", e.target.value)}
          />

          <input
            type="text"
            placeholder="Detalle"
            value={tool.detail}
            onChange={(e) => handleToolChange(index, "detail", e.target.value)}
          />
        </div>
      ))}
      <button type="button" onClick={addTool}>
        + Agregar herramienta
      </button>
      <pre>{JSON.stringify(toolsUsed, null, 2)}</pre>
    </div>
  );
}

export default NewSetup;
