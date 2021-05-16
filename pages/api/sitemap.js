import { SitemapStream, streamToPromise } from 'sitemap';
import { format } from 'date-fns';

export default async (req, res) => {
	try {
		const smStream = new SitemapStream({
			hostname: `https://${req.headers.host}`,
		});

		// List of posts
		// const posts = [];

		// // Create each URL row
		// posts.forEach((post) => {
		// 	smStream.write({
		// 		url: `/post/${post.slug}`,
		// 		changefreq: 'daily',
		// 		priority: 0.9,
		// 	});
		// });

		smStream.write({
			url: `/`,
			changefreq: 'weekly',
			priority: 1,
			lastmod: format(new Date(), 'yyyy-MM-dd'),
		});

		smStream.write({
			url: `/experience`,
			changefreq: 'weekly',
			priority: 0.9,
			lastmod: format(new Date(), 'yyyy-MM-dd'),
		});

		// End sitemap stream
		smStream.end();

		// XML sitemap string
		const sitemapOutput = (await streamToPromise(smStream)).toString();

		// Change headers
		res.writeHead(200, {
			'Content-Type': 'application/xml',
		});

		// Display output to user
		res.end(sitemapOutput);
	} catch (e) {
		console.log(e);
		res.send(JSON.stringify(e));
	}
};
