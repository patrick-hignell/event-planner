import Schedule from './Schedule'

function App() {
  return (
    <div className="text-lg font-['Boogaloo'] flex flex-col lg:p-10">
      <header className="header">
        <div className="flex justify-center">
          <h1 className="pb-10 text-6xl tracking-wide">Event Planner</h1>
        </div>
      </header>
      <section>
        <Schedule />
      </section>
    </div>
  )
}

export default App
