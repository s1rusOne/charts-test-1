import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Paper } from "@mui/material";
import { ChartData } from "../types";

interface ChartComponentProps {
    chartData: ChartData;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ chartData }) => {
    const chartOptions: Highcharts.Options = {
        title: {
            text: chartData.name,
        },
        xAxis: {
            type: "datetime",
            labels: {
                format: "{value:%Y-%m-%d}",
            },
        },
        yAxis: {
            title: {
                text: "value",
            },
        },
        series: [
            {
                name: chartData.name,
                type: chartData.type as any,
                color: chartData.color,
                data: chartData.data.map((point) => [
                    new Date(point.date).getTime(),
                    point.value,
                ]),
            },
        ],
    };

    return (
        <Paper sx={{ p: 2, mb: 2 }}>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </Paper>
    );
};

export default ChartComponent;
