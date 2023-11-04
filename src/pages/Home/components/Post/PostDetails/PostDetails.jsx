function PostDetails({ description="Descripcion default para pruebas" }) {
  return (
    <div>
      {description && (
        <p className="text-small">{description}</p>
      )}
    </div>
  );
}

export default PostDetails;
