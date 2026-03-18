import { useMemo, useState } from "react";
import { toolHolder, tools } from "./tools";
import HoldersSection from "./tool-modal/HoldersSection";
import OperationSection from "./tool-modal/OperationSection";
import ToolsSection from "./tool-modal/ToolsSection";

const allBrands = [
  ...new Set(
    [...Object.values(tools).flat(), ...Object.values(toolHolder).flat()].map(
      (item) => item.brand ?? item.marca,
    ),
  ),
]
  .filter(Boolean)
  .sort();

const allDiameter = [
  ...new Set(
    [...Object.values(tools).flat(), ...Object.values(toolHolder).flat()].map(
      (item) => item.diameter ?? item.medida ?? item.nombre,
    ),
  ),
]
  .filter(Boolean)
  .sort();

const initialProductionForm = {
  fecha: "",
  recurso: "",
  codPlano: "",
  armador: "",
  operacion: "",
};

const initialToolForm = {
  herramienta: "",
  codigo: "",
  fabricante: "",
  detalle: "",
};

const initialHolderForm = {
  nombrePorta: "",
  codigo: "",
  marcaFabricante: "",
};

function ToolModal() {
  const [productionForm, setProductionForm] = useState(initialProductionForm);
  const [toolForm, setToolForm] = useState(initialToolForm);
  const [holderForm, setHolderForm] = useState(initialHolderForm);
  const [selectedTools, setSelectedTools] = useState([]);
  const [selectedHolders, setSelectedHolders] = useState([]);
  const [editingToolIndex, setEditingToolIndex] = useState(null);
  const [editingHolderIndex, setEditingHolderIndex] = useState(null);

  const toolCodes = useMemo(
    () => (toolForm.herramienta ? (tools[toolForm.herramienta] ?? []) : []),
    [toolForm.herramienta],
  );

  const holderCodes = useMemo(
    () =>
      holderForm.nombrePorta ? (toolHolder[holderForm.nombrePorta] ?? []) : [],
    [holderForm.nombrePorta],
  );

  const addTool = () => {
    if (!toolForm.herramienta || !toolForm.codigo) {
      return;
    }

    if (editingToolIndex !== null) {
      setSelectedTools((prev) =>
        prev.map((item, index) =>
          index === editingToolIndex ? { ...toolForm } : item,
        ),
      );
      setEditingToolIndex(null);
    } else {
      setSelectedTools((prev) => [...prev, { ...toolForm }]);
    }

    setToolForm(initialToolForm);
  };

  const addHolder = () => {
    if (!holderForm.nombrePorta || !holderForm.codigo) {
      return;
    }

    if (editingHolderIndex !== null) {
      setSelectedHolders((prev) =>
        prev.map((item, index) =>
          index === editingHolderIndex ? { ...holderForm } : item,
        ),
      );
      setEditingHolderIndex(null);
    } else {
      setSelectedHolders((prev) => [...prev, { ...holderForm }]);
    }

    setHolderForm(initialHolderForm);
  };

  const removeTool = (indexToRemove) => {
    setSelectedTools((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
    if (editingToolIndex === indexToRemove) {
      setEditingToolIndex(null);
      setToolForm(initialToolForm);
    }
  };

  const removeHolder = (indexToRemove) => {
    setSelectedHolders((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
    if (editingHolderIndex === indexToRemove) {
      setEditingHolderIndex(null);
      setHolderForm(initialHolderForm);
    }
  };

  const editTool = (index) => {
    setToolForm(selectedTools[index]);
    setEditingToolIndex(index);
  };

  const editHolder = (index) => {
    setHolderForm(selectedHolders[index]);
    setEditingHolderIndex(index);
  };

  const downloadWord = () => {
    if (!selectedTools.length && !selectedHolders.length) {
      return;
    }

    const toolRows = selectedTools
      .map(
        (tool, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${tool.herramienta}</td>
            <td>${tool.codigo}</td>
            <td>${tool.detalle || "-"}</td>
            <td>${tool.fabricante || "-"}</td>
          </tr>`,
      )
      .join("");

    const holderRows = selectedHolders
      .map(
        (holder, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${holder.nombrePorta}</td>
            <td>${holder.codigo}</td>
            <td>${holder.marcaFabricante || "-"}</td>
          </tr>`,
      )
      .join("");

    const content = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
        <head>
          <meta charset="utf-8">
          <title>Registro CNC</title>
          <style>
            body { font-family: Arial, sans-serif; }
            h1, h2 { color: #1e293b; }
            table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
            th, td { border: 1px solid #cbd5e1; padding: 8px; text-align: left; }
            th { background: #e2e8f0; }
          </style>
        </head>
        <body>
          <h1>Preparación de torno CNC</h1>
          <h2>Datos y herramientas a utilizar</h2>
          <p><strong>Fecha:</strong> ${productionForm.fecha || "-"}</p>
          <p><strong>Recurso:</strong> ${productionForm.recurso || "-"}</p>
          <p><strong>Código plano:</strong> ${productionForm.codPlano || "-"}</p>
          <p><strong>Armador:</strong> ${productionForm.armador || "-"}</p>
          <p><strong>Operación:</strong> ${productionForm.operacion || "-"}</p>

          <h2>Herramientas (${selectedTools.length})</h2>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Herramienta</th>
                <th>Código</th>
                <th>Detalle</th>
                <th>Fabricante</th>
              </tr>
            </thead>
            <tbody>
              ${toolRows || '<tr><td colspan="5">Sin herramientas cargadas</td></tr>'}
            </tbody>
          </table>

          <h2>Porta herramientas (${selectedHolders.length})</h2>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre porta</th>
                <th>Código</th>
                <th>Marca fabricante</th>
              </tr>
            </thead>
            <tbody>
              ${holderRows || '<tr><td colspan="4">Sin porta herramientas cargados</td></tr>'}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const blob = new Blob([content], {
      type: "application/msword;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `registro-cnc-${productionForm.fecha || "sin-fecha"}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  return (
    <section className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
      <h2 className="mb-6 text-center text-2xl font-bold text-slate-800">
        Preparación de torno CNC
      </h2>

      <div className="grid gap-8 md:grid-cols-2">
        <OperationSection
          productionForm={productionForm}
          setProductionForm={setProductionForm}
        />

        <ToolsSection
          toolForm={toolForm}
          setToolForm={setToolForm}
          tools={tools}
          toolCodes={toolCodes}
          allDiameter={allDiameter}
          allBrands={allBrands}
          addTool={addTool}
          editingToolIndex={editingToolIndex}
          setEditingToolIndex={setEditingToolIndex}
          initialToolForm={initialToolForm}
          selectedTools={selectedTools}
          editTool={editTool}
          removeTool={removeTool}
        />

        <HoldersSection
          holderForm={holderForm}
          setHolderForm={setHolderForm}
          toolHolder={toolHolder}
          holderCodes={holderCodes}
          allBrands={allBrands}
          addHolder={addHolder}
          editingHolderIndex={editingHolderIndex}
          setEditingHolderIndex={setEditingHolderIndex}
          initialHolderForm={initialHolderForm}
          selectedHolders={selectedHolders}
          editHolder={editHolder}
          removeHolder={removeHolder}
        />
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          className="rounded-lg bg-slate-800 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-900 disabled:cursor-not-allowed disabled:bg-slate-400"
          onClick={downloadWord}
          disabled={!selectedTools.length && !selectedHolders.length}
        >
          Descargar Word de todo el registro
        </button>
      </div>
    </section>
  );
}

export default ToolModal;
