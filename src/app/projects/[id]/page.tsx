"use client";
import React, { useState } from "react";
import ProjectHeader from "@/app/projects/ProjectHeader";
import Board from "@/app/projects/BoardView"
import List from "../ListView";
import Timeline from "@/app/projects/TimelineView";
import Table from "@/app/projects/TableView";

type Props = {
    params: {id: string};
}

const Project = ({params}: Props) =>{

    const {id} = params;
    const [activeTab,setActiveTab] = useState<string>("Board");
    const [isModalNewTaskOpen,setIsModalNewTaskOpen] = useState<boolean>(false);
    return(
        <div>
            {/* Modal New Tasks */}
            <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === "Board" && (
                <Board id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
            )}
            {activeTab === "List" && (
                <List id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
            )}
            {activeTab === "Timeline" && (
                <Timeline id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
            )}
            {activeTab === "Table" && (
                <Table id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
            )}
        </div>
    )
}


export default Project;