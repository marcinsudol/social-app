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

  // reset messages when friend id changes
  // useEffect(() => {
  //   setMessages(null);
  //   setError(null);
  // }, [friendId]);

  // fetch all messages
  useEffect(() => {
    fetchAllMessages("./data/messages.json");
  }, [fetchAllMessages]);

  // filter messages
  useEffect(() => {
    if (allMessages) {
      let filteredMessages = allMessages.filter(
        (message) =>
          (message.userId === auth.userId && message.friendId === friendId) ||
          (message.userId === friendId && message.friendId === auth.userId)
      );
      let sortedMessages = filteredMessages.sort((message1, message2) => {
        let date1 = new Date(message1.createdAt);
        let date2 = new Date(message2.createdAt);
        return date1.getTime() <= date2.getTime();
      });

      console.log(filteredMessages);
      console.log(sortedMessages);

      setMessages(sortedMessages);
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
