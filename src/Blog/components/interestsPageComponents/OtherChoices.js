import { useState, useMemo } from "react";
import { Accordion, Spinner } from "react-bootstrap";
import { calculateMostPost } from "../../utils/helper";

/**
 * Generates the other choices component.
 *
 * @param {Object} props - The props object.
 * @param {Array} props.blogInfo - The information about the blogs.
 * @param {Array} props.commentInfo - The information about the comments.
 * @param {Array} props.voteInfo - The information about the votes.
 * @param {boolean} props.isLoadingBlog - Whether the blog information is loading.
 * @param {boolean} props.isLoadingComment - Whether the comment information is loading.
 * @param {boolean} props.isLoadingVote - Whether the vote information is loading.
 * @return {ReactElement} The other choices component.
 */
// OtherChoices component
const OtherChoices = ({
  blogInfo,
  commentInfo,
  voteInfo,
  isLoadingBlog,
  isLoadingComment,
  isLoadingVote,
}) => {
  const setActiveItem = useState(0)[1];

  // Calculate the controversial posts
  const controversialPosts = useMemo(() => {
    const voteCounts = voteInfo?.reduce((acc, curr) => {
      acc[curr.post] = acc[curr.post] || { upvotes: 0, downvotes: 0 };
      if (curr.vote === 1) acc[curr.post].upvotes += 1;
      else if (curr.vote === -1) acc[curr.post].downvotes += 1;
      return acc;
    }, {});

    const sortedBlogInfo = [...blogInfo].map(post => {
      const votes = voteCounts[post._id] || { upvotes: 0, downvotes: 0 };
      return {
        ...post,
        controversy:
          votes.upvotes +
          votes.downvotes -
          Math.abs(votes.upvotes - votes.downvotes),
      };
    });

    return sortedBlogInfo.sort((a, b) => b.controversy - a.controversy);
  }, [blogInfo, voteInfo]);

  // Calculate the post with the most comments
  const mostCommentedPost = useMemo(() => {
    return calculateMostPost(commentInfo, "blog", () => 1, blogInfo);
  }, [blogInfo, commentInfo]);

  // Calculate the post with the most votes
  const mostVotedPost = useMemo(() => {
    return calculateMostPost(voteInfo, "post", vote => vote.vote, blogInfo);
  }, [blogInfo, voteInfo]);

  const categories = [
    { post: controversialPosts[0], title: "Most Controversial Post" },
    { post: mostCommentedPost, title: "Most Commented Post" },
    { post: mostVotedPost, title: "Most Voted Post" },
  ];

  if (isLoadingBlog || isLoadingComment || isLoadingVote) {
    return <Spinner variant="primary" />;
  }

  console.log(categories);

  return (
    <div className="m-3">
      <h1>Other topics that might interest you...</h1>
      <Accordion>
        {categories.map((category, idx) => (
          <Accordion.Item key={category.post?._id} eventKey={idx}>
            <Accordion.Header>{category.title}</Accordion.Header>
            <Accordion.Body onEnter={() => setActiveItem(idx)}>
              {category.post ? (
                <div className="card h-100">
                  <img
                    src={category.post.images[0]}
                    alt={category.post.title}
                    className="card-img-top"
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{category.post.title}</h5>
                    <p className="card-text">
                      {category.post.content.slice(0, 200)}...
                    </p>
                  </div>
                  <div className="card-footer">
                    <small className="text-muted">
                      Total votes: {category.post.totalVotes}
                    </small>
                  </div>
                </div>
              ) : (
                <p data-testid="no-data">
                  No data available for this category.
                </p>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default OtherChoices;
