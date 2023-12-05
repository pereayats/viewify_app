import moment from 'moment'

export function isEmailValid(email) {
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    
    if (email.match(regex)) return true
    else return false
}

export function capitalize(text) {
    return text.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
}

export function metricsFormatter(num) {
    if (num >= 1000000) {
        return Number((num / 1000000).toFixed(1)) + 'M'
    }
	else if (num >= 1000) {
        return Number((num / 1000).toFixed(1)) + 'K'
    }
	else {
        return Math.round(num).toString()
    }
}

export function percentageFormatter(num) {
	return Number((num * 100).toFixed(1)) + '%'
}

export function datetimeFormatter(datetime) {
	return moment(datetime).format('DD MMM ha')
}

export function dateFormatter(datetime) {
	return moment(datetime).format('DD MMM')
}

export function hourFormatter(datetime) {
	return moment(datetime).format('ha')
}