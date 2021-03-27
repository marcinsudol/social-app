import { authContext } from "./auth";
import { useCallback, useContext, useEffect, useState } from "react";

const sortFromEarliest = (item1, item2) =>
  new Date(item1.createdAt).getTime() - new Date(item2.createdAt).getTime();

const sortFromLatest = (item1, item2) =>
  new Date(item2.createdAt).getTime() - new Date(item1.createdAt).getTime();

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

  // fetch error
  useEffect(() => {
    if (fetchError) {
      setError("Error while fetching the data");
    }
  }, [fetchError]);

  return [messages, error];
}

// fetch posts
export function useFetchPosts() {
  const [richPosts, setRichPosts] = useState(null);
  const [error, setError] = useState(null);
  const [posts, fetchPostsError, fetchPosts] = useFetchJson();
  const [comments, fetchCommentsError, fetchComments] = useFetchJson();
  const [users, fetchUsersError, fetchUsers] = useFetchJson();

  // fetch posts
  useEffect(() => {
    fetchPosts("./data/posts.json");
  }, [fetchPosts]);

  // fetch comments
  useEffect(() => {
    fetchComments("./data/comments.json");
  }, [fetchComments]);

  // fetch users
  useEffect(() => {
    fetchUsers("./data/users.json");
  }, [fetchUsers]);

  // sort posts and add user data
  useEffect(() => {
    if (posts && comments && users) {
      // sort posts
      const sortedPosts = posts.sort(sortFromLatest);

      sortedPosts.forEach((item) => {
        // add user data
        item.user = users.find((user) => user.id === item.userId);

        // filter comments related to post
        const postComments = comments.filter(
          (comment) => comment.postId === item.id
        );
        // sort comments
        const sortedComments = postComments.sort(sortFromLatest);

        // add user data to comments
        sortedComments.forEach((item) => {
          item.user = users.find((user) => user.id === item.userId);
        });

        // add comments to post
        item.comments = sortedComments;
      });

      setRichPosts(sortedPosts);
    }
  }, [posts, comments, users]);

  // fetch error
  useEffect(() => {
    if (fetchPostsError || fetchCommentsError || fetchUsersError) {
      setError("Error while fetching the data");
    }
  }, [fetchPostsError, fetchCommentsError, fetchUsersError]);

  return [richPosts, error];
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
