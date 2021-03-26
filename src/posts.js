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
          {posts
            ? posts.map((post) => <Post post={post} key={post.id} />)
            : null}
        </div>
      </LoadableComponent>
    </FullSizedComponent>
  );
}
