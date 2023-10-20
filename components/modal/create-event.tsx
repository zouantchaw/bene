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
  TextInput,
  Select,
  SelectItem,
  DatePicker, 
  DatePickerValue,
} from "@tremor/react";

interface Event {
  delivery: boolean;
  pickup: boolean;
  deliveryAddress: string;
  deliveryDate: Date;
  deliveryTime: string;
  pickupDate: Date;
  pickupTime: string;
  returnDate: Date;
  returnTime: string;
}

export default function CreateEventModal() {
  const router = useRouter();
  const modal = useModal();

  const initialEventState: Event = {
    delivery: false,
    pickup: false,
    deliveryAddress: "",
    deliveryDate: new Date(),
    deliveryTime: "",
    pickupDate: new Date(),
    pickupTime: "",
    returnDate: new Date(),
    returnTime: "",
  };

  const [data, setData] = useState<Event>(initialEventState);

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
          Welcome, tell us more about your event
        </h2>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="delivery"
            className="text-sm font-medium text-stone-500"
          >
            Delivery or Pickup
          </label>
          <Select
            value={data.pickup ? "Pickup" : "Delivery"}
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
              htmlFor="deliveryDate"
              className="text-sm font-medium text-stone-500"
            >
              Delivery Date
            </label>
            <DatePicker
              value={data.deliveryDate}
              onValueChange={(value: DatePickerValue) => setData({ ...data, deliveryDate: new Date(value) })}
            />
            <label
              htmlFor="deliveryAddress"
              className="text-sm font-medium text-stone-500"
            >
              Delivery Address
            </label>
            <TextInput
              name="deliveryAddress"
              placeholder="Enter delivery address"
              value={data.deliveryAddress}
              onChange={(e) => setData({ ...data, deliveryAddress: e.target.value })}
              required
              className="w-full rounded-md border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600 placeholder:text-stone-400 focus:border-black focus:outline-none focus:ring-black dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 dark:focus:ring-white"
            />
            <label
              htmlFor="deliveryTime"
              className="text-sm font-medium text-stone-500"
            >
              Delivery Time
            </label>
            <Select
              className="mb-40"
              value={data.deliveryTime}
              onValueChange={(value) => setData({ ...data, deliveryTime: value })}
            >
              <SelectItem value="Morning">Morning</SelectItem>
              <SelectItem value="Afternoon">Afternoon</SelectItem>
              <SelectItem value="Evening">Evening</SelectItem>
            </Select>
          </div>
        )}

        {data.pickup && (
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="pickupDate"
              className="text-sm font-medium text-stone-500"
            >
              Pickup Date
            </label>
            <DatePicker
              value={data.pickupDate}
              onValueChange={(value: DatePickerValue) => setData({ ...data, pickupDate: new Date(value)})}
            />
            <span className="text-sm text-stone-500">Address: 123 Main St, Anytown, USA</span>
            <label
              htmlFor="pickupTime"
              className="text-sm font-medium text-stone-500"
            >
              Pickup Time
            </label>
            <Select
              value={data.pickupTime}
              onValueChange={(value) => setData({ ...data, pickupTime: value })}
            >
              <SelectItem value="Morning">Morning</SelectItem>
              <SelectItem value="Afternoon">Afternoon</SelectItem>
              <SelectItem value="Evening">Evening</SelectItem>
            </Select>
            <label
              htmlFor="returnDate"
              className="text-sm font-medium text-stone-500"
            >
              Return Date
            </label>
            <DatePicker
              value={data.returnDate}
              onValueChange={(value: DatePickerValue) => setData({ ...data, returnDate: new Date(value) })}
            />
            <label
              htmlFor="returnTime"
              className="text-sm font-medium text-stone-500"
            >
              Return Time
            </label>
            <Select
              value={data.returnTime}
              onValueChange={(value) => setData({ ...data, returnTime: value })}
            >
              <SelectItem value="Morning">Morning</SelectItem>
              <SelectItem value="Afternoon">Afternoon</SelectItem>
              <SelectItem value="Evening">Evening</SelectItem>
            </Select>
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

