function userProfilePage({ user }) {
  return (
    <ul>
      {user.map((usr) => {
        return <li key={usr.id}>{usr.title}</li>;
      })}
    </ul>
  );
}

export default userProfilePage;

export async function getServerSideProps(context) {
  const user = await fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((json) => json);
  console.log("Server cod run");
  return {
    props: {
      user,
    },
  };
}
