import React from "react";
import { Paper, TextField } from "@mui/material";
import { DateRange } from "../types";

interface DateRangePickerProps {
    dateRange: DateRange;
    onDateRangeChange: (dateRange: DateRange) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
    dateRange,
    onDateRangeChange,
}) => {
    return (
        <Paper sx={{ p: 2, mb: 2, mt: 2, display: "flex", gap: 2 }}>
            <TextField
                type="date"
                label="Start date"
                value={dateRange.startDate}
                onChange={(e) =>
                    onDateRangeChange({
                        ...dateRange,
                        startDate: e.target.value,
                    })
                }
            />
            <TextField
                type="date"
                label="End date"
                value={dateRange.endDate}
                onChange={(e) =>
                    onDateRangeChange({
                        ...dateRange,
                        endDate: e.target.value,
                    })
                }
            />
        </Paper>
    );
};

export default DateRangePicker;
