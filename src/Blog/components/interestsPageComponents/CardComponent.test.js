import { render, screen } from "@testing-library/react";
import CardComponent from "./CardComponent";
import { useMediaQuery } from "react-responsive";

describe("CardComponent_function", () => {
  // Tests that the Card component is rendered with all the required props passed in the comment object.
  it("test_render_card_with_all_props", () => {
    const comment = {
      blogPostImage: "https://example.com/image.jpg",
      blogPostTitle: "Test Blog Post Title",
      comment: "Test Comment Text",
      user: {
        name: "Test User Name",
        email: "testuser@example.com",
      },
      totalVotes: 10,
    };

    render(<CardComponent comment={comment} />);

    const cardTitle = screen.getByText(comment.blogPostTitle);
    const cardComment = screen.getByText(comment.comment);
    const cardUserName = screen.getByText(comment.user.name);
    const cardUserEmail = screen.getByText(comment.user.email);
    const cardTotalVotes = screen.getByText(
      `Total votes: ${comment.totalVotes}`
    );
    expect(cardTitle).toBeInTheDocument();
    expect(cardComment).toBeInTheDocument();
    expect(cardUserName).toBeInTheDocument();
    expect(cardUserEmail).toBeInTheDocument();
    expect(cardTotalVotes).toBeInTheDocument();
  });

  // Tests that the useMediaQuery hook returns true when the screen width is less than or equal to 992px.
  it("test_screen_width_less_than_992px", () => {
    // Mock the useMediaQuery hook
    useMediaQuery.mockImplementation(query => {
      // Return true if the query matches
      if (query.query === "(max-width: 992px)") {
        return true;
      }
      // Return false otherwise
      return false;
    });

    // Render the component
    const { container } = render(<CardComponent comment={{}} />);

    // Get the Card.Body component by its class name
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const cardBody = container.querySelector(".card-body");

    expect(cardBody).toHaveStyle(`
     white-space: nowrap;
     overflow: hidden;
     text-overflow: ellipsis;
   `);
  });

  // Tests that the useMediaQuery hook returns true when the screen width is less than or equal to 576px.
  it("test_screen_width_less_than_576px", () => {
    // Mock the useMediaQuery hook
    useMediaQuery.mockImplementation(query => {
      // Return true if the query matches
      if (query.query === "(max-width: 576px)") {
        return true;
      }
      // Return false otherwise
      return false;
    });

    // Render the component
    const { container } = render(<CardComponent comment={{}} />);

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const card = container.querySelector(".card");

    expect(card).toHaveClass("mb-3");
  });

  // Tests that the Card component is rendered with correct styles based on edge cases such as missing or invalid props in the comment object.
  it("test_render_card_with_missing_or_invalid_props", () => {
    const comment = {
      blogPostImage: "https://example.com/image.jpg",
      blogPostTitle: "Test Blog Post Title",
      comment: "Test Comment Text",
      user: {
        name: "Test User Name",
        email: "testuser@example.com",
      },
      totalVotes: 10,
    };
    render(<CardComponent comment={comment} />);
    comment.blogPostImage = undefined;
    comment.blogPostTitle = undefined;
    comment.comment = undefined;
    comment.user = undefined;
    comment.totalVotes = undefined;
    render(<CardComponent comment={comment} />);
  });

  // Tests that a long comment text is truncated with an ellipsis.
  it("test_long_comment_text_truncated_with_ellipsis", () => {
    const comment = {
      blogPostImage: "https://example.com/image.jpg",
      blogPostTitle: "Test Blog Post Title",
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo placeat, nihil vel distinctio perspiciatis excepturi esse quibusdam sed quaerat id unde numquam eaque reprehenderit maiores! Nam vel repellendus modi sed, fuga velit, deleniti voluptas maiores, molestiae facilis mollitia consequatur incidunt iste voluptates quas enim nemo cum voluptatum assumenda cumque tempore impedit. Quidem vel ex eius eum neque, qui sit illo ducimus, repudiandae odit quaerat assumenda quod blanditiis labore officia voluptas rerum nisi obcaecati commodi. Voluptatibus aliquid provident assumenda. Esse, repudiandae quo. Non, quia et! Quisquam id alias amet obcaecati provident quis eligendi quibusdam doloribus non, voluptatem recusandae asperiores, sapiente iusto possimus, nobis error iure molestias quia! Repellat quisquam veritatis accusamus, quae nobis, sit voluptate ab corporis impedit accusantium quo perspiciatis delectus vero laudantium esse reiciendis aliquam ex? Nihil ad porro iure quod, vitae a placeat cum pariatur dolore numquam, quasi temporibus excepturi deleniti totam iste repellendus? Consectetur beatae dicta eveniet omnis cumque reprehenderit rem recusandae voluptate neque facilis sunt numquam officiis expedita et illum adipisci, quod dolores sequi quam nam laboriosam. Adipisci neque ea dolore vel accusantium. Labore, ducimus possimus dolor temporibus quo ipsa voluptates optio nemo accusamus laboriosam a error distinctio vero nisi quis iure corrupti officia? Error, aut?",
      user: {
        name: "Test User Name",
        email: "testuser@example.com",
      },
      totalVotes: 10,
    };
    render(<CardComponent comment={comment} />);

    const cardComment = screen.getByTestId("card-comment");

    expect(cardComment.textContent).toHaveLength(103);
  });

  // Tests that a Card component with a large number of total votes is displayed correctly.
  it("test_large_number_of_total_votes_displayed_correctly", () => {
    const comment = {
      blogPostImage: "https://example.com/image.jpg",
      blogPostTitle: "Test Blog Post Title",
      comment: "Test Comment Text",
      user: {
        name: "Test User Name",
        email: "testuser@example.com",
      },
      totalVotes: 1000000,
    };

    render(<CardComponent comment={comment} />);

    const cardTotalVotes = screen.getByTestId("total-votes");
    expect(cardTotalVotes).toBeInTheDocument();
  });
});
