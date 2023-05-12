import React, { useState } from "react";
import { useAppContext } from "./store/appContext";
import { useVoteContext } from "./store/voteContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

const Vote = ({ postId }) => {
  const { blogInfo } = useAppContext();
  const { voteInfo, updateBlogVoteCount } = useVoteContext();

  const blogPost = blogInfo?.find(post => post._id === postId);
  const postVotes = voteInfo?.filter(vote => vote.post === blogPost._id);
  const totalVotes = postVotes?.reduce((acc, curr) => acc + curr.vote, 0);
  const [currentVote, setCurrentVote] = useState(0);

  const handleUpVoteClick = () => {
    if (currentVote === 1) {
      updateBlogVoteCount(postId, 0);
      setCurrentVote(0);
    } else {
      updateBlogVoteCount(postId, 1);
      setCurrentVote(1);
    }
  };

  const handleDownVoteClick = () => {
    if (currentVote === -1) {
      updateBlogVoteCount(postId, 0);
      setCurrentVote(0);
    } else {
      updateBlogVoteCount(postId, -1);
      setCurrentVote(-1);
    }
  };

  return (
    <div className="d-flex align-items-center">
      <FontAwesomeIcon
        icon={faArrowUp}
        className={`me-2 ${currentVote === 1 ? "text-primary" : ""}`}
        size="2x"
        onClick={handleUpVoteClick}
        cursor="pointer"
      />
      <h5 className="fw-bold mt-1">{totalVotes}</h5>
      <FontAwesomeIcon
        icon={faArrowDown}
        className={`ms-2 ${currentVote === -1 ? "text-danger" : ""}`}
        size="2x"
        onClick={handleDownVoteClick}
        cursor="pointer"
      />
    </div>
  );
};

export default Vote;
