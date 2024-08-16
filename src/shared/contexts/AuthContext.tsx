import { useQuery } from '@tanstack/react-query';
import { signOut, useSession } from 'next-auth/react';
import { ReactNode, createContext, useEffect, useState } from 'react';
import api from '../services/apiService';


type User = {
  id: string,
  first_name: string,
  user_permissions: string[],
  groups: number[],
};

type AuthContextData = {
  signOut(): void,
  user?: User,
  isAuthenticated: boolean,
};

type AuthProviderProps = {
  children: ReactNode,
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const { data: session } = useSession();

  const { data: userdata } = useQuery({
    queryKey: ['userData'],
    queryFn: () =>
      api.get(`/contrib/users/${session?.user_id}`).then(res => res.data),
    staleTime: Infinity,
    enabled: !!session?.user_id,
  });

  useEffect(() => {
    if (userdata) {
      const { id, first_name, user_permissions, groups } = userdata;
      setUser({ id, first_name, user_permissions, groups });
    }
  }, [userdata]);

  return (
    <AuthContext.Provider value={{ signOut, user, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {
//       session: await getServerSession(
//         context.req,
//         context.res,
//         authOptions
//       ),
//     },
//   }
// }
