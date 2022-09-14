function userIdPage(props) {
  return <h1>{props.userId}</h1>;
}
export default userIdPage;

export async function getServerSideProps(context) {
  const { params } = context;
  const userId = params.userId;
  return {
    props: {
      userId: "userID-" + userId,
    },
  };
}
