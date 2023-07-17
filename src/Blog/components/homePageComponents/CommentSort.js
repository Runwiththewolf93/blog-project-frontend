import { ListGroup, Button } from "react-bootstrap";
import useCommentSort from "./useCommentSort";
import { useMediaQuery } from "react-responsive";

/**
 * Component for sorting comments based on 'Created At', 'Updated At', or 'Total Votes'.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.state - The current state of the reducer from useReducer hook.
 * @param {string|null} props.state.editCommentId - The ID of the comment being edited.
 * @param {string} props.state.editedComment - The edited text of the comment.
 * @param {string|null} props.state.loadingCommentId - The ID of the comment that is being loaded.
 * @param {string|null} props.state.errorCommentId - The ID of the comment that had an error during loading.
 * @param {string} props.state.errorMessage - The error message associated with the comment.
 * @param {Array} props.state.sortedComments - An array of comments that are sorted.
 * @param {Function} props.dispatch - The dispatch function from the useReducer hook.
 * @param {Object} props.sortState - The current state of sorting from useState hook.
 * @param {string} props.sortState.field - The field by which comments are currently sorted.
 * @param {string} props.sortState.order - The current sorting order, either "asc" or "desc".
 * @param {Function} props.setSortState - Function to set the state of sorting.
 *
 * @example
 * const initialState = {
 *   editCommentId: null,
 *   editedComment: "",
 *   loadingCommentId: null,
 *   errorCommentId: null,
 *   errorMessage: "",
 *   sortedComments: []
 * };
 * const reducer = (state, action) => { ... };
 * const [state, dispatch] = useReducer(reducer, initialState);
 * const [sortState, setSortState] = useState({ field: '', order: '' });
 *
 * return <CommentSort state={state} dispatch={dispatch} sortState={sortState} setSortState={setSortState} />;
 */
// CommentSort component
const CommentSort = ({ state, dispatch, sortState, setSortState }) => {
  const { handleSortByCreatedAt, handleSortByUpdatedAt, handleSortByVotes } =
    useCommentSort(state.sortedComments, dispatch, sortState, setSortState);

  const getSortOrder = field => {
    return sortState.field === field ? sortState.order : null;
  };

  const isTabletOrMobileDevice = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <ListGroup className="mb-2">
      <ListGroup.Item
        className={isTabletOrMobileDevice && "d-flex justify-content-around"}
      >
        <Button
          variant="secondary"
          onClick={handleSortByCreatedAt}
          className="my-2 mx-2"
        >
          Created at {getSortOrder("createdAt")}
        </Button>
        <Button
          variant="secondary"
          onClick={handleSortByUpdatedAt}
          className="my-2 mx-2"
        >
          Updated at {getSortOrder("updatedAt")}
        </Button>
        <Button
          variant="secondary"
          onClick={handleSortByVotes}
          className="my-2 mx-2"
        >
          Total votes {getSortOrder("totalVotes")}
        </Button>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default CommentSort;
