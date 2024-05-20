import FormTitle from 'pages/utilities/form-title';
import { useState } from 'react';
import { trpc } from 'utils/trpc';

export default function CreateIncomeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [search, setSearch] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  /**
   * Consultas a base de datos
   */
  //Obtener todos los usuarios creados con su sucursal
  const { data: products, isLoading } = trpc.product.findManyProduct.useQuery();
  if (!isOpen) {
    return null; // No renderizar el modal si no está abierto
  }
  const filteredProducts = products?.filter((product) => {
    return product.name.toLowerCase().includes(search.toLowerCase());
  });
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedProductId(event.target.value);
  };

  return (
    <>
      <form className="absolute top-1/2 left-1/2 z-30 w-11/12 md:w-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 rounded-lg bg-white p-6 drop-shadow-lg">
        {/**Header y botón de cierre */}
        <FormTitle text="Nuevo ejemplar" />
        <p className="text-sm font-light">
          Seleccione el producto corresponde el ejemplar que va a agregar
        </p>
        <div className="mt-4 items-center flex md:flex-row flex-col gap-4">
          <div className="flex flex-row gap-2 w-full">
            <svg
              viewBox="0 0 512 512"
              className={`h-8 w-8 cursor-pointer fill-gray-500 p-1.5  `}
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
            <input
              type="text"
              placeholder="Ingrese producto a buscar..."
              className="focus:shadow-outline w-full appearance-none rounded-lg border px-2 py-1 leading-tight text-gray-700 focus:outline-none"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              required
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="border-b border-gray-200 text-left text-black text-sm font-light">
              <tr>
                <th className="py-4 pr-2">Seleccionar</th>
                <th className="py-4 pr-2">Producto</th>
                <th className="py-4 pr-2">Laboratorio</th>
                <th className="py-4 pr-2">Presentación</th>
                <th className="py-4 pr-2">Cantidad</th>
                <th className="py-4 pr-2">Precio</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts?.map((product, index) => (
                <>
                  <tr
                    className="border-b border-gray-200 text-sm font-light"
                    key={index}
                  >
                    <td className="py-4 pr-2">
                      <input
                        type="radio"
                        name="selectedProduct"
                        value={product.id}
                        checked={selectedProductId === product.id}
                        onChange={handleRadioChange}
                      />
                    </td>
                    <td className="py-4 pr-2">{product.name}</td>
                    <td className="py-4 pr-2">{product.Laboratory?.name}</td>
                    <td className="py-4 pr-2">
                      {product.Presentation?.presentation}
                    </td>
                    <td className="py-4 pr-2">{product.quantity}</td>
                    <td className="py-4 pr-2">{product.price}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 pt-4 flex flex-row justify-end gap-2 border-t border-gray-200">
          <button
            type="button"
            className="rounded-lg border bg-gray-500 px-4 py-1 text-base font-medium text-white"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-lg border bg-sky-500 px-4 py-1 text-base font-medium text-white"
          >
            Guardar
          </button>
        </div>
      </form>
    </>
  );
}
