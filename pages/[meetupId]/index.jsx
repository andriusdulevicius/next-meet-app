import { ObjectId } from 'mongodb';
import { useRouter } from 'next/router';
import { getCollection } from '../../utils/mongo-data';
import MeetupDetail from './../../components/meetups/MeetupDetail';
import Head from 'next/head';
import { SITE_NAME } from '../../config';

const MeetupDetails = (props) => {
  const meetupObj = useRouter();
  return (
    <>
      <Head>
        <title>
          {props.meetupData.title} - {SITE_NAME}
        </title>
        <meta name='description' content={props.meetupData.description} />
      </Head>
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
  const [meetupCollection, client] = await getCollection();
  const allMeets = await meetupCollection.find({}).toArray();
  client.close();

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
  const [meetupCollection, client] = await getCollection();
  const oneMeet = await meetupCollection.findOne({ _id: ObjectId(context.params.meetupId) });
  client.close();

  return {
    props: {
      meetupData: {
        id: context.params.meetupId,
        title: oneMeet.title,
        image: oneMeet.image,
        address: oneMeet.address,
        description: oneMeet.description,
      },
      revalidate: 5, //kas kiek sekundziu duomenys bus atnaujinami
    },
  };
}

export default MeetupDetails;
