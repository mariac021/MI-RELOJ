import React, { useState, useEffect, useRef } from 'react'
import { Usos } from '../hooks/Usos'
import Tiempo2 from './Tiempo2'
import Tiempo from './Tiempo'
import Controles from './Controles'
import alarm from '../sounds/alarm.mp3'

const App = () => {
  const [breakVal, setBreakVal] = useState(5)
  const [sessionVal, setSessionVal] = useState(25)
  const [modo, setMode] = useState('session')
  const [time, setTime] = useState(sessionVal * 60 * 1000)
  const [active, setActive] = useState(false)
  const beep = useRef()

  Usos(() => setTime(time - 1000), active ? 1000 : null)

  useEffect(() => {
    setTime(sessionVal * 60 * 1000)
  }, [sessionVal])

  useEffect(() => {
    if (time === 0 && modo === 'session') {
      beep.current.play()
      setMode('break')
      setTime(breakVal * 60 * 1000)
    } else if (time === 0 && modo === 'break') {
      beep.current.play()
      setMode('session')
      setTime(sessionVal * 60 * 1000)
    }
  }, [time, breakVal, sessionVal, modo])

  const handleReset = () => {
    beep.current.pause()
    beep.current.currentTime = 0
    setActive(false)
    setMode('session')
    setBreakVal(5)
    setSessionVal(25)
    setTime(25 * 60 * 1000)
  }

  return (
    <div className="container">
      <header>
        <h1>Reloj Pomodoro</h1>
      </header>
      <main>
        <div className="container-Tiempo">
          <Tiempo currentMode={[modo, setMode]} currentTime={[time, setTime]} />
          <Controles
            activeStatus={[active, setActive]}
            handleReset={handleReset}
          />
        </div>
        <div className="tiempo2">
          <Tiempo2 type={'Descanso'} value={[breakVal, setBreakVal]} />
          <Tiempo2 type={'Sesion'} value={[sessionVal, setSessionVal]} />
        </div>
      </main>
      
      <audio id="beep" src={alarm} ref={beep} />
    </div>
  )
}

export default App
