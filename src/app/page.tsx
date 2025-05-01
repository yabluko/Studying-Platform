import landingPhoto from '../../public/images/review.png'
import Image from 'next/image'
import HeaderComponent from './components/Header/HeaderComponent';
import CardComponent from './components/Card/CardComponent';
import frontendImg from '../../public/images/career-card-fswd.webp';
import dataScienceImg from '../../public/images/career-card-data-scientist.webp';
import digitalmarker from '../../public/images/career-card-digitalmarketer.webp';



function Landing() {
  const mockedCardData = [
  {
    title: 'Full Stack Web Developer',
    content: '$61, 324 avarage salary US - 36 600 open roles US',
    photo: frontendImg,
  },    
  {
    title: 'Digital Marker',
    content: '$61, 324 avarage salary US - 36 600 open roles US',
    photo: digitalmarker,
  },    
  {
    title: 'Data Science Marker',
    content: '$41, 324 avarage salary US - 26 600 open roles US',
    photo: dataScienceImg,
  }]


  return (
    <>
    <HeaderComponent/>
    <main className='px-14'>
        <div className='max-w-[1340px] px-6'>

        <div className='relative lg:block h-[400px] '>
            <Image
                src={landingPhoto}
                alt='Picture of bird'
                fill
                style={{
                    objectFit: 'cover',}}
                    />
        </div>
        <section className='mt-8'>
            <div className='pb-3.5'>
                <h1 className='text-3xl text-gray-1'>Ready to reimagine your career?</h1>
                <p className='text-lg text-gray-350'>Get the skills and real-world experience emplyores want with Career Accelerators</p>
            </div>
            <div className='flex justify-between'>
            {
                
                mockedCardData.map((cardData, index) => (
                    <CardComponent key={index} photoUrl={cardData.photo} cardTitle={cardData.title} cardContent={cardData.content}/>
                ))
            }
            </div>
        </section>
            </div>
    </main>
  
    </>
  );
}
export default Landing