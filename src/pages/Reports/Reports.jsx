import { useState } from "react";
import MonthlySalesChart from "../../components/dashboard/RecentScanActivity";
import BarChartOne from "../../components/charts/bar/BarChartOne";
import BatchWiseChart from "./BatchWiseChart";

export default function Reports() {

    // ---------------- Filter States ----------------
    const [year, setYear] = useState("2026");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [batch, setBatch] = useState("");
    const [course, setCourse] = useState("");

    // ---------------- Dummy Data ----------------
    const monthlyData = [
        { month: "Jan", amount: 15000 },
        { month: "Feb", amount: 22000 },
        { month: "Mar", amount: 18000 },
        { month: "Apr", amount: 25000 },
    ];

    const batchData = [
        { batch: "8th Morning 2026", amount: 45000 },
        { batch: "9th Evening 2026", amount: 38000 },
    ];

    const totalCollection = monthlyData.reduce(
        (sum, item) => sum + item.amount,
        0
    );

    const totalOutstanding = 12000;

    return (
        <div className="space-y-8">

            {/* ---------------- Header ---------------- */}


            {/* ---------------- Filter Card ---------------- */}
            <div className="bg-white p-6 rounded-xl shadow space-y-4">

                <h3 className="text-lg font-semibold">Reports</h3>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

                    {/* Year */}
                    {/* <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="border px-3 py-2 rounded"
                    >
                        <option value="2026">2026</option>
                        <option value="2025">2025</option>
                    </select> */}

                    {/* From Date */}
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="border px-3 py-2 rounded"
                    />

                    {/* To Date */}
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="border px-3 py-2 rounded"
                    />

                    {/* Course */}
                    <select
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        className="border px-3 py-2 rounded"
                    >
                        <option value="">All Courses</option>
                        <option value="8th Standard">8th Standard</option>
                        <option value="9th Standard">9th Standard</option>
                    </select>

                    {/* Batch */}
                    <select
                        value={batch}
                        onChange={(e) => setBatch(e.target.value)}
                        className="border px-3 py-2 rounded"
                    >
                        <option value="">All Batches</option>
                        <option value="8th Morning 2026">
                            8th Morning 2026
                        </option>
                        <option value="9th Evening 2026">
                            9th Evening 2026
                        </option>
                    </select>

                    <button className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Get
                    </button>

                </div>

                {/* <div className="flex justify-end">
                    <button className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Apply Filters
                    </button>
                </div> */}

            </div>

            {/* ---------------- Summary Cards ---------------- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-sm text-gray-500">Total Collection</p>
                    <h3 className="text-2xl font-semibold text-green-600 mt-2">
                        ₹ {totalCollection}
                    </h3>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-sm text-gray-500">Total Outstanding</p>
                    <h3 className="text-2xl font-semibold text-red-600 mt-2">
                        ₹ {totalOutstanding}
                    </h3>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <p className="text-sm text-gray-500">Net Revenue</p>
                    <h3 className="text-2xl font-semibold mt-2">
                        ₹ {totalCollection - totalOutstanding}
                    </h3>
                </div>

            </div>

            {/* ---------------- Monthly Revenue ---------------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MonthlySalesChart />
                <BatchWiseChart />
                {/* <BarChartOne /> */}
                {/* <div className="bg-white p-6 rounded-xl shadow">
                    <h3 className="text-lg font-semibold mb-4">
                        Batch-wise Collection
                    </h3>

                    <div className="space-y-3">
                        {batchData.map((item, index) => (
                            <div
                                key={index}
                                className="flex justify-between border-b pb-2"
                            >
                                <span>{item.batch}</span>
                                <span className="text-blue-600 font-medium">
                                    ₹ {item.amount}
                                </span>
                            </div>
                        ))}
                    </div>
                </div> */}
            </div>


            {/* <div className="space-y-3">
          {monthlyData.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-b pb-2"
            >
              <span>{item.month}</span>
              <span className="text-green-600 font-medium">
                ₹ {item.amount}
              </span>
            </div>
          ))}
        </div> */}


            {/* ---------------- Batch-wise Collection ---------------- */}


        </div>
    );
}