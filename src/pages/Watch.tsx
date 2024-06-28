import React, {useEffect, useState} from 'react'
import Tahajjud from '../image/Bomdod.svg'
import AsrImage from '../image/sunrise (1) 1.svg'
import PeshinImage from '../image/sun 1.svg'
import BomdodImage from '../image/sunrise 1.svg'
import ShomImage from '../image/sunrise (1) 2.svg'
import XuftonImage from '../image/moon 1.svg'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
// import Clock from '../components/Clock'

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
        return 'cards w-[280px] bg-gray-400'
      }
    }
    return 'cards'
  }

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
          {/* <Clock /> */}
        </div>
        <div className='card-wrapper'>
          {times && (
            <div className='flex flex-wrap gap-4 justify-center'>
              <div className={check(times?.hufton, times?.tong_saharlik)}>
                <h4>Tong</h4>
                <img src={Tahajjud} alt='Tahajjud' />
                <h4 className='time'>{times.tong_saharlik}</h4>
              </div>
              <div className={check(times?.tong_saharlik, times?.quyosh)}>
                <h4>Quyosh</h4>
                <img src={BomdodImage} alt='Bomdod' />
                <h4 className='time'>{times.quyosh}</h4>
              </div>
              <div className={check(times?.quyosh, times?.peshin)}>
                <h4>Peshin</h4>
                <img src={PeshinImage} alt='Peshin' />
                <h4 className='time'>{times.peshin}</h4>
              </div>
              <div className={check(times?.peshin, times?.asr)}>
                <h4>Asr</h4>
                <img src={AsrImage} alt='Asr' />
                <h4 className='time'>{times.asr}</h4>
              </div>
              <div className={check(times?.asr, times?.shom_iftor)}>
                <h4>Shom</h4>
                <img src={ShomImage} alt='Shom' />
                <h4 className='time'>{times.shom_iftor}</h4>
              </div>
              <div className={check(times?.shom_iftor, times?.hufton)}>
                <h4>Xufton</h4>
                <img src={XuftonImage} alt='Xufton' />
                <h4 className='time'>{times.hufton}</h4>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer className={' '} />
    </div>
  )
}

export default Watch
