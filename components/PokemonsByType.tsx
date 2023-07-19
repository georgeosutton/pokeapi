"use client";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import PokemonStats from "./PokemonStats";
import { useState } from "react";

type PokemonType = {
  name: string;
  url: string;
};

const PokemonsByType = ({ types }: { types: PokemonType[] }) => {
  const [type, setType] = useState(types[0].name);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [type],
    queryFn: () =>
      fetch(`https://pokeapi.co/api/v2/type/${type}`).then((res) => {
        const result = res.json();
        return result;
      }),
  });

  return (
    <>
      <Select defaultValue={types[0].name} onValueChange={(value) => setType(value)}>
        <SelectTrigger className="w-[180px] mb-8">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          {types.map((type) => {
            return (
              <SelectItem key={type.name} value={type.name}>
                {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Table>
        <TableCaption>A list of pokemon by type.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Pokemon</TableHead>
            <TableHead className="text-center">Image</TableHead>
            <TableHead>HP</TableHead>
            <TableHead>Attack</TableHead>
            <TableHead>Defence</TableHead>
            <TableHead>Special Attack</TableHead>
            <TableHead>Special Defence</TableHead>
            <TableHead>Speed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.pokemon?.map((pokemonData: { pokemon: { name: string; url: string } }) => {
            const { pokemon } = pokemonData;
            return (
              <TableRow key={pokemon.name}>
                <TableCell className="font-medium">
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </TableCell>
                <PokemonStats {...pokemon} />
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default PokemonsByType;
