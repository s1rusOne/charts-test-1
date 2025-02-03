import React from "react";
import { Container } from "@mui/material";
import DateRangePicker from "../components/DateRangePicker.tsx";
import ChartComponent from "../components/ChartComponent.tsx";
import { ChartData, DateRange } from "../types";

interface ViewModeProps {
    charts: ChartData[];
    dateRange: DateRange;
    onDateRangeChange: (dateRange: DateRange) => void;
}

const ViewMode: React.FC<ViewModeProps> = ({
    charts,
    dateRange,
    onDateRangeChange,
}) => {
    return (
        <Container>
            {charts.length > 0 && (
                <DateRangePicker
                    dateRange={dateRange}
                    onDateRangeChange={onDateRangeChange}
                />
            )}
            {charts.map((chart) => (
                <ChartComponent key={chart.id} chartData={chart} />
            ))}
        </Container>
    );
};

export default ViewMode;
