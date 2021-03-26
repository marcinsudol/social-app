import LoadableComponent from "./loadable-component";
import FullSizedComponent from "./full-sized-component";
import Post from "./post";
import "./posts.scss";

import { useFetchPosts } from "./use-fetch";

export default function Posts() {
  const [posts, error] = useFetchPosts();

  return (
    <FullSizedComponent>
      <LoadableComponent loading={!posts && !error} error={error}>
        <div id="posts">
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
