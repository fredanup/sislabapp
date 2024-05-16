import FormTitle from 'pages/utilities/form-title';
import Layout from 'pages/utilities/layout';
import { useState } from 'react';
import { IProductDetail } from 'utils/auth';
import { trpc } from 'utils/trpc';

export default function MovementsModal({
  isOpen,
  onClose,
  selectedProduct,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct: IProductDetail | null;
}) {
  const [search, setSearch] = useState('');
  const utils = trpc.useContext();
  /**
   * Consultas a base de datos
   */
  //Obtener todos los usuarios creados con su sucursal
  const { data: examples, isLoading } = trpc.example.findManyProduct.useQuery();

  //Estilizado del fondo detrás del modal. Evita al usuario salirse del modal antes de elegir alguna opción
  const overlayClassName = isOpen
    ? 'fixed top-0 left-0 w-full h-full rounded-lg bg-gray-800 opacity-60 z-20'
    : 'hidden';

  if (!isOpen) {
    return null; // No renderizar el modal si no está abierto
  }

  const filteredExamples = examples?.filter((example) => {
    return example.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      {isOpen && (
        <>
          {/* Fondo borroso y no interactivo */}
          <div className={overlayClassName}></div>
          <form className="absolute top-1/2 left-1/2 z-30 w-11/12 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 rounded-lg bg-white p-6 drop-shadow-lg">
            {/**Header y botón de cierre */}
            <FormTitle text="Movimientos" />
            <div className="items-center flex md:flex-row flex-col gap-4">
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
                  required
                />
              </div>

              <div className="flex flex-row gap-2 justify-center md:ml-auto">
                <div className="rounded-lg border border-gray-200 px-2 flex flex-col items-center md:flex md:flex-row md:gap-1">
                  <svg
                    viewBox="0 0 640 512"
                    className={`h-8 w-8 cursor-pointer fill-gray-500 p-1.5  `}
                  >
                    <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                  </svg>
                  <p className="text-gray-500 text-sm cursor-pointer">Ventas</p>
                </div>
                <div className="rounded-lg border border-gray-200 px-2 flex flex-col items-center md:flex md:flex-row md:gap-1">
                  <svg
                    viewBox="0 0 384 512"
                    className={`h-8 w-8 cursor-pointer fill-gray-500 p-1.5  `}
                  >
                    <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                  </svg>
                  <p className="text-gray-500 text-sm cursor-pointer">
                    Ingreso
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 px-2 flex flex-col items-center md:flex md:flex-row md:gap-1">
                  <svg
                    viewBox="0 0 384 512"
                    className={`h-8 w-8 cursor-pointer fill-gray-500 p-1.5  `}
                  >
                    <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                  </svg>
                  <p className="text-gray-500 text-sm cursor-pointer">Salida</p>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="border-b border-gray-200 text-left text-black text-sm font-light">
                  <tr>
                    <th className="py-4 pr-2">Código</th>
                    <th className="py-4 pr-2">Producto</th>
                    <th className="py-4 pr-2">Laboratorio</th>
                    <th className="py-4 pr-2">Presentación</th>
                    <th className="py-4 pr-2">Cantidad</th>
                    <th className="py-4 pr-2">Precio</th>
                    <th className="py-4 pr-2">Destino</th>
                    <th className="py-4 pr-2">Tipo</th>
                    <th className="py-4 pr-2">Estado</th>
                    <th className="py-4 pr-2">Fecha de movimiento</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExamples?.map((examples, index) => (
                    <>
                      <tr
                        className="border-b border-gray-200 text-sm font-light"
                        key={index}
                      >
                        <td className="py-4 pr-2">####</td>
                        <td className="py-4 pr-2">####</td>
                        <td className="py-4 pr-2">####</td>
                        <td className="py-4 pr-2">####</td>
                        <td className="py-4 pr-2">####</td>
                        <td className="py-4 pr-2">####</td>
                        <td className="py-4 pr-2">####</td>
                        <td className="py-4 pr-2">####</td>
                        <td className="py-4 pr-2">####</td>
                        <td className="py-4 pr-2">####</td>
                        <td className="py-4 pr-2">####</td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </form>
        </>
      )}
    </>
  );
}
