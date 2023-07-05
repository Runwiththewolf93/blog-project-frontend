// Tests that the Vote component is rendered with the correct props
it("test_render_vote_component", () => {
  // Arrange
  const type = "blog";
  const itemId = "645a31966273ccc2ce33a93f";
  const userInfo = {
    _id: "642da876a185c06e961be81a",
    name: "Stevan Zivanovic",
    email: "stevan@gmail.com",
    isAdmin: true,
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmRhODc2YTE4NWMwNmU5NjFiZTgxYSIsImlhdCI6MTY4ODU1MDgwMiwiZXhwIjoxNjg4NTU2ODAyfQ.Flo5MlSlVFQcoUCL0rDghM26yOtdqyaDfHZFm5Df9Nk",
  };
  // Act
  const wrapper = shallow(
    <Vote type={type} itemId={itemId} userInfo={userInfo} />
  );
  // Assert
  expect(wrapper.find(VoteButton)).toHaveLength(2);
  expect(wrapper.find(VoteCount)).toHaveLength(1);
  expect(wrapper.find(FontAwesomeIcon)).toHaveLength(0);
});
