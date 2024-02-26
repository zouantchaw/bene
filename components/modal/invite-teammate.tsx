"use client";

import { toast } from "sonner";
import { inviteTeammate } from "@/lib/actions";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import LoadingDots from "@/components/icons/loading-dots";
import { useModal } from "./provider";
import { useState } from "react";

export default function InviteTeammateModal() {
  const modal = useModal();

  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await inviteTeammate({ email });
    if (result.error) {
      toast.error(result.error);
    } else {
      modal?.hide();
      toast.success(`Invitation sent to ${email}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-md bg-white dark:bg-black md:max-w-md md:border md:border-stone-200 md:shadow dark:md:border-stone-700"
    >
      <div className="relative flex flex-col space-y-4 p-5 md:p-10">
        <h2 className="font-cal text-2xl dark:text-white">Invite Teammate</h2>
        <p>Invite a teammate to join your project. Invitations will be valid for 14 days.</p>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            Email
          </label>
          <input
            name="email"
            type="email"
            placeholder="teammate@example.com"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
          />
        </div>
      </div>
      <div className="flex items-center justify-end rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 md:px-10">
        <InviteTeammateFormButton />
      </div>
    </form>
  );
}

function InviteTeammateFormButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className={cn(
        "flex h-10 w-full items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none",
        pending
          ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
          : "border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
      )}
      disabled={pending}
      type="submit"
    >
      {pending ? <LoadingDots color="#808080" /> : <p>Send invite</p>}
    </button>
  );
}
