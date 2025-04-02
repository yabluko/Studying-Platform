import HomeContent from './components/HomeContent/HomeContent';
import Sidebar from './components/Sidebar/Sidebar';
import './globals.css'

export default function Home() {
  return (
    <div className='flex'>
      <Sidebar/>
      <HomeContent/>

    </div>
  );
}
