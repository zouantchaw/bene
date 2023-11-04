import { trpc } from "../_trpc/client";
import { useSearchParams, useRouter } from "next/navigation";

// Sync the logged in  user and make sure they are
// synced with the database.

const Page = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");
};

export default Page;
