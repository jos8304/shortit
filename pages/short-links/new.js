import ShortLinkForm from "@/components/ShortLinkForm";
import axios from "@/lib/axios";
import styles from "@/styles/ShortLinkCreatePage.module.css";
import Head from "next/head";
import { useRouter } from "next/router";

export default function ShortLinkCreatePage() {
  const router = useRouter();

  async function handleSubmit(values) {
    await axios.post("/short-links/", values);
    router.push("/short-links/");
  }

  return (
    <>
      <Head>
        <title>Add a new URL - Shortit</title>
      </Head>
      <div className={styles.page}>
        <h1 className={styles.title}>Add a new URL</h1>
        <ShortLinkForm onSubmit={handleSubmit} />
      </div>
    </>
  );
}
