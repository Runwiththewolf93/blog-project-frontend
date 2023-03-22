import placeholder from "../images/images.png";

const blog = [
  {
    id: 1,
    title: "Blog Post 1",
    date: new Date().toLocaleString(),
    avatar: {
      id: 1,
      src: placeholder,
      alt: "Avatar Image",
    },
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem, cum ut veritatis aliquam necessitatibus sed sint deserunt a fugiat consectetur quo beatae praesentium repellendus et fugit ipsum totam voluptatem, ad molestiae ex! Nam odit, temporibus sit similique autem eius non! Vitae aliquid quia ratione officia optio, minima magnam ea laudantium.",
    images: [
      { id: 1, src: placeholder, alt: "Image 1" },
      { id: 2, src: placeholder, alt: "Image 2" },
      { id: 3, src: placeholder, alt: "Image 3" },
    ],
  },
  {
    id: 2,
    title: "Blog Post 2",
    date: new Date().toLocaleString(),
    avatar: {
      id: 1,
      src: placeholder,
      alt: "Avatar Image",
    },
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates qui minima enim veritatis. Quod laudantium perspiciatis, unde iure et molestiae, consequuntur tempora vel placeat assumenda temporibus porro vero amet ea error modi quam in dolores ut blanditiis voluptatibus odio ratione eius delectus. Consectetur, harum explicabo et officia voluptatem quis cupiditate!",
    images: [
      { id: 1, src: placeholder, alt: "Image 1" },
      { id: 2, src: placeholder, alt: "Image 2" },
      { id: 3, src: placeholder, alt: "Image 3" },
    ],
  },
  {
    id: 3,
    title: "Blog Post 3",
    date: new Date().toLocaleString(),
    avatar: {
      id: 1,
      src: placeholder,
      alt: "Avatar Image",
    },
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, neque rem? Autem eius asperiores officia, nihil laborum facilis omnis itaque sint illo harum maxime quos, quod dolorum minus exercitationem. Corporis natus animi laboriosam accusantium, minus officiis repellat. A odio, deserunt labore harum quasi deleniti error corporis, quo esse dolorem fugit.",
    images: [
      { id: 1, src: placeholder, alt: "Image 1" },
      { id: 2, src: placeholder, alt: "Image 2" },
      { id: 3, src: placeholder, alt: "Image 3" },
    ],
  },
];

export default blog;
