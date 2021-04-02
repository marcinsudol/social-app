import LoadableComponent from "./loadable-component";
import FullSizedComponent from "./full-sized-component";
import Post from "./post";
import ContentInput from "./content-input";
import { authContext } from "./auth";
import { useFetchPosts } from "./custom-hooks";
import "./posts.scss";

import { useCallback, useContext, useEffect, useMemo, useState } from "react";

export default function Posts() {
  const [posts, setPosts] = useState(null);
  const auth = useContext(authContext);
  const [fetchedPosts, postsError] = useFetchPosts();

  // set posts after initial fetching
  useEffect(() => {
    if (fetchedPosts) {
      setPosts(fetchedPosts);
    }
  }, [fetchedPosts]);

  // publish post - add new post to posts list
  const publishPost = useCallback(
    (newPostContent) => {
      if (posts && auth.user) {
        // create new post object
        const newPost = {
          id: Date.now(),
          content: newPostContent,
          userId: auth.userId,
          user: { ...auth.user },
          createdAt: new Date().toUTCString(),
          reactions: [],
          comments: [],
        };
        const newPosts = [newPost, ...posts];
        setPosts(newPosts);
      }
    },
    [auth, posts]
  );

  const error = useMemo(() => (postsError ? "Error fetching data" : null), [
    postsError,
  ]);

  return (
    <FullSizedComponent>
      <LoadableComponent loading={!posts && !error} error={error}>
        <div id="posts-wrapper">
          <div id="posts">
            <div id="new-post-form">
              <ContentInput
                buttonLabel="Publish"
                rows="3"
                submit={publishPost}
              />
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
        </div>
      </LoadableComponent>
    </FullSizedComponent>
  );
}
