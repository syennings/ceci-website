import styles from "./wormform.module.css";

export default function WormForm({
  addWorm,
  isEditMode,
  wormData,
  handleEdit,
}) {
  function isValidURL(str) {
    // Regular expression for a valid URL
    const pattern = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/i);
    return !!pattern.test(str);
  }

  function handleSubmit(e) {
    e.preventDefault();

    window.location.reload();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    if (!data.label || !data.url) {
      alert(
        "Mm did you forget something? Please enter both worm name and image URL."
      );
      return;
    }
    if (!isValidURL(data.url)) {
      alert("Please enter a valid URL for the image.");
      return;
    }
    if (isEditMode) {
      handleEdit({ ...wormData, ...data });
    } else {
      addWorm(data);
    }
  }

  return (
    <form className={styles.wormForm} onSubmit={handleSubmit} noValidate>
      <h2>{isEditMode ? "Edit Worm" : "Add A New Worm"}</h2>
      <div>
        <label htmlFor="label" className={styles.input}>
          Name of Worm:
        </label>
        <input
          className={styles.text}
          type="text"
          id="label"
          name="label"
          defaultValue={wormData?.label}
          placeholder="Enter worm name"
          required
        />
      </div>
      <div>
        <label htmlFor="url" className={styles.input}>
          Give me Your Worm URL:
        </label>
        <input
          className={styles.text}
          type="text"
          id="url"
          name="url"
          defaultValue={wormData?.url}
          placeholder="Enter image URL"
          required
        />
      </div>
      <div>
        <button className={styles.button} type="submit">
          {isEditMode ? "Save Worm Changes" : "Add Worm"}
        </button>
      </div>
    </form>
  );
}
