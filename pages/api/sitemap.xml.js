import { SitemapStream, streamToPromise } from "sitemap";
import { format } from "date-fns";
import socialMedias from "../../mock/socialMediaList";
import songs from "../../mock/songList";
import { images } from "../../mock/images";

export default async (req, res) => {
	const paths = ["/", "/experience", "/education", "/gallery"];

	images.forEach((image) => {
		paths.push(`/gallery/${image.id}`);
	});

	socialMedias.forEach((sm) => {
		paths.push(`/r/${sm.key}`);
	});

	songs.forEach((song) => {
		paths.push(`/streams/${song.key}`);
	});

	try {
		const smStream = new SitemapStream({
			hostname: `https://${req.headers.host}`,
		});

		paths.forEach((url, i) => {
			if (i === 0) {
				smStream.write({
					url,
					changefreq: "weekly",
					priority: 1,
					lastmod: format(new Date(), "yyyy-MM-dd"),
				});
			} else {
				smStream.write({
					url,
					changefreq: "weekly",
					priority: 0.9,
					lastmod: format(new Date(), "yyyy-MM-dd"),
				});
			}
		});

		// End sitemap stream
		smStream.end();

		// XML sitemap string
		const sitemapOutput = (await streamToPromise(smStream)).toString();

		// Change headers
		res.setHeader("Content-Type", "application/xml; charset=utf-8");
		res.setHeader("Cache-control", "stale-while-revalidate, s-maxage=3600");

		// Display output to user
		res.end(sitemapOutput);
	} catch (e) {
		console.log(e);
		res.send(JSON.stringify(e));
	}
};
