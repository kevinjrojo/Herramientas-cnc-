import { useState } from "react";
import { tools } from "./tools";

function ToolModal() {
  const [toolType, setToolType] = useState("");
  const [toolCode, setToolCode] = useState("");

  const toolCodes = toolType ? tools[toolType] : [];

  const selectedTool = toolCodes.find((tool) => tool.code === toolCode);

  return (
    <div className="p-4 border rounded w-80">
      <h2>Agregar herramienta</h2>

      {/* Tipo herramienta */}
      <select
        value={toolType}
        onChange={(e) => {
          setToolType(e.target.value);
          setToolCode("");
        }}
      >
        <option value="">Seleccionar tipo</option>

        {Object.keys(tools).map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      {/* Código herramienta */}
      <select
        value={toolCode}
        onChange={(e) => setToolCode(e.target.value)}
        disabled={!toolType}
      >
        <option value="">Seleccionar código</option>

        {toolCodes.map((tool) => (
          <option key={tool.code} value={tool.code}>
            {tool.code}
          </option>
        ))}
      </select>

      {/* Información automática */}
      {selectedTool && (
        <div style={{ marginTop: "10px" }}>
          <p>
            <strong>Marca:</strong> {selectedTool.brand}
          </p>

          {selectedTool.diameter && (
            <p>
              <strong>Diámetro:</strong> {selectedTool.diameter} mm
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default ToolModal;
