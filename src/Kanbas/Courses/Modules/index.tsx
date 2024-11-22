import { setModules, addModule, editModule, updateModule, deleteModule }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import * as coursesClient from "../client";
import * as modulesClient from "./client";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import ModulesControls from "./ModuleControls";

export default function Modules() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const saveModule = async (module: any) => {
    await modulesClient.updateModule(module);
    dispatch(updateModule(module));
  };
  const removeModule = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };
  const fetchModules = async () => {
  const modules = await coursesClient.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };
  useEffect(() => {
    fetchModules();
  }, []);
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const createModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const module = await coursesClient.createModuleForCourse(cid, newModule);
    dispatch(addModule(module));
  };
  return (
    <ul id="wd-modules" className="d-flex gap-4 mt-5 list-group rounded-0">
      {currentUser.role === "FACULTY" ?
      <ModulesControls setModuleName={setModuleName} moduleName={moduleName} addModule={createModuleForCourse} /> : null }
      {modules.map((module: any) => (
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-top border-black">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {!module.editing && module.name}
              {module.editing && (
                <input className="form-control w-50 d-inline-block"
                  onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveModule({ ...module, editing: false });
                    }
                  }}
                  defaultValue={module.name} />
              )}
              {currentUser.role === "FACULTY" ?
                <ModuleControlButtons moduleId={module._id}
                deleteModule={(moduleId) => removeModule(moduleId)}
                  editModule={(moduleId) => dispatch(editModule(moduleId))} />
                : null}
            </div>
            {module.lessons && (
              <ul className="wd-lessons list-group rounded-0">
                {module.lessons.map((lesson: any) => (
                  <li className="wd-lesson list-group-item p-3 ps-1">
                    {currentUser.role === "FACULTY" ? (<BsGripVertical className="me-2 fs-3" />) : null}
                    {lesson.name}
                    {currentUser.role === "FACULTY" ? (<LessonControlButtons />) : null}
                  </li>
                ))}</ul>)}</li>))}</ul>);
}