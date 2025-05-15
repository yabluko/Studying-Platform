import { getUserById } from '@/actions/user';
import UserPage from './UserPage';

type Props = {
  params: {
    id: string; 
  };
};

export default async function Page({ params }: Props) {
    const id = params.id;
    const user = await getUserById(Number(id));

  return <UserPage user={user} />;
}