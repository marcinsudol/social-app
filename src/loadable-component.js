import LoadingContent from "./loading-content";

export default function LoadableComponent({ children, loading }) {
  return loading ? <LoadingContent /> : children;
}
