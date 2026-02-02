import { Outlet } from "react-router-dom";
import SideBarTeacher from "../sideBar/SideBarTeacher";
import { useAuth } from "../../hooks/useAuth";
import Header from "../students/Header";
import SideBarStudent from "../sideBar/SideBarStudent";
import { useState } from "react";

const StudentLayout = () => {
  const { user } = useAuth();
  const [testStatusBar, setTestStatusBar] = useState<string | null>(null);

  if (!user || user.role !== "student") return null;

  return (
    <div className="layout">
      <SideBarStudent isExamLocked={testStatusBar === "in_progress"} />
      <div className="container">
        <Header studentName={user.username} />
        <Outlet context={{ setTestStatusBar }} />
      </div>
    </div>
  );
};

export default StudentLayout;