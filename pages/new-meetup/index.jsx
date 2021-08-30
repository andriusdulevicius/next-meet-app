import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';
import NewMeetupForm from './../../components/meetups/NewMeetupForm';
import Layout from './../../components/layout/Layout';
const NewMeetup = () => {
  const addMeetupHandler = (enteredData) => {
    console.log(enteredData);
  };

  return (
    <Layout>
      <h2>Add new meetup here</h2>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Layout>
  );
};

export default NewMeetup;
