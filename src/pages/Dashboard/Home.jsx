import PageMeta from "../../components/common/PageMeta";
import DashboardMetrics from "../../components/dashboard/DashboardMetrics";
import RecentOrders from "../../components/dashboard/RecentOrders";
import MissingPackages from "../../components/dashboard/MissingPackages";

import { useDashboard } from "../../queries/useDashboard";

export default function Home() {
  const {
    data,
    isLoading,
    isError,
  } = useDashboard();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading dashboard</div>;
  }

  return (
    <>
      <PageMeta
        title="Union Road Ways Limited"
        description="Dashboard"
      />

      <div className="grid grid-cols-12 gap-4 md:gap-2">
        <div className="col-span-12">
          <DashboardMetrics data={data} />
        </div>

        <div className="col-span-12 xl:col-span-6">
          <RecentOrders
            orders={data?.recentOrders || []}
          />
        </div>

        <div className="col-span-12 xl:col-span-6">
          <MissingPackages
            missingPackages={data?.missingPackages}
          />
        </div>
      </div>
    </>
  );
}