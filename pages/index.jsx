import { getCollection } from '../utils/mongo-data';

// Jei importuojama kasnors kas bus naudojama tik backend funkcijoms, tie importai galutiniam variante nefiguruos, kaip ir tos funkcijos
import MeetupList from './../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: '1',
    title: 'The first meetup',
    image: 'https://picsum.photos/id/1018/1000/800',
    address: 'Baker street 10, 1231231, London, GB',
    description: 'First meet in London',
  },
  {
    id: '2',
    title: 'The first meetup in Italy',
    image: 'https://picsum.photos/id/1060/1000/800',
    address: 'Baker street 10, 1231231, Rome, Italy',
    description: 'First meet in Italy',
  },
  {
    id: '3',
    title: 'The first meetup in Greece',
    image: 'https://picsum.photos/id/1000/1000/800',
    address: 'Baker street 10, 1231231, Greece',
    description: 'First meet in Greece',
  },
];

const HomePage = (props) => {
  return (
    <>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// tam kad puslapis butu sugeneruotas duomenims pasikeitus yra naudojami 2 budai:

// SSR - server side rendering - duomenys sugeneruojami uzklausu metu,ir tinka labiau , kai duomenys kinta kas sekunde ar greiciau.

// export function getServerSideProps(context) {
//   // sitas kodas niekada neatsidurs pas klienta, turi buti butent toks pavadinimas funkcijos,
//   //   // cia yra lyg ir backend erdve
//   const request = context.req;
//   const response = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

// SSG - static side generating - duomenys sugeneruojami aplikacijos sukurimo metu ir atnaujinami jei reikia tam tikru intervalu.

export async function getStaticProps() {
  const allMeets = await getCollection();
  // console.log(allMeets);
  const meetsInReqFormat = allMeets.map((dbObj) => {
    // _id yra ObjectId ir gausim klaida jei bandysim nuskaityti ji kaip string jsx
    return {
      id: dbObj._id.toString(),
      title: dbObj.title,
      address: dbObj.address,
      image: dbObj.image,
      description: dbObj.description,
    };
  });
  console.log(meetsInReqFormat);
  return {
    props: {
      meetups: meetsInReqFormat,
    },
    revalidate: 2, // kas tiek sek duomenys bus atnaujinami
  };
}

export default HomePage;
