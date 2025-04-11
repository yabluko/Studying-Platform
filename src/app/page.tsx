import HomeContent from './components/HomeContent/HomeContent';
import Sidebar from './components/Sidebar/Sidebar';
import ProfileContent from './components/ProfileContent/ProfileContent';
import './globals.css'


export default function Home() {
  return (
    <div className='flex justify-between'>
      <Sidebar/>
      <HomeContent/>
      <ProfileContent />
    </div>
  );
}
