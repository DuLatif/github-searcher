import { EOrder } from "@/interfaces/global.interface";
import { ERepositorySort } from "@/interfaces/repository.interface";
import { EUserSort } from "@/interfaces/user.interface";

export const orderOptions: { label: string; value: EOrder }[] = [
  { label: "Desc", value: EOrder.DESC },
  { label: "Asc", value: EOrder.ASC },
];

export const userSortingOptions: { label: string; value: EUserSort }[] = [
  { label: "Followers", value: EUserSort.FOLLOWERS },
  { label: "Joined", value: EUserSort.JOINED },
  { label: "Repositories", value: EUserSort.REPOSITORIES },
];
export const repoSortingOptions: { label: string; value: ERepositorySort }[] = [
  { label: "Starts", value: ERepositorySort.STARTS },
  { label: "Forks", value: ERepositorySort.FORKS },
  { label: "Help Wanted Issue", value: ERepositorySort.HELP_WANTED_ISSUES },
  { label: "Updated", value: ERepositorySort.UPDATED },
];
