import Head from "next/head";
import QRCodeForm from "@/components/QRCodeForm";
import styles from "@/styles/QRCodeCreatePage.module.css";
import { useRouter } from "next/router";
import axios from "@/lib/axios";

export default function QRCodeCreatePage() {
  const router = useRouter();
  async function handleSubmit(value) {
    await axios.post("/qrcodes/", value);
    router.push("/qrcodes/");
  }
  return (
    <>
      <Head>
        <title>Add a new QRCode - Shortit</title>
      </Head>
      <div className={styles.page}>
        <h1 className={styles.title}>Add a new QRCode</h1>
        <QRCodeForm onSubmit={handleSubmit} />
      </div>
    </>
  );
}
