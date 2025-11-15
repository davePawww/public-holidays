import axios from "axios";

async function getUsers() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users",
  );
  return response.data;
}

export { getUsers };
