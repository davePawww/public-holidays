import { getUsers } from "@/api/users";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    staleTime: 30000,
  });

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
      <div>
        <h1 className="font-bold">Sample data pulled using Tanstack Query</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {data?.map((user: User) => (
              <li key={user.id}>
                {user.name} ({user.email})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

type Geo = {
  lat: number;
  lng: number;
};

type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
};
