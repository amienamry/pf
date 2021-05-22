import { SitemapStream, streamToPromise } from 'sitemap';
import { format } from 'date-fns';

export default async (req, res) => {
	const paths = [
		'/',
		'/experience',
		'/education',
	];

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

		paths.forEach((url, i) => {
			if (i === 0) {
				smStream.write({
					url,
					changefreq: 'weekly',
					priority: 1,
					lastmod: format(new Date(), 'yyyy-MM-dd'),
				});
			} else {
				smStream.write({
					url,
					changefreq: 'weekly',
					priority: 0.9,
					lastmod: format(new Date(), 'yyyy-MM-dd'),
				});
			}
		})

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
