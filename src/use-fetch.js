import { authContext } from "./auth";
import { useCallback, useContext, useEffect, useState } from "react";

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
      const sortedMessages = filteredMessages.sort(
        (item1, item2) =>
          new Date(item1.createdAt).getTime() -
          new Date(item2.createdAt).getTime()
      );

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
  const [users, fetchUsersError, fetchUsers] = useFetchJson();

  // fetch posts
  useEffect(() => {
    fetchPosts("./data/posts.json");
  }, [fetchPosts]);

  // fetch users
  useEffect(() => {
    fetchUsers("./data/users.json");
  }, [fetchUsers]);

  // sort posts and add user data
  useEffect(() => {
    if (posts && users) {
      const sortedPosts = posts.sort(
        (item1, item2) =>
          new Date(item2.createdAt).getTime() -
          new Date(item1.createdAt).getTime()
      );
      sortedPosts.forEach((item) => {
        item["user"] = users.find((user) => user.id === item.userId);
      });
      setRichPosts(sortedPosts);
    }
  }, [posts, users]);

  // fetch error
  useEffect(() => {
    if (fetchPostsError || fetchUsersError) {
      setError("Error while fetching the data");
    }
  }, [fetchPostsError, fetchUsersError]);

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
