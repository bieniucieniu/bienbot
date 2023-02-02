import { videoData } from "../../types";

export const queryURL = async (
	url: string,
	maxResults?: number,
	onlyID?: boolean
): Promise<videoData[]> => {
	const respons = await fetch(
		`https://www.googleapis.com/youtube/v3/search?q=${url}&part=snippet&maxResults=${
			maxResults || 5
		}&key=${process.env.GOOGLE_API_KEY}`
	);
	console.log(
		`https://www.googleapis.com/youtube/v3/search?q=${url}&part=snippet&maxResults=${
			maxResults || 5
		}&key=${process.env.GOOGLE_API_KEY}`
	);

	const json = await respons.json();

	try {
		const out: videoData[] = [];

		if (onlyID) {
			await json.items.forEach((e: any) => {
				if (e.id.kind === "youtube#video") {
					out.push({ url: `https://www.youtube.com/watch?v=${e.id.videoId}` });
				}
			});
			// console.log(out);
			return out;
		} else {
			await json.items.forEach((e: any) => {
				// console.log(e);
				if (e.id.kind === "youtube#video") {
					out.push({
						url: `https://www.youtube.com/watch?v=${e.id.videoId}`,
						title: e.snippet.title || "Not Found",
						channelTitle: e.snippet.channelTitle || "Not Found",
						thumbnailsUrl: e.snippet.thumbnails.default.url || "Not Found",
						publishTime: e.snippet.publishTime || "Not Found",
					});
				}
			});
			// console.log(out);
			return out;
		}
	} catch (e) {
		console.error(e);
	}
	return [];
};
