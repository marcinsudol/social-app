import { authContext } from "./auth";
import { useCallback, useContext, useEffect, useState } from "react";

const sortFromEarliest = (item1, item2) =>
  new Date(item1.createdAt).getTime() - new Date(item2.createdAt).getTime();

const sortFromLatest = (item1, item2) =>
  new Date(item2.createdAt).getTime() - new Date(item1.createdAt).getTime();

// -------------------------------------------------------------------------
// fetch user data hook
// -------------------------------------------------------------------------
export function useFetchUser(userId) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [users, fetchError, fetchUsers] = useFetchJson();

  // fetch users
  useEffect(() => {
    fetchUsers("./data/users.json");
  }, [fetchUsers]);

  // set correct user after fetching
  useEffect(() => {
    if (users) {
      const foundUser = users.find((user) => user.id === userId);
      if (foundUser) {
        setUser(foundUser);
      } else {
        setError("User does not exist");
      }
    }
  }, [userId, users]);

  // fetch error
  useEffect(() => {
    if (fetchError) {
      setError("Error while fetching the data");
    }
  }, [fetchError]);

  return [user, error];
}

// -------------------------------------------------------------------------
// fetch messages hook
// -------------------------------------------------------------------------
export function useFetchMessages(friendId) {
  const [messages, setMessages] = useState(null);
  const [error, setError] = useState(null);
  const auth = useContext(authContext);
  const [allMessages, fetchError, fetchAllMessages] = useFetchJson();

  // fetch all messages
  useEffect(() => {
    fetchAllMessages("./data/messages.json");
  }, [fetchAllMessages]);

  // filter messages
  useEffect(() => {
    if (allMessages) {
      const filteredMessages = allMessages.filter(
        (message) =>
          (message.userId === auth.userId && message.friendId === friendId) ||
          (message.userId === friendId && message.friendId === auth.userId)
      );
      const sortedMessages = filteredMessages.sort(sortFromEarliest);

      setMessages(sortedMessages);
      setError(null);
    }
  }, [auth, friendId, allMessages]);

  // set fetch error
  useEffect(() => {
    if (fetchError) {
      setError("Error while fetching the data");
    }
  }, [fetchError]);

  return [messages, error];
}

// -------------------------------------------------------------------------
// fetch posts hook
// -------------------------------------------------------------------------
export function useFetchPosts() {
  const [posts, fetchPostsError, fetchPosts] = useFetchJson();
  const [comments, fetchCommentsError, fetchComments] = useFetchJson();
  const [
    postReactions,
    fetchPostReactionsError,
    fetchPostReactions,
  ] = useFetchJson();
  const [
    commentReactions,
    fetchCommentReactionsError,
    fetchCommentReactions,
  ] = useFetchJson();
  const [users, fetchUsersError, fetchUsers] = useFetchJson();
  const [enrichedPosts, setEnrichedPosts] = useState(null);
  const [error, setError] = useState(null);

  // fetch all data from separate files
  useEffect(() => {
    fetchPosts("./data/posts.json");
  }, [fetchPosts]);

  useEffect(() => {
    fetchComments("./data/comments.json");
  }, [fetchComments]);

  useEffect(() => {
    fetchPostReactions("./data/post-reactions.json");
  }, [fetchPostReactions]);

  useEffect(() => {
    fetchCommentReactions("./data/comment-reactions.json");
  }, [fetchCommentReactions]);

  useEffect(() => {
    fetchUsers("./data/users.json");
  }, [fetchUsers]);

  // combine all data into enriched posts
  useEffect(() => {
    if (posts && comments && postReactions && commentReactions && users) {
      // sort posts
      const sortedPosts = posts.sort(sortFromLatest);

      sortedPosts.forEach((post) => {
        // add user data
        post.user = users.find((user) => user.id === post.userId);

        // add reactions to post
        post.reactions = postReactions.filter(
          (reaction) => reaction.postId === post.id
        );

        // filter comments related to post
        const postComments = comments.filter(
          (comment) => comment.postId === post.id
        );
        // sort comments
        const sortedComments = postComments.sort(sortFromLatest);

        // add user data and reactions to comments
        sortedComments.forEach((comment) => {
          comment.user = users.find((user) => user.id === comment.userId);
          comment.reactions = commentReactions.filter(
            (reaction) => reaction.commentId === comment.id
          );
        });

        // add comments to post
        post.comments = sortedComments;
      });

      setEnrichedPosts(sortedPosts);
    }
  }, [posts, comments, postReactions, commentReactions, users]);

  // set fetch error
  useEffect(() => {
    if (
      fetchPostsError ||
      fetchCommentsError ||
      fetchPostReactionsError ||
      fetchCommentReactionsError ||
      fetchUsersError
    ) {
      setError("Error while fetching the data");
    }
  }, [
    fetchPostsError,
    fetchCommentsError,
    fetchPostReactionsError,
    fetchCommentReactionsError,
    fetchUsersError,
  ]);

  return [enrichedPosts, error];
}

// fetch json file
export function useFetchJson() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [abortController] = useState(new AbortController());

  const fetchJson = useCallback(
    (url) => {
      setData(null);
      setError(null);

      fetch(url, { signal: abortController.signal })
        .then((response) => response.json())
        .then((fetchedData) => {
          setData(fetchedData);
        })
        .catch((e) => {
          if (!abortController.signal.aborted) {
            setError(e);
          }
        });
    },
    [abortController]
  );

  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, [abortController]);

  return [data, error, fetchJson];
}
