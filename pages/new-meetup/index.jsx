import axios from 'axios';
import NewMeetupForm from './../../components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';

const NewMeetup = () => {
  const router = useRouter();
  const addMeetupHandler = async (enteredData) => {
    // send data to api
    const result = await axios.post('/api/new-meetup', enteredData);
    result.data && router.push('/');
  };

  return (
    <>
      <h2>Add new meetup here</h2>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetup;
