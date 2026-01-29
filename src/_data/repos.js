import Fetch from "@11ty/eleventy-fetch";

export default async function () {
	let json = await Fetch("https://api.github.com/repos/11ty/eleventy", {
		duration: "1d", // 1 day
		type: "json", // also supports "text" or "buffer"
	});

	return {
		stargazers: json.stargazers_count,
	};
};