import React from 'react'
import { UserData } from "./Data"
import { Chart as ChartJS } from "chart.js/auto";
import { Pie, Bar, Bubble, Doughnut, Line, PolarArea, Radar, Scatter } from "react-chartjs-2";

export default function Graph() {
    const dataForGained = {
        labels: UserData.map((ele) => ele.year),
        datasets: [
            {
                label: 'User Gained',
                data: UserData.map((ele) => ele.userGain),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
            }
        ]
    }
    const dataForLoss = {
        labels: UserData.map((ele) => ele.year),
        datasets: [
            {
                label: 'User Lost',
                data: UserData.map((ele) => ele.userLost),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
            }
        ]
    }

    return (
        <>
            <h3>Chart.js</h3>
            <div className="container">
                <div className="d-flex flex-row justify-content-between">
                    <Bar data={dataForGained} />
                    <Bar data={dataForLoss} />
                </div>
            </div>
            <div className="container mt-5">
                <div className="d-flex flex-row justify-content-between">
                    <Pie data={dataForGained} />
                    <Pie data={dataForLoss} />
                </div>
            </div>
            <div className="container mt-5">
                <div className="d-flex flex-row justify-content-between">
                    <Bubble data={dataForGained} />
                    <Bubble data={dataForLoss} />
                </div>
            </div>
            <div className="container mt-5">
                <div className="d-flex flex-row justify-content-between">
                    <Doughnut data={dataForGained} />
                    <Doughnut data={dataForLoss} />
                </div>
            </div>
            <div className="container mt-5">
                <div className="d-flex flex-row justify-content-between">
                    <Line data={dataForGained} />
                    <Line data={dataForLoss} />
                </div>
            </div>
            <div className="container mt-5">
                <div className="d-flex flex-row justify-content-between">
                    <PolarArea data={dataForGained} />
                    <PolarArea data={dataForLoss} />
                </div>
            </div>
            <div className="container mt-5">
                <div className="d-flex flex-row justify-content-between">
                    <Radar data={dataForGained} />
                    <Radar data={dataForLoss} />
                </div>
            </div>
            <div className="container my-5">
                <div className="d-flex flex-row justify-content-between">
                    <Scatter data={dataForGained} />
                    <Scatter data={dataForLoss} />
                </div>
            </div>
        </>
    )
}
