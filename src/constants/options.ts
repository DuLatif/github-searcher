import { EOrder } from "@/interfaces/global.interface";
import { EUserSort } from "@/interfaces/user.interface";

export const orderOptions: { label: string; value: EOrder }[] = [
  { label: "Asc", value: EOrder.ASC },
  { label: "Desc", value: EOrder.DESC },
];

export const userSortingOptions: { label: string; value: EUserSort }[] = [
  { label: "Followers", value: EUserSort.FOLLOWERS },
  { label: "Joined", value: EUserSort.JOINED },
  { label: "Repositories", value: EUserSort.REPOSITORIES },
];
