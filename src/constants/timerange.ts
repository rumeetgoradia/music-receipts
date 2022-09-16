import { TimeRange } from "@/lib/spotify";

export const TIME_RANGE_DESCRIPTORS: { [key in TimeRange]: string } = {
	short: "Last month",
	medium: "Last 6 months",
	long: "All time",
};
