import { CLIENT_BASE_URL } from '@/config/http';
import UserProfilePage from './UserProfilePage';

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Fetch user profile
  const profileRes = await fetch(`${CLIENT_BASE_URL}/api/user/profile/${id}`);
  const profile = await profileRes.json();

  // Fetch user profile image
  const imageRes = await fetch(`${CLIENT_BASE_URL}/api/user/profile/img/${id}`);
  const imageData = await imageRes.json();
  const profileImage = imageData?.image || null;

  return (
    <UserProfilePage
      profile={profile}
      profileImage={profileImage}
    />
  );
}