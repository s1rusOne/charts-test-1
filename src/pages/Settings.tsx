import React, { useState } from "react";
import {
    Container,
    Paper,
    Button,
    IconButton,
    Typography,
    Box,
} from "@mui/material";
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from "@mui/icons-material";

import ChartModal from "../components/ChartModal.tsx";
import { ChartData } from "../types";

interface SettingsProps {
    charts: ChartData[];
    onAddChart: (chart: Partial<ChartData>) => void;
    onEditChart: (id: string, chart: Partial<ChartData>) => void;
    onDeleteChart: (id: string) => void;
}

const Settings: React.FC<SettingsProps> = ({
    charts,
    onAddChart,
    onEditChart,
    onDeleteChart,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingChart, setEditingChart] = useState<ChartData | undefined>();

    const handleSave = (chartData: Partial<ChartData>) => {
        if (editingChart) {
            onEditChart(editingChart.id, chartData);
        } else {
            onAddChart(chartData);
        }

        setIsModalOpen(false);
        setEditingChart(undefined);
    };
    return (
        <Container>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => {
                        setEditingChart(undefined);
                        setIsModalOpen(true);
                    }}
                    sx={{ mt: 2 }}
                >
                    Add chart
                </Button>
            </Box>

            {charts.map((chart) => (
                <Paper
                    key={chart.id}
                    sx={{ p: 2, mb: 2, display: "flex", alignItems: "center" }}
                >
                    <Box
                        sx={{
                            width: 20,
                            height: 20,
                            borderRadius: 1,
                            backgroundColor: chart.color,
                            mr: 2,
                        }}
                    />
                    <Typography sx={{ flexGrow: 1 }}>
                        {chart.name} {chart.type}
                    </Typography>
                    <IconButton
                        onClick={() => {
                            setEditingChart(chart);
                            setIsModalOpen(true);
                        }}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        color="error"
                        onClick={() => {
                            onDeleteChart(chart.id);
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Paper>
            ))}

            <ChartModal
                open={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingChart(undefined);
                }}
                onSave={handleSave}
                chart={editingChart}
            />
        </Container>
    );
};

export default Settings;
