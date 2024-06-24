import Head from "next/head";
import QRCodeForm, { QRCodeFormType } from "@/components/QRCodeForm";
import styles from "@/styles/QRCodeEditPage.module.css";
import QRCode from "@/db/models/QRCode";
import { useRouter } from "next/router";
import axios from "@/lib/axios";
import dbConnect from "@/db/dbConnect";

export async function getServerSideProps(context) {
  const { id } = context.query;
  await dbConnect();

  const qrcode = await QRCode.findById(id);
  if (qrcode) {
    return {
      props: {
        qrcode: JSON.parse(JSON.stringify(qrcode)),
      },
    };
  }
  return {
    notFound: true,
  };
}

export default function QRCodeEditPage({ qrcode }) {
  const router = useRouter();
  const { id } = router.query;

  async function handleSubmit(values) {
    await axios.patch(`/qrcodes/${id}`, values);
    router.push("/qrcodes/");
  }

  return (
    <>
      <Head>
        <title>Edit QRCode - Shortit</title>
      </Head>
      <div className={styles.page}>
        <h1 className={styles.title}>Edit QRCode</h1>
        <QRCodeForm
          type={QRCodeFormType.Edit}
          initialValues={qrcode}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
