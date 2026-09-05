export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center flex-1 min-h-0 w-full gap-8 bg-gray-50 px-2 py-6">
      <div className="text-center px-2">
        <h1 className="text-lg md:text-2xl font-bold text-gray-900">
          Encontre o profissional ideal
        </h1>
        <p className="text-sm md:text-base text-gray-500 mt-1">
          Descreva o perfil que você procura e nossa IA faz o match
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl w-full">
        {[
          {
            label: "Busca semântica por IA",
            desc: "Descreva em linguagem natural",
          },
          {
            label: "Match inteligente",
            desc: "Ranking por compatibilidade",
          },
          {
            label: "Chat sobre o profissional",
            desc: "Pergunte detalhes específicos",
          },
        ].map((f) => (
          <div
            key={f.label}
            className="bg-white border border-gray-200 rounded-xl p-4 text-center"
          >
            <p className="text-sm font-semibold text-gray-800">{f.label}</p>
            <p className="text-xs text-gray-500 mt-1">{f.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
