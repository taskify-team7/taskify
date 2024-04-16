import { InviteListDataType } from "../interface/DashboardType";
import { useRef } from "react";
import useIntersectionObserver from "./useIntersectionObserver";
import { useQuery } from "@tanstack/react-query";
import { getInviteList } from "../api/dashboard";

export default function useInfiniteHook() {
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;

  const { isLoading, error, data } = useQuery<InviteListDataType>({
    queryKey: ["invite"],
    queryFn: () => getInviteList(),
  });

  return { isLoading, error, data, ref };
}
