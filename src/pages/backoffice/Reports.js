import React, { useState, useEffect } from "react";
import axios from "axios"; // Install using npm install axios
import './Reports.css'; // Optional styling
import BackOffice from "../../components/BackOffice";
import config from "../../config";

const Reports = () => {
    const [data, setData] = useState([]); // Store fetched report data
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state
    const [dateRange, setDateRange] = useState({ start: "", end: "" }); // Date filters

    // Fetch report data from the API
    const fetchReports = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(config.apiPath + '/api/sale/reports', {
                params: {
                    startDate: dateRange.start,
                    endDate: dateRange.end,
                },
            });
            setData(response.data);
        } catch (err) {
            setError("Failed to fetch reports. Please try again later.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Handle date input changes
    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setDateRange((prev) => ({ ...prev, [name]: value }));
    };

    // Trigger report fetch on filter change
    useEffect(() => {
        if (dateRange.start && dateRange.end) {
            fetchReports();
        }
    }, [dateRange]);

    return (
        <BackOffice>
            <div className="reports-page">
                <h1>ตรวจสอบยอดขาย</h1>
                <div className="filters">
                    <label>
                        เริ่มวันที่ :
                        <input
                            type="date"
                            name="start"
                            value={dateRange.start}
                            onChange={handleDateChange}
                        />
                    </label>
                    <label>
                        ถึงวันที่ :
                        <input
                            type="date"
                            name="end"
                            value={dateRange.end}
                            onChange={handleDateChange}
                        />
                    </label>
                    <button onClick={fetchReports} disabled={loading || !dateRange.start || !dateRange.end}>
                        {loading ? "Loading..." : "Generate Report"}
                    </button>
                </div>
                {error && <div className="error">{error}</div>}
                <div className="table-container">
                    {loading ? (
                        <p>Loading reports...</p>
                    ) : (
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>Bill ID</th>
                                    <th>ชื่อลูกค้า</th>
                                    <th>วันที่ชำระเงิน</th>
                                    <th>รายได้รวม</th>
                                    <th>จำนวนสินค้าทั้งหมด</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 ? (
                                    data.map((report) => (
                                        <tr key={report.billId}>
                                            <td>{report.billId}</td>
                                            <td>{report.customerName}</td>
                                            <td>{new Date(report.payDate).toLocaleDateString()}</td>
                                            <td>${report.totalRevenue.toFixed(2)}</td>
                                            <td>{report.totalProducts}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5">ไม่มีข้อมูลสำหรับช่วงวันที่ที่เลือก</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </BackOffice>
    );
};

export default Reports;
