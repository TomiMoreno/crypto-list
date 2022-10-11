import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

type Props = {
  days: number
  setDays: (days: number) => void
}

const daysToFormatted = {
  1: '1D',
  30: '1M',
  180: '6M',
  365: '1Y',
  1825: '5Y',
}

export default function DaySelector({ days, setDays }: Props) {
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setDays(Number(newAlignment))
  }

  return (
    <ToggleButtonGroup value={days} exclusive onChange={handleAlignment}>
      {Object.entries(daysToFormatted).map(([days, formatted]) => (
        <ToggleButton key={days} value={+days} aria-label={formatted}>
          {formatted}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}
