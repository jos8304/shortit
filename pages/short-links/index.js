import Head from "next/head";
import ShortLinkList from "@/components/ShortLinkList";
import Button from "@/components/Button";
import Link from "@/components/Link";
import styles from "@/styles/ShortLinkListPage.module.css";
import dbConnect from "@/db/dbConnect";
import ShortLink from "@/db/models/ShortLink";
import axios from "@/lib/axios";
import { useState } from "react";

export async function getServerSideProps() {
  await dbConnect();
  const shortLinks = await ShortLink.find();
  return {
    props: {
      shortLinks: JSON.parse(JSON.stringify(shortLinks)),
    },
  };
}

export default function ShortLinkListPage({ shortLinks: initialShortLinks }) {
  const [shortLinks, setShortLinks] = useState(initialShortLinks);

  async function handleDelete(id) {
    await axios.delete(`/short-links/${id}`);
    setShortLinks((prevShortLinks) =>
      prevShortLinks.filter((shortLinks) => shortLinks._id !== id)
    );
  }
  return (
    <>
      <Head>
        <title>Shorten Url Address - Shortit</title>
      </Head>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>Shorten url address</h1>
          <Button as={Link} href="/short-links/new">
            Create new
          </Button>
        </header>
        <ShortLinkList items={shortLinks} onDelete={handleDelete} />
      </div>
    </>
  );
}
