import { useLocation } from "react-router";

export default function TOC() {
  const { pathname } = useLocation();
  const labs = [ 
    { key: "Lab1", num: "1", path: "#/Labs/Lab1" },
    { key: "Lab2", num: "2", path: "#/Labs/Lab2" },
    { key: "Lab3", num: "3", path: "#/Labs/Lab3" },
    { key: "Lab4", num: "4", path: "#/Labs/Lab4" },
    { key: "Lab5", num: "5", path: "#/Labs/Lab5" }
  ]
    return (
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a id="wd-a" href="#/Labs" className="nav-link">
              Labs { pathname }
            </a>
          </li>
          { labs.map((lab) => 
          <li className="nav-item">
            <a id="wd-a1" href= {lab.path}
              className={`nav-link ${pathname.includes(lab.key) ? "active" : ""}`}>
              Lab {lab.num}
            </a>
          </li>)}
          <li className="nav-item">
            <a id="wd-k" href="#/Kanbas" className="nav-link">
              Kanbas
            </a>
          </li>
          <li className="nav-item">
            <a id="wd-github" href="https://github.com/6r3ad/kanbas-react-web-app-cs4550-02-f24" className="nav-link">
              My GitHub
            </a>
          </li>
        </ul>
      );
}