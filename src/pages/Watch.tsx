import React, {useEffect, useState} from 'react'
import Tahajjud from '../image/Bomdod.svg'
import AsrImage from '../image/sunrise (1) 1.svg'
import PeshinImage from '../image/sun 1.svg'
import BomdodImage from '../image/sunrise 1.svg'
import ShomImage from '../image/sunrise (1) 2.svg'
import XuftonImage from '../image/moon 1.svg'
import Clock from '../components/Clock'
import '../App.css'
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
  const [weeklyTimes, setWeeklyTimes] = useState<any[]>([])
  const [showWeekly, setShowWeekly] = useState<boolean>(false)

  const fetchData = async (region: string) => {
    const response = await fetch(`https://islomapi.uz/api/present/day?region=${region}`)
    const data = await response.json()
    setTimes(data.times)
  }

  const fetchWeeklyData = async (region: string) => {
    const response = await fetch(`https://islomapi.uz/api/present/week?region=${region}`)
    const data = await response.json()
    setWeeklyTimes(data)
  }

  useEffect(() => {
    fetchData(selectedRegion)
    fetchWeeklyData(selectedRegion)
  }, [selectedRegion])

  return (
    <div>
      <Navbar />
      <div className='App w-[90%] m-auto'>
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
          <Clock />
        </div>
        <div className='card-wrapper d-flex flex-wrap justify-content-center'>
          {times && (
            <div className='flex gap-2 justify-between'>
              <div className='cards'>
                <h4>Tong</h4>
                <img src={Tahajjud} alt='Tahajjud' />
                <h4 className='time'>{times.tong_saharlik}</h4>
              </div>
              <div className='cards'>
                <h4>Quyosh</h4>
                <img src={BomdodImage} alt='Bomdod' />
                <h4 className='time'>{times.quyosh}</h4>
              </div>
              <div className='cards'>
                <h4>Peshin</h4>
                <img src={PeshinImage} alt='Peshin' />
                <h4 className='time'>{times.peshin}</h4>
              </div>
              <div className='cards'>
                <h4>Asr</h4>
                <img src={AsrImage} alt='Asr' />
                <h4 className='time'>{times.asr}</h4>
              </div>
              <div className='cards'>
                <h4>Shom</h4>
                <img src={ShomImage} alt='Shom' />
                <h4 className='time'>{times.shom_iftor}</h4>
              </div>
              <div className='cards'>
                <h4>Xufton</h4>
                <img src={XuftonImage} alt='Xufton' />
                <h4 className='time'>{times.hufton}</h4>
              </div>
            </div>
          )}
        </div>
        <button
          className='btn btn-light text-primary week-show'
          onClick={() => setShowWeekly(!showWeekly)}
        >
          {showWeekly ? 'Kunlik vaqtni ko`rish' : 'Haftalik vaqtni ko`rish'}
        </button>
        {showWeekly && (
          <div className='week-wrapper w-75 mx-auto bg-light'>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>Hafta kuni</th>
                  <th>Sana</th>
                  <th>Tong</th>
                  <th>Quyosh</th>
                  <th>Peshin</th>
                  <th>Asr</th>
                  <th>Shom</th>
                  <th>Xufton</th>
                </tr>
              </thead>
              <tbody>
                {weeklyTimes.map((day, index) => (
                  <tr
                    key={index}
                    className={new Date(day.date).getDate() === new Date().getDate() ? 'today' : ''}
                  >
                    <td>{day.weekday}</td>
                    <td>{day.date.substring(0, 10)}</td>
                    <td>{day.times.tong_saharlik}</td>
                    <td>{day.times.quyosh}</td>
                    <td>{day.times.peshin}</td>
                    <td>{day.times.asr}</td>
                    <td>{day.times.shom_iftor}</td>
                    <td>{day.times.hufton}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer className={''} />
    </div>
  )
}

export default Watch
