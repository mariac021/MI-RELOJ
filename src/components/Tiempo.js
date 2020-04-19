import React from 'react'
import moment from 'moment'

const Tiempo = ({ currentMode, currentTime }) => {
  const [modo] = currentMode
  const [time] = currentTime
  return (
    <>
      <h2 id="timer-label">{modo === 'session' ? 'Sesion' : 'Break'}</h2>
      <h3 id="time-left">{moment(time).format('mm:ss')}</h3>
    </>
  )
}

export default Tiempo
