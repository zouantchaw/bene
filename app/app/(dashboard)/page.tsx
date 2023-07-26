import OverviewStats from "@/components/overview-stats";
// import UpcomingReservations from "@/components/upcoming-reservations";
// import AvailableItems from "@/components/available-items";
import Sites from "@/components/sites";

export default function Overview() {
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8">
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Overview
        </h1>
        <OverviewStats />
      </div>

      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Reservations
        </h1>
        {/* <UpcomingReservations /> */}
      </div>

    </div>
  );
}
