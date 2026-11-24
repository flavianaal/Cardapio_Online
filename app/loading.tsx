export default function Loading() {
  return (
    <div className="flex min-h-screen justify-center items-center flex-col">
      <div
        className="w-16 h-16 border-4 border-amber-500 border-t-transparent
rounded-full animate-spin"
      ></div>
      <p className="text-lg font-semibold mt-2 text-gray-700">
        Aguarde, Carregando ......
      </p>
    </div>
  );
}
