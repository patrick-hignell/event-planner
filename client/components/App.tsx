import Schedule from './Schedule'

function App() {
  return (
    <div className="flex flex-col justify-center items-center w-screen">
      <header className="header">
        <h1>Event Planner</h1>
      </header>
      <section className="main">
        <Schedule />
      </section>
    </div>
  )
}

export default App
