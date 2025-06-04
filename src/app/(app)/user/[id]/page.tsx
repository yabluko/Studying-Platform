import UserProfilePage from './UserProfilePage';
import { getUserProfileImage, getUserProfileInfo } from '@/actions/user';

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const profile = await getUserProfileInfo(id);

  const imageRes = await getUserProfileImage(id);

  return (
    <UserProfilePage
      profile={profile}
      profileImage={imageRes || ''}
    />
  );
}