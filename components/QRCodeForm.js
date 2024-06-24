import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./QRCodeForm.module.css";
import Card from "./Card";
import Input from "./Input";
import Button from "./Button";

export const QRCodeFormType = {
  Create: "create",
  Edit: "edit",
};

export default function QRCodeForm({
  type = QRCodeFormType.Create,
  initialValues = {
    title: "",
    url: "",
  },
  onSubmit,
}) {
  const { title, url } = initialValues;
  const [values, setValues] = useState({ title, url });
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    await onSubmit(values);
    setValues({
      title: "",
      url: "",
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  return (
    <Card>
      <form className={styles.qrcodeForm} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Title
          <Input
            className={styles.input}
            name="title"
            value={values.title}
            onChange={handleChange}
            placeholder="Input Title"
          />
        </label>
        <label className={styles.label}>
          Url address
          <Input
            className={styles.input}
            name="url"
            value={values.url}
            onChange={handleChange}
            placeholder="https://example.com/long-url"
          />
        </label>
        <div className={styles.buttons}>
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button>
            {type === QRCodeFormType.Create
              ? "Create QR code"
              : type === QRCodeFormType.Edit
              ? "Edit QR Code"
              : null}
          </Button>
        </div>
      </form>
    </Card>
  );
}
