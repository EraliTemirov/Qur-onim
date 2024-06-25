import {useState, useEffect} from 'react'

const Clock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className='date text-center'>
      <i className='bi bi-calendar4-week'></i>
      <span>{currentTime.toLocaleDateString()}</span>
      <span>/</span>
      <span id='hour'>{currentTime.toLocaleTimeString()}</span>
    </div>
  )
}

export default Clock
