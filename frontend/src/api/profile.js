export const getProfile = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch('http://localhost:4000/api/user/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};
