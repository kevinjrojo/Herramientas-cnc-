import FormSelect from "./FormSelect";
import ItemList from "./ItemList";

function ToolsSection({
  toolForm,
  setToolForm,
  tools,
  toolCodes,
  allDiameter,
  allBrands,
  addTool,
  editingToolIndex,
  setEditingToolIndex,
  initialToolForm,
  selectedTools,
  editTool,
  removeTool,
}) {
  return (
    <div className="space-y-4 rounded-xl bg-blue-50 p-5">
      <h3 className="text-lg font-semibold text-slate-700">Herramientas</h3>

      <FormSelect
        label="Herramienta"
        value={toolForm.herramienta}
        onChange={(value) =>
          setToolForm((prev) => ({
            ...prev,
            herramienta: value,
            codigo: "",
          }))
        }
        placeholder="Seleccionar herramienta"
        options={Object.keys(tools)}
      />

      <FormSelect
        label="Código"
        value={toolForm.codigo}
        onChange={(value) =>
          setToolForm((prev) => ({ ...prev, codigo: value }))
        }
        placeholder="Seleccionar código"
        disabled={!toolForm.herramienta}
        options={toolCodes.map((tool) => tool.code)}
      />

      <FormSelect
        label="Detalle"
        value={toolForm.detalle}
        onChange={(value) =>
          setToolForm((prev) => ({ ...prev, detalle: value }))
        }
        placeholder="Seleccionar detalle"
        options={allDiameter}
      />

      <FormSelect
        label="Fabricante"
        value={toolForm.fabricante}
        onChange={(value) =>
          setToolForm((prev) => ({ ...prev, fabricante: value }))
        }
        placeholder="Seleccionar fabricante"
        options={allBrands}
      />

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          onClick={addTool}
        >
          {editingToolIndex !== null
            ? "Guardar cambios"
            : "Agregar herramienta"}
        </button>
        {editingToolIndex !== null && (
          <button
            type="button"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            onClick={() => {
              setEditingToolIndex(null);
              setToolForm(initialToolForm);
            }}
          >
            Cancelar edición
          </button>
        )}
      </div>

      <ItemList
        title="Herramientas cargadas"
        emptyMessage="Todavía no agregaste herramientas."
        items={selectedTools}
        onEdit={editTool}
        onDelete={removeTool}
        renderItem={(tool) =>
          `${tool.herramienta} | ${tool.codigo} | ${tool.detalle || "Sin detalle"} | ${tool.fabricante || "Sin fabricante"}`
        }
      />
    </div>
  );
}

export default ToolsSection;
