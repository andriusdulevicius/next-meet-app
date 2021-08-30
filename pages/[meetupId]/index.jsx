import useRouter from 'next/router';
const MeetupDetails = () => {
  const meetupObj = useRouter();
  return (
    <>
      <h2>Details of meet with id: {meetupObj.query.meetupId}</h2>
    </>
  );
};

export default MeetupDetails;
