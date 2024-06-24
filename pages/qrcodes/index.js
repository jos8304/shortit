import Head from "next/head";
import QRCodeList from "@/components/QRCodeList";
import Button from "@/components/Button";
import Link from "@/components/Link";
import styles from "@/styles/QRCodeListPage.module.css";
import dbConnect from "@/db/dbConnect";
import QRCode from "@/db/models/QRCode";
import { useState } from "react";
import axios from "@/lib/axios";

export async function getServerSideProps() {
  await dbConnect();

  const qrcodes = await QRCode.find();
  return {
    props: {
      qrcodes: JSON.parse(JSON.stringify(qrcodes)),
    },
  };
}

export default function QRCodeListPage({ qrcodes: initialShortLinks }) {
  const [qrcodes, setQRcodes] = useState(initialShortLinks);

  async function handleDelete(id) {
    await axios.delete(`/qrcodes/${id}`);
    setQRcodes((prevShortLinks) =>
      prevShortLinks.filter((qrcodes) => qrcodes._id !== id)
    );
  }
  return (
    <>
      <Head>
        <title>Create QRCode - Shortit</title>
      </Head>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>Create QRCode</h1>
          <Button as={Link} href="/qrcodes/new">
            Create new
          </Button>
        </header>
        <QRCodeList items={qrcodes} onDelete={handleDelete} />
      </div>
    </>
  );
}
