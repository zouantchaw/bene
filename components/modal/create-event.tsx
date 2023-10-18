"use client";

import { toast } from "sonner";
import { createEvent } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import LoadingDots from "@/components/icons/loading-dots";
import { useModal } from "./provider";
import va from "@vercel/analytics";
import { useEffect, useState } from "react";
import {
  NumberInput,
  Card,
  Grid,
  Badge,
  Select,
  SelectItem,
  DateRangePicker,
} from "@tremor/react";

interface Product {
  name: string;
  price: number;
  image: JSX.Element;
}

interface Event {
  name: string;
  description: string;
  date: string;
  location: string;
  delivery: boolean;
  pickup: boolean;
  dropoff: string;
  return: string;
}

export default function CreateEventModal() {
  const router = useRouter();
  const modal = useModal();

  const [data, setData] = useState<Event>({
    name: "",
    description: "",
    date: "",
    location: "",
    delivery: false,
    pickup: false,
    dropoff: "",
    return: "",
  });

  useEffect(() => {
    // Update localStorage whenever the event details change
    window.localStorage.setItem("eventDetails", JSON.stringify(data));
  }, [data]);

  return (
    <form
      action={async (data: FormData) =>
        createEvent(data).then((res: any) => {
          if (res.error) {
            toast.error(res.error);
          } else {
            va.track("Created Event");
            const { id } = res;
            router.refresh();
            router.push(`/event/${id}`);
            modal?.hide();
            toast.success(`Successfully created event!`);
          }
        })
      }
      className="w-full rounded-md bg-white dark:bg-black md:max-w-md md:border md:border-stone-200 md:shadow dark:md:border-stone-700"
    >
      <div className="relative flex flex-col space-y-4 p-5 md:p-10">
        <h2 className="font-cal text-2xl dark:text-white">
          Create a new event
        </h2>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-medium text-stone-500 dark:text-stone-400"
          >
            Event Name
          </label>
          <input
            name="name"
            type="text"
            placeholder="My Awesome Event"
            autoFocus
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            maxLength={32}
            required
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-medium text-stone-500"
          >
            Description
          </label>
          <textarea
            name="description"
            placeholder="Description about why my event is so awesome"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            maxLength={140}
            rows={3}
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black  focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="delivery"
            className="text-sm font-medium text-stone-500"
          >
            Delivery or Pickup
          </label>
          <Select
            value={data.delivery ? "Delivery" : "Pickup"}
            onValueChange={(value) =>
              setData({
                ...data,
                delivery: value === "Delivery",
                pickup: value === "Pickup",
              })
            }
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
          >
            <SelectItem value="Delivery">Delivery</SelectItem>
            <SelectItem value="Pickup">Pickup</SelectItem>
          </Select>
        </div>

        {data.delivery && (
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="date"
              className="text-sm font-medium text-stone-500"
            >
              Dropoff and Pickup Date
            </label>
            <DateRangePicker
              // onValueChange={(value) =>
              //   setData({ ...data, dropoff: value.from, return: value.to })
              // }
              className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
              enableSelect={false}
            />
          </div>
        )}

        {data.pickup && (
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="date"
              className="text-sm font-medium text-stone-500"
            >
              Pickup and Return Date
            </label>
            <DateRangePicker
              onValueChange={(value: any) =>
                setData({ ...data, dropoff: value.from, return: value.to })
              }
              className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
              enableSelect={false}
            />
          </div>
        )}

        {data.delivery && (
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="location"
              className="text-sm font-medium text-stone-500"
            >
              Location
            </label>
            <input
              name="location"
              type="text"
              placeholder="Event Location"
              value={data.location}
              onChange={(e) => setData({ ...data, location: e.target.value })}
              maxLength={32}
              required
              className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
            />
          </div>
        )}
      </div>
      <div className="flex items-center justify-end rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 md:px-10">
        <CreateEventFormButton />
      </div>
    </form>
  );
}
function CreateEventFormButton() {
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
    >
      {pending ? <LoadingDots color="#808080" /> : <p>Create Event</p>}
    </button>
  );
}
