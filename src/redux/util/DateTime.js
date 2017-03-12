import moment from 'moment';

const DateTimeFormat = (unixTimestamp) => {
	return new moment.unix(unixTimestamp).format("YYYY-MM-DD HH:mm");
}

export { DateTimeFormat }