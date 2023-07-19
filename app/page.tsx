import PokemonsByType from "@/components/PokemonsByType";
import Image from "next/image";

type PokemonType = {
  name: string;
  url: string;
};

async function getTypes() {
  const response = await fetch("https://pokeapi.co/api/v2/type");

  const data: { results: PokemonType[] } = await response.json();

  return data.results;
}

export default async function Home() {
  const types = await getTypes();
  return (
    <main className="max-w-7xl mx-5 py-32 xl:mx-auto">
      <h1 className="mb-4 font-bold">Pokemon Types</h1>
      <PokemonsByType types={types} />
    </main>
  );
}
