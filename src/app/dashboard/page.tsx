import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const {getUser} = getKindeServerSession();

  return <div>hey</div>
};

export default Page;
