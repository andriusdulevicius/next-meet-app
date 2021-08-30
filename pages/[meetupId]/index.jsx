import { useRouter } from 'next/router';
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
export function getStaticPaths() {
  return {
    fallback: true, //einant i psl kurio nera aprasyta paths, puslapis sugeneruojams uzklausos metu(at run time), jei false - tai nesant pathui nuves i 404

    paths: [
      {
        params: {
          meetupId: '1',
        },
      },
      {
        params: {
          meetupId: '2',
        },
      },
      {
        params: {
          meetupId: '3',
        },
      },
    ],
  };
}

export function getStaticProps(context) {
  console.log(context.params.meetupId);
  return {
    props: {
      meetupData: {
        id: context.params.meetupId,
        title: 'The first meetup',
        image: 'https://picsum.photos/id/1018/1000/800',
        address: 'Baker street 10, 1231231, London, GB',
        description: 'First meet in London',
      },
      revalidate: 5, //kas kiek sekundziu duomenys bus atnaujinami
    },
  };
}

export default MeetupDetails;
