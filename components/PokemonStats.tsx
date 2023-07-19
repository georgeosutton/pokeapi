import { useQuery } from "@tanstack/react-query";
import React from "react";
import { TableCell } from "./ui/table";

const PokemonStats = ({ url, name }: { name: string; url: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: [name],
    queryFn: () =>
      fetch(url).then((res) => {
        const result = res.json();
        return result;
      }),
  });
  console.log(data);
  return (
    <>
      {data?.sprites?.other?.["official-artwork"]?.front_default && (
        <img
          src={data.sprites.other["official-artwork"].front_default}
          loading="lazy"
          width={50}
          height={50}
          className="mx-auto"
          sizes="50px"
        />
      )}

      {data?.stats?.map((stat: { base_stat: number }, index: number) => {
        return (
          <TableCell key={index} className="font-medium">
            {stat.base_stat}
          </TableCell>
        );
      })}
    </>
  );
};

export default PokemonStats;
