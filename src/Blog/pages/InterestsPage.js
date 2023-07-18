import Layout from "../components/shared/Layout";
import CarouselComponent from "../components/interestsPageComponents/Carousel";
import EditorsChoice from "../components/interestsPageComponents/EditorsChoice";
import OtherChoices from "../components/interestsPageComponents/OtherChoices";
import { Row, Col } from "react-bootstrap";
import { useBlogContextState } from "../store/blogContext";
import { useCommentContextState } from "../store/commentContext";
import { useVoteContextState } from "../store/voteContext";

/**
 * Renders the InterestsPage component.
 *
 * @return {ReactElement} The rendered InterestsPage component.
 */
// InterestsPage component
const InterestsPage = () => {
  const { blogInfo, isLoadingBlog } = useBlogContextState();
  const { commentInfo, isLoadingComment } = useCommentContextState();
  const { voteInfo, isLoadingVote } = useVoteContextState();

  console.log("blogInfo", blogInfo);
  console.log("commentInfo", commentInfo);
  console.log("voteInfo", voteInfo);

  return (
    <Layout>
      <Row>
        <Col>
          <CarouselComponent
            blogInfo={blogInfo}
            isLoadingComment={isLoadingBlog}
          />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <EditorsChoice
            blogInfo={blogInfo}
            commentInfo={commentInfo}
            isLoadingBlog={isLoadingBlog}
            isLoadingComment={isLoadingComment}
          />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <OtherChoices
            blogInfo={blogInfo}
            commentInfo={commentInfo}
            voteInfo={voteInfo}
            isLoadingBlog={isLoadingBlog}
            isLoadingComment={isLoadingComment}
            isLoadingVote={isLoadingVote}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default InterestsPage;
