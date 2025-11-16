import { useState } from "react";
import { getCountries } from "@/api/countries";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";

import Header from "@/components/header";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const { data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getCountries(),
    staleTime: 30000,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black">
      <div className="container mx-auto px-4 py-12">
        <Header />
        <div className="mx-auto mb-12 max-w-md">
          <Select
            value={selectedCountry || undefined}
            onValueChange={setSelectedCountry}
          >
            <SelectTrigger className="w-full border-gray-800 bg-gray-950 text-gray-100">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent className="border-gray-800 bg-gray-950">
              <SelectGroup>
                <SelectLabel>Countries</SelectLabel>
                {countries?.map((country: Country) => (
                  <SelectItem
                    key={country.isoCode}
                    value={country.isoCode}
                    className="text-gray-100 focus:bg-gray-800 focus:text-gray-100"
                  >
                    {country.name.find((n) => n.language === "EN")?.text ||
                      country.isoCode}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

type LocalizedName = {
  language: string;
  text: string;
};

type Country = {
  isoCode: string;
  name: LocalizedName[];
  officialLanguanges: string[];
};
