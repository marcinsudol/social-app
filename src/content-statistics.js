import "./content-statistics.scss";

export default function ContentStatistics({ statsList, background }) {
  return (
    <ul className="content-statistics">
      {statsList.map((stat, index) => (
        <li key={index} className={"background-" + background}>
          {stat}
        </li>
      ))}
    </ul>
  );
}
