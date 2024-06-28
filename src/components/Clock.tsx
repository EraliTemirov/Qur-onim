import {useEffect, useState} from 'react'

const Clock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())
  const ctConvertedDate = currentTime.toLocaleDateString()
  const ctConvertedHour = currentTime.toLocaleTimeString([], {hour12: false})
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className='date text-center flex items-center gap-2'>
      <span className='text-[18px]'>{ctConvertedDate}</span>
      <span id='hour'>{ctConvertedHour}</span>
    </div>
  )
}
export default Clock
