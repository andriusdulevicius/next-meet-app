import { MongoClient } from 'mongodb';
import { useRouter } from 'next/router';
import { getCollection } from '../../utils/mongo-data';
import MeetupDetail from './../../components/meetups/MeetupDetail';

const MeetupDetails = (props) => {
  const meetupObj = useRouter();
  return (
    <>
      <MeetupDetail
        title={props.meetupData.title}
        image={props.meetupData.image}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
};

// reikalinga funkcija , generuoti statinius puslapius
export async function getStaticPaths() {
  const allMeets = await getCollection();

  const pathsArrOfCurrentMeets = allMeets.map((oneMeet) => {
    return {
      params: {
        meetupId: oneMeet._id.toString(),
      },
    };
  });
  console.log(pathsArrOfCurrentMeets);

  return {
    fallback: false, //einant i psl kurio nera aprasyta paths, puslapis sugeneruojams uzklausos metu(at run time), jei false - tai nesant pathui nuves i 404
    paths: pathsArrOfCurrentMeets,
  };
}

export async function getStaticProps(context) {
  const client = await MongoClient.connect(process.env.MONGO_CONN);
  const db = client.db();
  // sukurti arba nusitiaikyti i esama
  const meetupCollecion = db.collection('meetups');
  // const oneMeet = await meetupCollecion.findOne(_id === id).toArray();
  client.close();

  return {
    props: {
      meetupData: {
        // id: context.params.meetupId,
        // title: 'The first meetup',
        // image: 'https://picsum.photos/id/1018/1000/800',
        // address: 'Baker street 10, 1231231, London, GB',
        // description: 'First meet in London',
      },
      revalidate: 5, //kas kiek sekundziu duomenys bus atnaujinami
    },
  };
}

export default MeetupDetails;
