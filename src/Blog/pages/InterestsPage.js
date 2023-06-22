import Layout from "../components/shared/Layout";
import CarouselComponent from "../components/interestsPageComponents/Carousel";
import EditorsChoice from "../components/interestsPageComponents/EditorsChoice";
import OtherChoices from "../components/interestsPageComponents/OtherChoices";
import { Row, Col } from "react-bootstrap";
import { useBlogContextState } from "../store/blogContext";
import { useCommentContextState } from "../store/commentContext";
import { useVoteContextState } from "../store/voteContext";

const InterestsPage = () => {
  const { blogInfo } = useBlogContextState();
  const { commentInfo } = useCommentContextState();
  const { voteInfo } = useVoteContextState();

  console.log("blogInfo", blogInfo);
  console.log("commentInfo", commentInfo);
  console.log("voteInfo", voteInfo);

  return (
    <Layout>
      <Row>
        <Col>
          <CarouselComponent blogInfo={blogInfo} />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <EditorsChoice blogInfo={blogInfo} commentInfo={commentInfo} />
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <OtherChoices
            blogInfo={blogInfo}
            commentInfo={commentInfo}
            voteInfo={voteInfo}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default InterestsPage;
