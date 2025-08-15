import { CheckCircle2 } from "lucide-react";
import CheckoutCallbackWrapper from "./wrapper";

type Props = {
  searchParams: Promise<{
    Authority: string;
    Status: string;
  }>;
};

export default async function CheckoutCallbackPage({ searchParams }: Props) {
  const { Authority, Status } = await searchParams;

  return <CheckoutCallbackWrapper authority={Authority} status={Status} />;
}
