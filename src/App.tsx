import { useQuery } from "@tanstack/react-query";
import data from "./data/data.json";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
}

const request = async (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data as User[]), 2000);
  });
};

const useData = () => {
  const query = useQuery({
    queryKey: ["data"],
    queryFn: request,
  });

  const { data, isLoading, isError, refetch } = query;
  return { data, isLoading, isError, refetch };
};

function App() {
  const { data, isLoading, isError } = useData();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  return (
    <div>
      <h1>User List</h1>

      <ul>
        {data?.map((user, index) => (
          <li key={index}>{user.first_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
