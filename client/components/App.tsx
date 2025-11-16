import Schedule from './Schedule'

function App() {
  return (
    <div className="text-lg font-['Boogaloo'] flex flex-col items-center w-screen p-10 bg-violet-200">
      <header className="header">
        <h1 className="pb-10 text-6xl tracking-wide">Event Planner</h1>
      </header>
      <section className="main">
        <Schedule />
      </section>
    </div>
  )
}

export default App
