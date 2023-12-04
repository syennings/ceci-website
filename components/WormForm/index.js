export default function WormForm({ onSubmit }) {
  function handleSubmit(e) {
    e.preventDefault();
    // Get current timestamp

    window.location.reload();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    onSubmit(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add A New Worm</h2>

      <div>
        <label htmlFor="label">Name of Worm:</label>
        <input
          type="text"
          id="label"
          name="label"
          placeholder="Enter worm name"
        />
      </div>
      <div>
        <label htmlFor="url">Give me Your Worm URL:</label>
        <input type="text" id="url" name="url" placeholder="Enter image URL" />
      </div>
      <div>
        <button type="submit">Add Worm</button>
      </div>
    </form>
  );
}
