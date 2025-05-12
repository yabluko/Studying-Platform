import landingPhoto from '../../public/images/review.png'
import Image from 'next/image'
import HeaderComponent from '../components/Header/HeaderComponent';
import CardComponent from '../components/Card/CardComponent';
import frontendImg from '../../public/images/career-card-fswd.webp';
import dataScienceImg from '../../public/images/career-card-data-scientist.webp';
import digitalmarker from '../../public/images/career-card-digitalmarketer.webp';
import course1 from '../../public/images/coursesImages/standard-card-photo.webp';
import course2 from '../../public/images/coursesImages/course2.jpg';
import course3 from '../../public/images/coursesImages/course3.jpg';
import course4 from '../../public/images/coursesImages/course4.jpg';
import DynamicTabs from '../components/DynamicTabs/DynamicTabsComponent';
import StandardCard from '../components/StandardCard/StandardCard';
import PricingComponent from '../components/Pricing/PricingComponent';
import Footer from '../components/Footer.jsx/Footer';



function Landing() {
  const mockedCareerCardData = [
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

  const mockedCardData = [
    {
      photo : course1,
      title: 'The Complete AI Guide: Learn ChatGPT, Generative AI & More',
      lectors: 'Julian Melanson, Benza Maman, Leap Year Learning',
      price: 74.99,
    },
    {
      photo : course2,
      title: 'The Complete AI-Powered Copywriting Course & ChatGPT Course',
      lectors: 'Ing. Tomáš Morávek, Learn Digital Advertising',
      price: 74.99,
    },
    {
      photo : course3,
      title: 'ChatGPT, DeepSeek, Grok and 30+ More AI Marketing Assistants',
      lectors: 'Igor Voron, Simon Neters Support, Eugene Kim',
      price: 74.99,
    },
    {
      photo : course4,
      title: 'Upgrade Your Social Media Presence with ChatGPT',
      lectors: 'Anton Voroniuk, Anton Voroniuk Support',
      price: 19.99,
    },

  ]

  const tabs = [
    {value: "items", label: "Data Science", content: <div className='flex gap-5 justify-center'>
      {mockedCardData.map((cardData, index) => <StandardCard key={index} photo={cardData.photo} title={cardData.title} lectors={cardData.lectors} price={cardData.price}/>  )}
      </div>},

    {value: "certifications", label: "IT Certifications", content: "Item categories here"},
    {value: "leadership", label: "Leadership", content: "Item categories here"},
    {value: "web-dev", label: "Web Development", content: "Item categories here"},
    {value: "communication", label: "Communication", content: "Item categories here"},
    {value: "analytics", label: "Business Analytics & Intelligence", content: "Item categories here"},
];

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
                  <h1 className='text-[32px] text-gray-1'>Ready to reimagine your career?</h1>
                  <p className='text-lg text-gray-350'>Get the skills and real-world experience emplyores want with Career Accelerators</p>
              </div>
              <div className='flex justify-between'>
              {
                  
                  mockedCareerCardData.map((cardData, index) => (
                      <CardComponent key={index} photoUrl={cardData.photo} cardTitle={cardData.title} cardContent={cardData.content}/>
                  ))
              }
              </div>
          </section>
          <section className='mt-16'>
            <div className='mb-8'>
              <h1 className='text-[32px] text-gray-1'>All the skills you need in one place</h1>
              <p className='text-lg text-gray-350'>From critical skills to technical topics, Udemy supports your professional development.</p>
            </div>
            <DynamicTabs tabs={tabs} defaultValue="items"/>
          </section>     
          <PricingComponent/>
        </div>
    </main>
    <Footer/>
    </>
  );
}
export default Landing