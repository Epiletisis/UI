import HttpHelper from '../../utils/HttpHelper';

const getUserByEmail = async (email, setUser) => {
  await HttpHelper(`/users/${email}`, 'GET')
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((body) => {
      setUser(body);
      document.cookie = `user=${JSON.stringify(body)}`;
    })
    .catch(() => {});
};

export default getUserByEmail;
