import { useRouter } from 'next/router';
import MeetupDetail from './../../components/meetups/MeetupDetail';

const MeetupDetails = (props) => {
  const meetupObj = useRouter();
  return (
    <>
      <MeetupDetail
        title='The first meetup'
        image='https://picsum.photos/id/1060/1000/800'
        address='kazkoks 12'
        description='firs meet in italy'
      />
    </>
  );
};

export default MeetupDetails;
