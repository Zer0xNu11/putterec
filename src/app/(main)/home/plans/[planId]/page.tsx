import ListFromSort from "@/components/map/editMap/ListFromSort";
import { getPlanData } from "@/lib/getPlanData";
import dynamic from "next/dynamic";
import React from "react";

interface Params {
  params: { planId: string };
}

const PlanMap = async ({params}:Params) => {
  const planId = params.planId
  const currentPath = `${process.env.NEXT_PUBLIC_BASE_URL}/home/plans/${planId}`

  const EditMap = React.useMemo(
    () =>
      dynamic(() => import("@/components/map/editMap/EditMap"), { //SSR停止　window error防止
        loading: () => <p>map is loading</p>,
        ssr: false,
      }),
    []
  );

  const { planPoints, polylineCoordinates } = await getPlanData(planId);


  return (
    <div className="w-full h-[100vh] flex flex-row">
      <div className="w-[100%] h-[80vh]">
        <EditMap planId={planId}  polylineCoordinates={polylineCoordinates} planPoints={planPoints} />
      </div>
    </div>
  );
};

export default PlanMap;
