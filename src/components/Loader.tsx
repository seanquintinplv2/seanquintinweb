interface LoaderProps {
  active: boolean
}

const Loader = ({ active }: LoaderProps) => (
  <div className={`loader-overlay ${active ? 'loader-active' : 'loader-hidden'}`} aria-hidden={!active}>
    <div className="loader-background">
      <div className="loader-horizon" />
      <div className="loader-grid-lines" />
      <div className="loader-spark spark-1" />
      <div className="loader-spark spark-2" />
      <div className="loader-spark spark-3" />
    </div>

    <div className="loader-center">
      <span className="loader-status">LOADING...</span>
      <div className="progress-track">
        <span className="progress-bar" />
      </div>
    </div>
  </div>
)

export default Loader
