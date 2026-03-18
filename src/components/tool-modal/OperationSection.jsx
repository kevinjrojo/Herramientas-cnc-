import FormInput from "./FormInput";

function OperationSection({ productionForm, setProductionForm }) {
  return (
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
  );
}

export default OperationSection;
