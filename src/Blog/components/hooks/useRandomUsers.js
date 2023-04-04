import { useState, useEffect } from "react";
import axios from "axios";

const useRandomUsers = () => {
  const [users, setUsers] = useState([]);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=7")
      .then(({ data }) => setUsers(data.results));
  }, []);

  useEffect(() => {
    axios.get("https://randomuser.me/api/").then(({ data }) => {
      setUserProfile(data.results[0]);
    });
  }, []);

  return { users, userProfile };
};

export default useRandomUsers;
