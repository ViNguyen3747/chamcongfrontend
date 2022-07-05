import { useQuery } from "@apollo/client";
import Auth from "../auth";
import { AUTH_USER } from "../../utils/graphQL/query";

export default function useAuth() {
  const { client, data } = useQuery(AUTH_USER);
  const logout = () => {
    Auth.logout().then(() => client.resetStore());
  };
  return [client, logout, data];
}
