import LoadableComponent from "./loadable-component";
import FullSizedComponent from "./full-sized-component";
import Post from "./post";
import ContentInput from "./content-input";
import { authContext } from "./auth";
import { useFetchUser, useFetchPosts } from "./use-fetch";
import "./posts.scss";

import { useCallback, useContext, useEffect, useMemo, useState } from "react";

export default function Posts() {
  const [posts, setPosts] = useState(null);
  const auth = useContext(authContext);
  const [user, userError] = useFetchUser(auth.userId);
  const [fetchedPosts, postsError] = useFetchPosts();

  // set posts after initial fetching
  useEffect(() => {
    setPosts(fetchedPosts);
  }, [fetchedPosts]);

  // publish post - add to posts list
  const publishPost = useCallback(
    (newPostContent) => {
      if (posts && user) {
        // create new post object
        const newPost = {
          id: Date.now(),
          content: newPostContent,
          userId: auth.userId,
          user,
          createdAt: new Date().toUTCString(),
        };
        const newPosts = [newPost, ...posts];
        setPosts(newPosts);
      }
    },
    [auth, user, posts]
  );

  const error = useMemo(
    () => (userError || postsError ? "Error fetching data" : null),
    [userError, postsError]
  );

  return (
    <FullSizedComponent>
      <LoadableComponent loading={!posts && !error} error={error}>
        <div id="posts">
          <div id="new-post-form">
            <ContentInput buttonLabel="Publish" submit={publishPost} />
          </div>
          <ol id="posts-list">
            {posts
              ? posts.map((post) => (
                  <li key={post.id}>
                    <Post post={post} />
                  </li>
                ))
              : null}
          </ol>
        </div>
      </LoadableComponent>
    </FullSizedComponent>
  );
}
