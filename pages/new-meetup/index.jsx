import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';
import NewMeetupForm from './../../components/meetups/NewMeetupForm';

const NewMeetup = () => {
  const addMeetupHandler = (enteredData) => {
    console.log(enteredData);
  };

  return (
    <>
      <h2>Add new meetup here</h2>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetup;
