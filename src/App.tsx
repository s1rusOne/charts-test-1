import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header.tsx";
import Settings from "./pages/Settings.tsx";
import { ChartData, DateRange, DataPoint } from "./types/index.ts";
import ViewMode from "./pages/ViewMode.tsx";

const App: React.FC = () => {
    const [charts, setCharts] = useState<ChartData[]>([]);

    const [dateRange, setDateRange] = useState<DateRange>({
        startDate: new Date(new Date().setMonth(new Date().getMonth() - 1))
            .toISOString()
            .split("T")[0],
        endDate: new Date(new Date()).toISOString().split("T")[0],
    });

    const generateRandomData = (startDate: string, endDate: string) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const data: DataPoint[] = [];

        for (
            let date = new Date(start);
            date <= end;
            date.setDate(date.getDate() + 1)
        ) {
            data.push({
                date: date.toISOString().split("T")[0],
                value: Math.random() * 100,
            });
        }

        return data;
    };

    const handleAddChart = (chartData: Partial<ChartData>) => {
        const newChart: ChartData = {
            id: Date.now().toString(),
            name: chartData.name || "New char",
            type: chartData.type || "line",
            color: chartData.color || "#1976d2",
            data: generateRandomData(dateRange.startDate, dateRange.endDate),
        };
        setCharts([...charts, newChart]);
    };

    const handleEditChart = (id: string, chartData: Partial<ChartData>) => {
        setCharts(
            charts.map((chart) =>
                chart.id === id ? { ...chart, ...chartData } : chart
            )
        );
    };

    const handleDeleteChart = (id: string) => {
        setCharts(charts.filter((chart) => chart.id !== id));
    };

    const handleDateRangeChange = (newDateRange: DateRange) => {
        setDateRange(newDateRange);
        setCharts(
            charts.map((chart) => ({
                ...chart,
                data: generateRandomData(
                    newDateRange.startDate,
                    newDateRange.endDate
                ),
            }))
        );
    };

    return (
        <div className="App">
            <Router>
                <div>
                    <Header />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <ViewMode
                                    charts={charts}
                                    dateRange={dateRange}
                                    onDateRangeChange={handleDateRangeChange}
                                />
                            }
                        />
                        <Route
                            path="/settings"
                            element={
                                <Settings
                                    charts={charts}
                                    onAddChart={handleAddChart}
                                    onEditChart={handleEditChart}
                                    onDeleteChart={handleDeleteChart}
                                />
                            }
                        />
                    </Routes>
                </div>
            </Router>
        </div>
    );
};

export default App;
