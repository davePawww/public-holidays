import { useState, useEffect } from "react";
import { getCountries } from "@/api/countries";
import { getPublicHolidays } from "@/api/publicHolidays";
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
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const { data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getCountries(),
    staleTime: 30000,
  });

  const { data: publicHolidays } = useQuery({
    queryKey: ["publicHolidays", selectedCountry],
    queryFn: () => getPublicHolidays(selectedCountry!),
    staleTime: 30000,
    enabled: !!selectedCountry,
  });

  useEffect(() => {
    console.log(publicHolidays);
  }, [selectedCountry, publicHolidays]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black">
      <div className="container mx-auto px-4 py-12">
        <Header />
        <div className="mx-auto mb-12 max-w-md">
          <Select
            value={selectedCountry ?? ""}
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
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {publicHolidays?.map((holiday: PublicHolidays) => {
            const { id, name, startDate } = holiday;
            return (
              <Card
                key={id}
                className="border-gray-800 bg-gray-950/95 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
              >
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 rounded-lg bg-gray-900 p-2">
                      <CalendarDays className="h-5 w-5 text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-gray-100">
                        {name.find((n) => n.language === "EN")?.text}
                      </CardTitle>
                      <CardDescription className="mt-1 text-purple-400">
                        {startDate}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
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

type PublicHolidays = {
  endDate: string;
  id: string;
  name: LocalizedName[];
  nationwide: boolean;
  regionalScope: string;
  startDate: string;
  tags: number;
  temporalScope: string;
  type: string;
};
