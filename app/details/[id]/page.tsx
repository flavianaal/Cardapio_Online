"use client";

import { ArrowLeft, Check, Heart, Send, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Item, Pizza } from "@/app/lib/types";
import { getPizzaDetails } from "@/app/lib/api_service";
import { apiClient } from "@/app/lib/api_client";

async function sendOrderToWhatsapp(
  pizza: Pizza | null,
  selectedSize: Item | null,
) {
  if (selectedSize === null) {
    alert("Selecione o tamanho desejado, por favor!");
    return;
  }

  const message = `\nOlá! Gostaria de fazer um pedido:\n\n

🍕 *Pizza:* ${pizza?.nome}\n
📏 *Tamanho:* ${selectedSize.tamanho}\n
💰 *Valor:* R$ ${selectedSize.valor.toFixed(2)}\n

Pode me confirmar o pedido?\n\n

Obrigado(a)!`;

  const url = `https://api.whatsapp.com/send?phone=5588981539220&text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}

// Componente que contém a lógica e todo o conteúdo da página.
// O useParams() fica dentro deste componente.
function DetailsContent() {
  // Obtém o ID diretamente dos parâmetros da rota.
  const params = useParams<{ id: string }>();

  const [pizza, setPizza] = useState<Pizza | null>(null);

  // Guarda o tamanho selecionado pelo usuário.
  const [selectedSize, setSelectedSize] = useState<Item | null>(null);

  useEffect(() => {
    async function getPizza() {
      if (params.id) {
        const pizzaResponse = await getPizzaDetails(params.id);

        console.log("Pizza recebida da API:", pizzaResponse);

        setPizza(pizzaResponse);
      }
    }

    getPizza();
  }, [params.id]);

  // Aguarda a resposta da API antes de acessar os dados da pizza.
  if (!pizza) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Carregando detalhes da pizza...
      </div>
    );
  }

  // O return principal da página continua abaixo.

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white to-stone-50">
      <div className="flex flex-col">
        <header className="flex justify-between items-center p-4 text-slate-700">
          <Link href="/">
            <ArrowLeft className="size-8" />
          </Link>

          <Heart className="size-8" />
        </header>

        <main className="py-3 px-4">
          <div
            className="flex flex-col items-center lg:flex-row lg:max-w-6xl
          lg:mx-auto lg:gap-12"
          >
            <div className="lg:w-1/3">
              <img
                src={`${apiClient.imageHost}/${pizza?.caminhoImagem.split("/").pop()}`}
                alt="Pizza de pepperoni dourada"
                width={300}
                height={300}
                className="w-full max-w-60 mx-auto"
                loading="eager"
              />
            </div>

            <div className="mt-4 lg:w-2/3 lg:mt-0">
              <h2 className="text-2xl font-bold">{pizza?.nome}</h2>
              <p className="text-justify text-gray-500 my-4 lg:text-left">
                {pizza?.descricao}
              </p>

              <h2 className="text-xl font-semibold mb-2">
                Selecione o tamanho
              </h2>

              {/* Size Options */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {pizza?.itens.map((size) => {
                  return (
                    <label
                      key={size.id}
                      className={`flex flex-col bg-white shadow-md items-center p-4 
                        border rounded-mb text-gray-500 relative cursor-pointer
                          ${
                            selectedSize?.id === size.id
                              ? "border-amber-400 shadow-amber-200"
                              : "border-gray-100 hover:border-amber-500 hover:shadow-amber-200"
                          }
                        `}
                    >
                      <input
                        type="radio"
                        name="pizzaSize"
                        className="hidden"
                        value={size.id}
                        checked={selectedSize?.id === size.id}
                        onChange={() => setSelectedSize(size)}
                      />

                      <Users className="size-6 mb-1" />
                      <p className="font-medium">{size.tamanho}</p>
                      <p className="text-sm">R$ {size.valor.toFixed(2)}</p>

                      {selectedSize?.id === size.id && (
                        <div className="bg-amber-400 text-white p-1 rounded-full flex justify-center items-center font-bold absolute top-1 right-1">
                          <Check className="size-4" />
                        </div>
                      )}
                    </label>
                  );
                })}
              </div>

              <h2 className="text-xl font-semibold mb-2">Ingredientes</h2>

              {/* Ingredients List */}
              <div className="grid grid-cols-4 gap-2">
                {pizza?.ingredientes?.map((ingredient) => (
                  <div
                    key={ingredient.id}
                    className="bg-white shadow flex gap-0.5 rounded-full p-1 items-center border border-gray-100 text-gray-500"
                  >
                    <Image
                      src={`${apiClient.imageHost}/${ingredient?.caminhoImagem.split("/").pop()}`}
                      alt={ingredient.nome}
                      width={20}
                      height={20}
                      className="rounded-full size-6"
                    />

                    <p className="text-xs text-center font-medium leading-3">
                      {ingredient.nome}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        <footer className="flex py-3 px-4 mt-10 bg-gray-100 lg:px-20">
          <div className="hidden lg:block lg:w-1/3"></div>

          <div
            className="flex flex-1 justify-between items-center
          lg:w-2/3 lg:max-w-4xl "
          >
            <div className="flex flex-col text-gray-500">
              <span className="text-sm">Total do Pedido</span>
              <span className="text-2xl font-bold text-gray-900">
                R${" "}
                {selectedSize?.valor.toFixed(2) ??
                  pizza.itens[0].valor.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => sendOrderToWhatsapp(pizza, selectedSize)}
              className="bg-green-500 text-white flex
            items-center
            justify-center rounded-full p-4 shadow-md
            cursor-pointer hover:scale-105 hover:shadow-lg
            hover:bg-green-400 transition-all"
            >
              <Send className="size-6" />
              <span className="hidden lg:block lg:ml-2 lg:font-bold">
                Fazer Pedido
              </span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

// Componente principal da rota.
// Ele envolve DetailsContent com Suspense, que permite ao Next.js
// aguardar os parâmetros da URL utilizados pelo useParams().
export default function DetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Carregando detalhes da pizza...
        </div>
      }
    >
      <DetailsContent />
    </Suspense>
  );
}
