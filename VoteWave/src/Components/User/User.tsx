const User = () => {
  const adminString = localStorage.getItem("admin");
  const admin = adminString ? JSON.parse(adminString) : null;

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  return (
    <>
      {admin ? <div>Welcome {admin.firstName}</div> : user ? <div>Welcome {user.firstName}</div> : null}
      <h1>User Profile</h1>
    </>
  );
};

export default User;
