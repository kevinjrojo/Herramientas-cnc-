import { useMemo, useState } from "react";
import { tools } from "./tools";

const allBrands = [
  ...new Set(
    Object.values(tools)
      .flat()
      .map((item) => item.brand),
  ),
].sort();

const allDiameter = [
  ...new Set(
    Object.values(tools)
      .flat()
      .map((item) => item.diameter),
  ),
].sort();

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

  const toolCodes = useMemo(
    () => (toolForm.herramienta ? (tools[toolForm.herramienta] ?? []) : []),
    [toolForm.herramienta],
  );

  const holderCodes = useMemo(
    () => (holderForm.nombrePorta ? (tools[holderForm.nombrePorta] ?? []) : []),
    [holderForm.nombrePorta],
  );

  return (
    <section className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
      <h2 className="mb-6 text-center text-2xl font-bold text-slate-800">
        Registro de herramientas CNC
      </h2>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4 rounded-xl bg-slate-50 p-5">
          <h3 className="text-lg font-semibold text-slate-700">
            Datos de operación
          </h3>

          <FormInput
            label="Fecha"
            type="date"
            value={productionForm.fecha}
            onChange={(value) =>
              setProductionForm((prev) => ({ ...prev, fecha: value }))
            }
          />

          <FormInput
            label="Recurso"
            value={productionForm.recurso}
            onChange={(value) =>
              setProductionForm((prev) => ({ ...prev, recurso: value }))
            }
            placeholder="Ej: 247"
          />

          <FormInput
            label="Cod. plano"
            value={productionForm.codPlano}
            onChange={(value) =>
              setProductionForm((prev) => ({ ...prev, codPlano: value }))
            }
            placeholder="Ej: 524834"
          />

          <FormInput
            label="Armador"
            value={productionForm.armador}
            onChange={(value) =>
              setProductionForm((prev) => ({ ...prev, armador: value }))
            }
            placeholder="Ej: 3027"
          />

          <FormInput
            label="Operación"
            value={productionForm.operacion}
            onChange={(value) =>
              setProductionForm((prev) => ({ ...prev, operacion: value }))
            }
            placeholder="Ej: 02"
          />
        </div>

        <div className="space-y-4 rounded-xl bg-blue-50 p-5">
          <h3 className="text-lg font-semibold text-slate-700">Herramientas</h3>

          <FormSelect
            label="Herramienta"
            value={toolForm.herramienta}
            onChange={(value) =>
              setToolForm({ herramienta: value, codigo: "", fabricante: "" })
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
        </div>

        <div className="space-y-4 rounded-xl bg-emerald-50 p-5 md:col-span-2">
          <h3 className="text-lg font-semibold text-slate-700">
            Porta herramientas
          </h3>

          <div className="grid gap-4 md:grid-cols-3">
            <FormSelect
              label="Nombre porta"
              value={holderForm.nombrePorta}
              onChange={(value) =>
                setHolderForm({
                  nombrePorta: value,
                  codigo: "",
                  marcaFabricante: "",
                })
              }
              placeholder="Seleccionar porta"
              options={Object.keys(tools)}
            />

            <FormSelect
              label="Código"
              value={holderForm.codigo}
              onChange={(value) =>
                setHolderForm((prev) => ({ ...prev, codigo: value }))
              }
              placeholder="Seleccionar código"
              disabled={!holderForm.nombrePorta}
              options={holderCodes.map((tool) => tool.code)}
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
        </div>
      </div>
    </section>
  );
}

function FormInput({ label, value, onChange, type = "text", placeholder }) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />
    </label>
  );
}

function FormSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
  disabled,
}) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-slate-100"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
export default ToolModal;
