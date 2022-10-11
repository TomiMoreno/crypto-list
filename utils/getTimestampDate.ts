const dateTypes = {
  hour: {
    timeStyle: 'short',
  },
  day: {
    day: '2-digit',
    month: '2-digit',
  },
  month: {
    month: 'short',
    day: '2-digit',
  },
  year: {
    year: 'numeric',
    month: 'short',
  },
  full: {
    dateStyle: 'full',
    timeStyle: 'medium',
  },
} as const

const getTimestampDate = (
  timestamp: number,
  dateType: 'hour' | 'day' | 'month' | 'year' | 'full'
) => {
  try {
    const date = new Date(timestamp)
    const timeFormat = new Intl.DateTimeFormat('en', dateTypes[dateType])

    return timeFormat.format(date)
  } catch (e) {
    console.log(e)
    return ''
  }
}

export default getTimestampDate
