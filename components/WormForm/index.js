export default function WormForm({ onSubmit }) {
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Worm Image</h2>

      <div>
        <label htmlFor="label">Worm Label:</label>
        <input
          type="text"
          id="label"
          name="label"
          placeholder="Enter worm label"
        />
      </div>
      <div>
        <label htmlFor="url">Image URL:</label>
        <input type="text" id="url" name="url" placeholder="Enter image URL" />
      </div>
      <div>
        <button type="submit">Add Worm</button>
      </div>
    </form>
  );
}
