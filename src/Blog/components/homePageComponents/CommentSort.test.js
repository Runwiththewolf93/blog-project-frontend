import { render, screen } from "@testing-library/react";
import CommentSort from "./CommentSort";

// Tests that the component renders without crashing
it("test_render_without_crashing", () => {
  const state = {
    sortedComments: [],
  };
  const dispatch = jest.fn();
  const sortState = {
    field: null,
    order: null,
  };
  const setSortState = jest.fn();

  render(
    <CommentSort
      state={state}
      dispatch={dispatch}
      sortState={sortState}
      setSortState={setSortState}
    />
  );
});

// Tests that the component displays the three sorting buttons
it("test_displays_sorting_buttons", () => {
  const state = {
    sortedComments: [],
  };
  const dispatch = jest.fn();
  const sortState = {
    field: null,
    order: null,
  };
  const setSortState = jest.fn();

  render(
    <CommentSort
      state={state}
      dispatch={dispatch}
      sortState={sortState}
      setSortState={setSortState}
    />
  );

  expect(screen.getByText("Created at")).toBeInTheDocument();
  expect(screen.getByText("Updated at")).toBeInTheDocument();
  expect(screen.getByText("Total votes")).toBeInTheDocument();
});

// Tests that the component displays the correct sorting order for each button
it("test_correct_sorting_order", () => {
  const state = {
    sortedComments: [],
  };
  const dispatch = jest.fn();
  const sortState = {
    field: "createdAt",
    order: "asc",
  };
  const setSortState = jest.fn();

  render(
    <CommentSort
      state={state}
      dispatch={dispatch}
      sortState={sortState}
      setSortState={setSortState}
    />
  );

  expect(screen.getByText("Created at asc")).toBeInTheDocument();
  expect(screen.getByText("Updated at")).toBeInTheDocument();
  expect(screen.getByText("Total votes")).toBeInTheDocument();
});

// Tests that the component handles the case when sortState.field is null
it("test_sortState_field_null", () => {
  const state = {
    sortedComments: [],
  };
  const dispatch = jest.fn();
  const sortState = {
    field: null,
    order: "asc",
  };
  const setSortState = jest.fn();

  render(
    <CommentSort
      state={state}
      dispatch={dispatch}
      sortState={sortState}
      setSortState={setSortState}
    />
  );
  expect(screen.getByText("Created at")).toBeInTheDocument();
  expect(screen.getByText("Updated at")).toBeInTheDocument();
  expect(screen.getByText("Total votes")).toBeInTheDocument();
});

// Tests that the component handles the case when sortState.order is null
it("test_sortState_order_null", () => {
  const state = {
    sortedComments: [],
  };
  const dispatch = jest.fn();
  const sortState = {
    field: "createdAt",
    order: null,
  };
  const setSortState = jest.fn();

  render(
    <CommentSort
      state={state}
      dispatch={dispatch}
      sortState={sortState}
      setSortState={setSortState}
    />
  );

  expect(screen.getByText("Created at")).toBeInTheDocument();
  expect(screen.getByText("Updated at")).toBeInTheDocument();
  expect(screen.getByText("Total votes")).toBeInTheDocument();
});

// Tests that the component handles the case when state.sortedComments is empty
it("test_sortedComments_empty", () => {
  const state = {
    sortedComments: [],
  };
  const dispatch = jest.fn();
  const sortState = {
    field: "createdAt",
    order: "asc",
  };
  const setSortState = jest.fn();

  render(
    <CommentSort
      state={state}
      dispatch={dispatch}
      sortState={sortState}
      setSortState={setSortState}
    />
  );

  expect(screen.getByText("Created at asc")).toBeInTheDocument();
  expect(screen.getByText("Updated at")).toBeInTheDocument();
  expect(screen.getByText("Total votes")).toBeInTheDocument();
});
