function Features({ title, descr }) {
  return (
    <div>
      <h4>{title}</h4>
      <p>{descr}</p>
    </div>
  );
}

function Functions({ src, title, descr }) {
  return (
    <div>
      <img src={src} alt={title} />
      <h4>{title}</h4>
      <p>{descr}</p>
    </div>
  );
}

export { Features, Functions };
