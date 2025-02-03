import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    TextField,
    Select,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
} from "@mui/material";
import { ChartData } from "../types";

interface ChartModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (chartData: Partial<ChartData>) => void;
    chart?: ChartData;
}

const ChartModal: React.FC<ChartModalProps> = ({
    open,
    onClose,
    onSave,
    chart,
}) => {
    const [formData, setFormData] = useState<Partial<ChartData>>({
        name: "",
        type: "line",
        color: "#1976d2",
    });

    useEffect(() => {
        if (chart) {
            setFormData(chart);
        }
    }, [chart]);

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{chart ? "Edit chart" : "New chart"}</DialogTitle>
            <DialogContent sx={{ width: 400 }}>
                <TextField
                    fullWidth
                    label="name"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                    sx={{ mt: 2 }}
                />
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Type</InputLabel>
                    <Select
                        value={formData.type}
                        label="Type"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                type: e.target.value as any,
                            })
                        }
                    >
                        <MenuItem value="line">Line</MenuItem>
                        <MenuItem value="spline">Spline</MenuItem>
                        <MenuItem value="area">Area</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    type="color"
                    label="color"
                    value={formData.color}
                    onChange={(e) =>
                        setFormData({ ...formData, color: e.target.value })
                    }
                    sx={{ mt: 2 }}
                ></TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChartModal;
