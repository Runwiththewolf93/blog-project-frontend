import { render, screen, fireEvent } from "@testing-library/react";
import { Dropdowns, WelcomeCard, ButtonsGroup } from "./MessageComponents";
import { capitalizeName } from "../../utils/helper";

describe("Dropdowns_function", () => {
  // Tests that the dropdown component is rendered with default values.
  it("test_default_rendering", async () => {
    const onSortChange = jest.fn();
    const onOrderChange = jest.fn();

    render(
      <Dropdowns onSortChange={onSortChange} onOrderChange={onOrderChange} />
    );

    expect(screen.getByText("Sort By")).toBeInTheDocument();
    expect(screen.getByText("Order")).toBeInTheDocument();

    // Simulate a click event to open the "Sort By" dropdown
    fireEvent.click(screen.getByText("Sort By"));

    // Use findByTest to wait for the dropdown items to appear
    expect(await screen.findByText("Created At")).toBeInTheDocument();
    expect(await screen.findByText("Updated At")).toBeInTheDocument();
    expect(await screen.findByText("Total Votes")).toBeInTheDocument();

    // Simulate a click event to open the "Sort By" dropdown
    fireEvent.click(screen.getByText("Order"));

    // Use findByText to wait for the dropdown items to appear
    expect(await screen.findByText("Ascending")).toBeInTheDocument();
    expect(await screen.findByText("Descending")).toBeInTheDocument();

    expect(onSortChange).not.toHaveBeenCalled();
    expect(onOrderChange).not.toHaveBeenCalled();
  });

  // Tests that the dropdown component is rendered with custom values.
  it("test_custom_rendering", () => {
    const onSortChange = jest.fn();
    const onOrderChange = jest.fn();

    render(
      <Dropdowns onSortChange={onSortChange} onOrderChange={onOrderChange} />
    );

    fireEvent.click(screen.getByText("Sort By"));
    fireEvent.click(screen.getByText("Total Votes"));
    fireEvent.click(screen.getByText("Order"));
    fireEvent.click(screen.getByText("Ascending"));

    expect(onSortChange).toHaveBeenCalledWith("totalVotes");
    expect(onOrderChange).toHaveBeenCalledWith("asc");
  });

  // Tests that the onSortChange callback function is called when a sort option is clicked.
  it("test_sort_change_callback", () => {
    const onSortChange = jest.fn();
    const onOrderChange = jest.fn();

    render(
      <Dropdowns onSortChange={onSortChange} onOrderChange={onOrderChange} />
    );

    fireEvent.click(screen.getByText("Sort By"));
    fireEvent.click(screen.getByText("Total Votes"));

    expect(onSortChange).toHaveBeenCalledWith("totalVotes");
    expect(onOrderChange).not.toHaveBeenCalled();
  });

  // Tests that the onOrderChange callback function is called when an order option is clicked.
  it("test_order_change_callback", () => {
    const onSortChange = jest.fn();
    const onOrderChange = jest.fn();

    render(
      <Dropdowns onSortChange={onSortChange} onOrderChange={onOrderChange} />
    );

    fireEvent.click(screen.getByText("Order"));
    fireEvent.click(screen.getByText("Ascending"));

    expect(onSortChange).not.toHaveBeenCalled();
    expect(onOrderChange).toHaveBeenCalledWith("asc");
  });

  // Tests that the dropdown component is rendered with no onSortChange callback function.
  it("test_no_sort_change_callback", () => {
    const onOrderChange = jest.fn();

    render(<Dropdowns onOrderChange={onOrderChange} />);

    fireEvent.click(screen.getByText("Sort By"));
    fireEvent.click(screen.getByText("Total Votes"));

    expect(onOrderChange).not.toHaveBeenCalled();
  });

  // Tests that the dropdown component is rendered with no onOrderChange callback function.
  it("test_no_order_change_callback", () => {
    const onSortChange = jest.fn();

    render(<Dropdowns onSortChange={onSortChange} />);

    fireEvent.click(screen.getByText("Order"));
    fireEvent.click(screen.getByText("Ascending"));

    expect(onSortChange).not.toHaveBeenCalled();
  });
});

describe("WelcomeCard_function", () => {
  // Tests that the component renders with all props
  it("test_render_with_all_props", () => {
    const userInfo = { name: "John Doe", _id: "123" };
    const showCard = false;
    const handleCloseCard = jest.fn();
    const show = true;
    const setShow = jest.fn();
    const errorFilter = "Error message";
    const resetErrorFilter = jest.fn();

    render(
      <WelcomeCard
        userInfo={userInfo}
        showCard={showCard}
        handleCloseCard={handleCloseCard}
        show={show}
        setShow={setShow}
        errorFilter={errorFilter}
        resetErrorFilter={resetErrorFilter}
      />
    );

    expect(
      screen.getByText(`Welcome back, ${capitalizeName(userInfo.name)}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Check below some of the blog posts we have curated for you:"
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId("close-btn")).toBeInTheDocument();
  });

  // Tests that the component renders with minimum required props
  it("test_render_with_minimum_props", () => {
    const userInfo = null;
    const showCard = false;
    const handleCloseCard = jest.fn();
    const show = false;
    const setShow = jest.fn();
    const errorFilter = null;
    const resetErrorFilter = jest.fn();

    render(
      <WelcomeCard
        userInfo={userInfo}
        showCard={showCard}
        handleCloseCard={handleCloseCard}
        show={show}
        setShow={setShow}
        errorFilter={errorFilter}
        resetErrorFilter={resetErrorFilter}
      />
    );

    expect(screen.getByText("See what's new")).toBeInTheDocument();
    expect(
      screen.getByText("Container for showing application messages")
    ).toBeInTheDocument();
    expect(screen.getByTestId("close-btn")).toBeInTheDocument();
  });

  // Tests that the component renders with empty userInfo object
  it("test_render_with_empty_user_info", () => {
    const userInfo = {};
    const showCard = false;
    const handleCloseCard = jest.fn();
    const show = false;
    const setShow = jest.fn();
    const errorFilter = null;
    const resetErrorFilter = jest.fn();

    render(
      <WelcomeCard
        userInfo={userInfo}
        showCard={showCard}
        handleCloseCard={handleCloseCard}
        show={show}
        setShow={setShow}
        errorFilter={errorFilter}
        resetErrorFilter={resetErrorFilter}
      />
    );

    expect(screen.getByText("See what's new")).toBeInTheDocument();
    expect(
      screen.getByText("Container for showing application messages")
    ).toBeInTheDocument();
    expect(screen.getByTestId("close-btn")).toBeInTheDocument();
  });

  // Tests that the component renders with showCard=false
  it("test_render_with_show_card_false", () => {
    const userInfo = { name: "John Doe", _id: "123" };
    const showCard = false;
    const handleCloseCard = jest.fn();
    const show = false;
    const setShow = jest.fn();
    const errorFilter = null;
    const resetErrorFilter = jest.fn();

    render(
      <WelcomeCard
        userInfo={userInfo}
        showCard={showCard}
        handleCloseCard={handleCloseCard}
        show={show}
        setShow={setShow}
        errorFilter={errorFilter}
        resetErrorFilter={resetErrorFilter}
      />
    );

    expect(
      screen.getByText(`Welcome back, ${capitalizeName(userInfo.name)}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Check below some of the blog posts we have curated for you:"
      )
    ).toBeInTheDocument();
    expect(screen.getByTestId("close-btn")).toBeInTheDocument();
  });

  // Tests that the component renders with show=true and errorFilter=null
  it("test_render_with_show_true_and_error_filter_null", () => {
    const userInfo = { name: "John Doe", _id: "123" };
    const showCard = false;
    const handleCloseCard = jest.fn();
    const show = true;
    const setShow = jest.fn();
    const errorFilter = null;
    const resetErrorFilter = jest.fn();

    render(
      <WelcomeCard
        userInfo={userInfo}
        showCard={showCard}
        handleCloseCard={handleCloseCard}
        show={show}
        setShow={setShow}
        errorFilter={errorFilter}
        resetErrorFilter={resetErrorFilter}
      />
    );

    expect(
      screen.getByText(`Welcome back, ${capitalizeName(userInfo.name)}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Check below some of the blog posts we have curated for you:"
      )
    ).toBeInTheDocument();

    expect(screen.getByTestId("close-btn")).toBeInTheDocument();
    expect(screen.queryByTestId("alert")).not.toBeInTheDocument();
  });

  // Tests that the component renders with show=true and errorFilter=''
  it("test_render_with_show_true_and_error_filter_empty_string", () => {
    const userInfo = { name: "John Doe", _id: "123" };
    const showCard = false;
    const handleCloseCard = jest.fn();
    const show = true;
    const setShow = jest.fn();
    const errorFilter = "";
    const resetErrorFilter = jest.fn();

    render(
      <WelcomeCard
        userInfo={userInfo}
        showCard={showCard}
        handleCloseCard={handleCloseCard}
        show={show}
        setShow={setShow}
        errorFilter={errorFilter}
        resetErrorFilter={resetErrorFilter}
      />
    );

    expect(
      screen.getByText(`Welcome back, ${capitalizeName(userInfo.name)}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Check below some of the blog posts we have curated for you:"
      )
    ).toBeInTheDocument();

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.queryByTestId("alert")).not.toBeInTheDocument();
  });
});

jest.mock("../modals/ModalAdd", () => () => <div>Mock Modal Add</div>);

describe("ButtonsGroup_function", () => {
  // Tests that the ButtonsGroup component is rendered with correct props
  it("renders ButtonsGroup component with correct props", () => {
    const handleRefresh = jest.fn();
    const toggleShowMyPosts = jest.fn();

    render(
      <ButtonsGroup
        handleRefresh={handleRefresh}
        toggleShowMyPosts={toggleShowMyPosts}
      />
    );

    expect(screen.getByText("Refresh Post")).toBeInTheDocument();
    expect(screen.getByText("Your Posts")).toBeInTheDocument();
  });

  // Tests that clicking the refresh button calls the handleRefresh function
  it("calls handleRefresh function when refresh button is clicked", () => {
    const handleRefresh = jest.fn();
    const toggleShowMyPosts = jest.fn();

    render(
      <ButtonsGroup
        handleRefresh={handleRefresh}
        toggleShowMyPosts={toggleShowMyPosts}
      />
    );

    fireEvent.click(screen.getByText("Refresh Post"));
    expect(handleRefresh).toHaveBeenCalled();
  });

  // Tests that clicking the toggle button calls the toggleShowMyPosts function
  it("calls toggleShowMyPosts function when toggle button is clicked", () => {
    const handleRefresh = jest.fn();
    const toggleShowMyPosts = jest.fn();

    render(
      <ButtonsGroup
        handleRefresh={handleRefresh}
        toggleShowMyPosts={toggleShowMyPosts}
      />
    );

    fireEvent.click(screen.getByText("Your Posts"));
    expect(toggleShowMyPosts).toHaveBeenCalled();
  });

  // Tests that the component renders correctly when handleRefresh function is not provided
  it("renders correctly when handleRefresh function is not provided", () => {
    const toggleShowMyPosts = jest.fn();

    render(<ButtonsGroup toggleShowMyPosts={toggleShowMyPosts} />);

    expect(screen.getByText("Your Posts")).toBeInTheDocument();
    expect(screen.getByText("Refresh Post")).toBeInTheDocument();
  });

  // Tests that the component renders correctly when toggleShowMyPosts function is not provided
  it("renders correctly when toggleShowMyPosts function is not provided", () => {
    const handleRefresh = jest.fn();

    render(<ButtonsGroup handleRefresh={handleRefresh} />);

    expect(screen.getByText("Your Posts")).toBeInTheDocument();
    expect(screen.getByText("Refresh Post")).toBeInTheDocument();
  });

  // Tests that the component renders correctly when ModalAdd component is not rendered
  it("renders correctly when ModalAdd component is not rendered", () => {
    const handleRefresh = jest.fn();
    const toggleShowMyPosts = jest.fn();

    render(
      <ButtonsGroup
        handleRefresh={handleRefresh}
        toggleShowMyPosts={toggleShowMyPosts}
      />
    );

    expect(
      screen.queryByRole("button", { name: "Add Post" })
    ).not.toBeInTheDocument();
  });
});
