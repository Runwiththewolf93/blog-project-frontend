import { useState, useEffect } from "react";
import axios from "axios";

const useRandomUsers = (gender = "male", results = 7) => {
  const [users, setUsers] = useState([]);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    axios
      .get(`https://randomuser.me/api/?results=${results}`)
      .then(({ data }) => setUsers(data.results));
  }, [results]);

  useEffect(() => {
    axios
      .get(`https://randomuser.me/api/?gender=${gender}`)
      .then(({ data }) => {
        setUserProfile(data.results[0]);
      });
  }, [gender]);

  return { users, userProfile };
};

export default useRandomUsers;
