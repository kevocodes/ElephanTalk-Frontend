function PostDetails({ description }) {
  return (
    <div>{description && <p className="text-small">{description}</p>}</div>
  );
}

export default PostDetails;
