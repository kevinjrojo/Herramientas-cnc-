function ItemList({
  title,
  emptyMessage,
  items,
  onEdit,
  onDelete,
  renderItem,
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <h4 className="mb-2 text-sm font-semibold text-slate-700">{title}</h4>
      {!items.length && (
        <p className="text-sm text-slate-500">{emptyMessage}</p>
      )}

      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={`${renderItem(item)}-${index}`}
            className="flex flex-col gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 md:flex-row md:items-center md:justify-between"
          >
            <span>
              <strong>{index + 1}.</strong> {renderItem(item)}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-md bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700 hover:bg-amber-200"
                onClick={() => onEdit(index)}
              >
                Editar
              </button>
              <button
                type="button"
                className="rounded-md bg-rose-100 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-200"
                onClick={() => onDelete(index)}
              >
                Borrar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
