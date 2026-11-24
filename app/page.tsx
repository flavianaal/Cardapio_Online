import { ShoppingCart, House, Plus } from "lucide-react";
import Link from "next/link";
import { getPizzas } from "./lib/api_service";
import { apiClient } from "./lib/api_client";

export const instant = false;

export default async function HomePage() {
  const pizzas = await getPizzas();

  console.log("Pizzas recebidas da API:", pizzas);

  return (
    <div className="font-display bg-gradient-to-br from-white to-stone-50 min-h-screen">
      {/* Main Row*/}
      <div className="flex relative lg:flex-col">
        {/*Nav Menu*/}
        <nav
          className="w-14 h-screen bg-gradient-to-br
         from-amber-500 to-amber-600 
         rounded-r-2xl shadow flex flex-col 
         items-center py-4 gap-4 fixed 
         lg:static lg:w-full lg:h-14 lg:flex-row lg:py-0 lg:px-6 lg:rounded-b-2xl lg:rounded-r-none 
         lg:bg-gradient-to-br  lg:from-amber-500 lg:to-amber-600 "
        >
          <ShoppingCart className="size-8 lg:size-6" />

          <div
            className="flex flex-col flex-1 
          justify-around items-center py-28
           text-gray-200 lg:flex-row lg:py-0"
          >
            <a
              href="#"
              className="transform -rotate-90 
            font-bold whitespace-nowrap lg:transform-none lg:-rotate-0"
            >
              Bebidas
            </a>
          </div>
          <div
            className="flex flex-col flex-1 
            justify-around items-center py-28 text-gray-200"
          >
            <a
              href="#"
              className="transform -rotate-90 
            font-bold whitespace-nowrap text-white lg:transform-none lg:-rotate-0"
            >
              Pizzas
            </a>
          </div>
          <div className="flex flex-col flex-1 justify-around items-center py-28 text-gray-200">
            <a
              href="#"
              className="transform -rotate-90 
            font-bold whitespace-nowrap lg:transform-none lg:-rotate-0"
            >
              Sobremesas
            </a>
          </div>
          <House className="size-8 lg:size-6" />
        </nav>

        {/* Main Content*/}
        <main className="px-2 py-4 pl-16 flex-1 lg:pl-6">
          <h1 className="text-xl text-gray-500 mb-2">Descubra os sabores</h1>
          <h2 className="text-2xl text-gray-800 font-semibold mb-6">
            Favoritos da semana
          </h2>

          {/* Grid de Pizzas*/}
          <div
            className="grid grid-cols-2 gap-2 
          justify-items-center text-gray-800
          sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
          >
            {/* Item Pizza*/}
            {pizzas.map((pizza) => (
              <Link key={pizza.id} href={`/details/${pizza.id}`}>
                <div className="w-32 h-58 relative flex flex-col items-center justify-center pt-14 pb-4 cursor-pointer group sm:w-44 'sm:h-[300px]' sm:pt-22 md:w-36 md:h-64 md:pt-16 lg:w-48 lg:h-80 lg:pt-24">
                  <img
                    src={`${apiClient.imageHost}/${pizza.caminhoImagem.split("/").pop()}`}
                    alt={pizza.nome}
                    width={200}
                    height={200}
                    className="absolute top-0 max-w-32 group-hover:scale-105 group-hover:rotate-180 transition-all duration-500 ease-in-out sm:max-w-44 md:max-w-36 lg:max-w-48"
                  />

                  <div className="bg-gray-200 w-full h-full rounded-b-full flex flex-col text-center overflow-hidden pb-7 pt-18 px-3 group-hover:bg-amber-400 transition-all duration-500 ease-in-out sm:pt-24 md:pt-20">
                    <h4 className="text-sm font-semibold sm:text-base lg:text-lg">
                      {pizza.nome}
                    </h4>
                    <span className="text-sm font-bold text-gray-500 mt-1 sm:text-base">
                      R$ {pizza.itens[0].valor.toFixed(2)}
                    </span>
                  </div>

                  <div className="bg-slate-900 text-white p-2 rounded-full absolute bottom-0 group-hover:bg-slate-700 transition-colors">
                    <Plus className="size-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
