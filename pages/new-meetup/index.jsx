import axios from 'axios';
import NewMeetupForm from './../../components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { SITE_NAME } from '../../config';

const NewMeetup = () => {
  const router = useRouter();
  const addMeetupHandler = async (enteredData) => {
    // send data to api
    const result = await axios.post('/api/new-meetup', enteredData);
    result.data && router.push('/');
  };

  return (
    <>
      <Head>
        <title>New Meetup - {SITE_NAME} </title>
        <meta name='description' content='Create new meetup and connect with people.' />
      </Head>
      <h2>Add new meetup here</h2>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetup;
