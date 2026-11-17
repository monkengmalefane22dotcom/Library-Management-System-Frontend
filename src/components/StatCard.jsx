
function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="stat-card">
      <div className="stat-card-content">
        <div>
          <p>{title}</p>
          <h2>{value}</h2>
        </div>

        <div
          className="stat-card-icon"
          style={{ color: color }}
        >
          {Icon && <Icon size={26} />}
        </div>
      </div>
    </div>
  );
}

export default StatCard;
