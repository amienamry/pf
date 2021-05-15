declare const window: any;

export const GA_TRACKING_ID: string = '272493287';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (page_path) => {
	window.gtag('config', GA_TRACKING_ID, {
		page_path,
	});
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, event_category, event_label, value }) => {
	window.gtag('event', action, {
		event_category,
		event_label,
		value: value,
	});
};
