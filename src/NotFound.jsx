export default function NotFound({ title, message }) {
  return (
    <div role="alert">
      <h2>404 · {title}</h2>
      <p>{message}</p>
    </div>
  )
}
