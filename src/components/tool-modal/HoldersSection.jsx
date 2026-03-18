import FormSelect from "./FormSelect";
import ItemList from "./ItemList";

function HoldersSection({
  holderForm,
  setHolderForm,
  toolHolder,
  holderCodes,
  allBrands,
  addHolder,
  editingHolderIndex,
  setEditingHolderIndex,
  initialHolderForm,
  selectedHolders,
  editHolder,
  removeHolder,
}) {
  return (
    <div className="space-y-4 rounded-xl bg-emerald-50 p-5 md:col-span-2">
      <h3 className="text-lg font-semibold text-slate-700">
        Porta herramientas
      </h3>

      <div className="grid gap-4 md:grid-cols-3">
        <FormSelect
          label="Nombre porta"
          value={holderForm.nombrePorta}
          onChange={(value) =>
            setHolderForm((prev) => ({
              ...prev,
              nombrePorta: value,
              codigo: "",
            }))
          }
          placeholder="Seleccionar porta"
          options={Object.keys(toolHolder)}
        />

        <FormSelect
          label="Código"
          value={holderForm.codigo}
          onChange={(value) =>
            setHolderForm((prev) => ({ ...prev, codigo: value }))
          }
          placeholder="Seleccionar código"
          disabled={!holderForm.nombrePorta}
          options={holderCodes.map((holder) => holder.code)}
        />

        <FormSelect
          label="Marca fabricante"
          value={holderForm.marcaFabricante}
          onChange={(value) =>
            setHolderForm((prev) => ({ ...prev, marcaFabricante: value }))
          }
          placeholder="Seleccionar marca"
          options={allBrands}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
          onClick={addHolder}
        >
          {editingHolderIndex !== null
            ? "Guardar cambios"
            : "Agregar porta herramienta"}
        </button>
        {editingHolderIndex !== null && (
          <button
            type="button"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            onClick={() => {
              setEditingHolderIndex(null);
              setHolderForm(initialHolderForm);
            }}
          >
            Cancelar edición
          </button>
        )}
      </div>

      <ItemList
        title="Porta herramientas cargados"
        emptyMessage="Todavía no agregaste porta herramientas."
        items={selectedHolders}
        onEdit={editHolder}
        onDelete={removeHolder}
        renderItem={(holder) =>
          `${holder.nombrePorta} | ${holder.codigo} | ${holder.marcaFabricante || "Sin marca"}`
        }
      />
    </div>
  );
}

export default HoldersSection;
