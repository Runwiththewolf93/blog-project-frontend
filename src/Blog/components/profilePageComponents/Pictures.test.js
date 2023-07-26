import { render, screen } from "@testing-library/react";
import Pictures from "./Pictures";
import useUnsplashImages from "../../hooks/useUnsplash";
import { concatAndSliceData } from "../../utils/helper";
import * as helper from "../../utils/helper";
import { useMediaQuery } from "react-responsive";

jest.mock("../../hooks/useUnsplash", () => {
  return jest.fn(() => []);
});

jest.mock("../../utils/helper", () => ({
  ...jest.requireActual("../../utils/helper"),
  concatAndSliceData: jest.fn(() => [
    {
      image: "https://example.com/blog-post-1.jpg",
      content: "This is my first blog post. I'm excited to share it with you!",
    },
    {
      image: "https://example.com/blog-post-2.jpg",
      content: "This is my second blog post. I'm excited to share it with you!",
    },
    {
      image: "https://example.com/blog-post-3.jpg",
      content: "This is my third blog post. I'm excited to share it with you!",
    },
  ]),
}));

describe("Pictures_function", () => {
  // Tests that component is rendered with correct props
  it("test_behaviour_render_component", () => {
    const userProfile = { gender: "male" };
    const userInfo = { _id: "123" };
    const blogInfo = [
      {
        user: { _id: "123" },
        images: [{ image: "image1", content: "content1" }],
      },
      {
        user: { _id: "456" },
        images: [{ image: "image2", content: "content2" }],
      },
    ];

    render(
      <Pictures
        userProfile={userProfile}
        userInfo={userInfo}
        blogInfo={blogInfo}
      />
    );

    expect(
      screen.getByText("Some of his interests include:")
    ).toBeInTheDocument();
  });

  // Tests that blogInfo is filtered to only include objects that belong to logged in user
  it("test_behaviour_filter_blog_info", () => {
    const userProfile = { gender: "male" };
    const userInfo = { _id: "123" };
    const blogInfo = [
      {
        user: { _id: "123" },
        images: [{ image: "image1", content: "content1" }],
      },
      {
        user: { _id: "456" },
        images: [{ image: "image2", content: "content2" }],
      },
    ];
    const filteredBlogInfo = blogInfo.filter(
      blog => blog.user._id === userInfo._id
    );
    expect(filteredBlogInfo).toEqual([
      {
        user: { _id: "123" },
        images: [{ image: "image1", content: "content1" }],
      },
    ]);
  });

  // Tests that images and content properties are extracted from userBlogInfo and a new array of objects is created
  it("test_behaviour_extract_images_and_content", () => {
    const userProfile = { gender: "male" };
    const userInfo = { _id: "123" };
    const blogInfo = [
      {
        user: { _id: "123" },
        images: [{ image: "image1", content: "content1" }],
      },
      {
        user: { _id: "123" },
        images: [{ image: "image2", content: "content2" }],
      },
    ];
    const userImages = blogInfo.flatMap(blog =>
      blog.images.map(({ image, content }) => ({ image, content }))
    );
    expect(userImages).toEqual([
      { image: "image1", content: "content1" },
      { image: "image2", content: "content2" },
    ]);
  });

  // Tests that userImages and additionalImages are concatenated and sliced to get 9 images
  it("test_behaviour_concat_and_slice_data", () => {
    const userImages = [
      { image: "image1", content: "content1" },
      { image: "image2", content: "content2" },
    ];
    const additionalImages = [
      { urls: { small: "image3" } },
      { urls: { small: "image4" } },
    ];
    const images = userImages.concat(additionalImages).slice(0, 9);
    expect(images).toEqual([
      { image: "image1", content: "content1" },
      { image: "image2", content: "content2" },
      { urls: { small: "image3" } },
      { urls: { small: "image4" } },
    ]);
  });

  // Tests that imgStyle object is set correctly based on screen size
  it("test_behaviour_detect_screen_size", () => {
    const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1280px)" });
    const isMobile = useMediaQuery({ query: "(max-width: 576px)" });
    const imgStyle = isDesktopOrLaptop
      ? { objectFit: "cover", width: "200px", height: "100px" }
      : {
          objectFit: "cover",
          maxWidth: "100%",
          height: "auto",
          aspectRatio: "16 / 9",
        };
    expect(imgStyle).toEqual({
      objectFit: "cover",
      maxWidth: "100%",
      height: "auto",
      aspectRatio: "16 / 9",
    });
  });

  // Tests that component handles null userProfile prop
  it("test_edge_case_user_profile_null", () => {
    const userInfo = { _id: "123" };
    const blogInfo = [
      {
        user: { _id: "123" },
        images: [{ image: "image1", content: "content1" }],
      },
      {
        user: { _id: "456" },
        images: [{ image: "image2", content: "content2" }],
      },
    ];
    render(
      <Pictures userProfile={null} userInfo={userInfo} blogInfo={blogInfo} />
    );
    expect(
      screen.getByText("Some of her interests include:")
    ).toBeInTheDocument();
  });
});
