import React, {useEffect, useState} from 'react'
import Tahajjud from '../image/Bomdod.svg'
import AsrImage from '../image/sunrise (1) 1.svg'
import PeshinImage from '../image/sun 1.svg'
import BomdodImage from '../image/sunrise 1.svg'
import ShomImage from '../image/sunrise (1) 2.svg'
import XuftonImage from '../image/moon 1.svg'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export interface Times {
  tong_saharlik: string
  quyosh: string
  peshin: string
  asr: string
  shom_iftor: string
  hufton: string
}

const regions = [
  'Andijon',
  'Buxoro',
  "Farg'ona",
  'Jizzax',
  'Namangan',
  'Navoiy',
  'Samarqand',
  'Toshkent',
]

const Watch: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('Toshkent')
  const [times, setTimes] = useState<Times | null>(null)
  const [currentTime, setCurrentTime] = useState<Date>(new Date())
  const ctConverted = currentTime.toLocaleTimeString([], {hour12: false})

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const fetchData = async (region: string) => {
    const response = await fetch(`https://islomapi.uz/api/present/day?region=${region}`)
    const data = await response.json()
    console.log(data)

    setTimes(data.times)
  }

  const fetchWeeklyData = async (region: string) => {
    const response = await fetch(`https://islomapi.uz/api/present/week?region=${region}`)
    const data = await response.json()
    // setWeeklyTimes(data)
  }

  useEffect(() => {
    fetchData(selectedRegion)
    fetchWeeklyData(selectedRegion)
  }, [selectedRegion])

  function check(pre: string | undefined, next: string | undefined) {
    if (pre && next) {
      if (pre <= ctConverted && ctConverted <= next) {
        return 'cards w-[280px] bg-gray-300'
      }
    }
    return 'cards'
  }

  const prayerTimes = times
    ? [
        {name: 'Tong', time: times.tong_saharlik, image: Tahajjud, next: times.quyosh},
        {name: 'Quyosh', time: times.quyosh, image: BomdodImage, next: times.peshin},
        {name: 'Peshin', time: times.peshin, image: PeshinImage, next: times.asr},
        {name: 'Asr', time: times.asr, image: AsrImage, next: times.shom_iftor},
        {name: 'Shom', time: times.shom_iftor, image: ShomImage, next: times.hufton},
        {name: 'Xufton', time: times.hufton, image: XuftonImage, next: times.tong_saharlik},
      ]
    : []

  return (
    <div className='all'>
      <Navbar />
      <div className='App w-[90%] m-auto mb-20 mt-12'>
        <div className='select flex justify-center gap-2'>
          <h4>Hududni tanlang:</h4>
          <select
            className='form-select p-1'
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            {regions.sort().map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
        <div className='mintaqa flex'>
          <h4 className='text-center'>
            Mintaqa: <span className='min'>{selectedRegion}</span>
          </h4>
          <div className='date text-center flex items-center gap-2'>
            <span className='text-[18px]'>{currentTime.toLocaleDateString()}</span>
            <span id='hour'>{ctConverted}</span>
          </div>
        </div>
        <div className='card-wrapper'>
          {prayerTimes.length > 0 && (
            <div className='flex flex-wrap gap-4 justify-center'>
              {prayerTimes.map((prayer, index) => (
                <div key={index} className={check(prayer.time, prayer.next)}>
                  <h4>{prayer.name}</h4>
                  <img src={prayer.image} alt={prayer.name} />
                  <h4 className='time'>{prayer.time}</h4>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer className={' '} />
    </div>
  )
}

export default Watch
