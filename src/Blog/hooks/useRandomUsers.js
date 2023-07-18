import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Generates a list of random users based on the specified gender and number of results.
 *
 * @param {string} gender - The gender of the random users to generate. Defaults to "male".
 * @param {number} results - The number of random users to generate. Defaults to 7.
 * @return {object} - An object containing the generated list of random users and the user profile of the first user.
 */
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
