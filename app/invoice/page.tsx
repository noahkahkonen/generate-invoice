import { Invoice } from "@/components/Invoice";
import { InvoicePdfFrame } from "@/components/InvoicePdfFrame";

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = searchParams ? await searchParams : {};
  const raw = params?.id;
  const id = typeof raw === "string" ? raw : "NO-ID";

  return (
    <InvoicePdfFrame id={id}>
      <Invoice id={id} />
    </InvoicePdfFrame>
  );
}
