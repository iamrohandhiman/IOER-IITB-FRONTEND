import React, { useEffect, useState, useMemo } from "react";
import { Navbar } from "../Components/Navbar";
import { Chart } from "../Components/Chart";
import green from "../assets/green.png";
import cube from "../assets/Cube.png";
import info from "../assets/Info.png";
import boat from "../assets/Boat.png";
import severity from "../assets/Severity.png";

export const Home = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/org/detailed/info", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
        console.log("User Data:", data);
      } catch (err) {
        console.error("Error fetching user data:", err.message);
      }
    };

    const fetchShipments = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("http://localhost:4000/api/v1/org/shipments", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch shipments");
        }

        const data = await response.json();
        setShipments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchShipments();
  }, []);

  // Use useMemo to calculate derived data only when shipments change
  const exportCounts = useMemo(() => {
    const countExportsByCountry = (shipmentData) => {
      const countryExportMap = new Map();

      shipmentData.forEach((shipment) => {
        const destinationCountry = shipment.destinationAddress.country;
        const totalItems = shipment.boxes.reduce(
          (sum, box) => sum + box.items.length,
          0
        );

        countryExportMap.set(
          destinationCountry,
          (countryExportMap.get(destinationCountry) || 0) + totalItems
        );
      });

      return Array.from(countryExportMap, ([name, value]) => ({ name, value }));
    };
    
    return countExportsByCountry(shipments);
  }, [shipments]);

  // Calculate statistics with useMemo too
  const statistics = useMemo(() => {
    const totalShipments = shipments.length;
    const compliantShipments = shipments.filter(
      (s) => s.status === "compliant"
    ).length;
    const problematicShipments = shipments.filter(
      (s) => s.status !== "compliant"
    ).length;
    const totalItems = shipments.reduce(
      (sum, shipment) =>
        sum + shipment.boxes.reduce((boxSum, box) => boxSum + box.items.length, 0),
      0
    );

    return {
      totalShipments,
      compliantShipments,
      problematicShipments,
      totalItems
    };
  }, [shipments]);

  return (
    <div className="w-full min-h-screen flex flex-col bg-white font-mono">
      <Navbar />
      <div className="h-[50px] w-screen bg-blue-400 mt-[60px] rounded-b-4xl"></div>

      <div className="flex justify-center items-center">
        <div className="border-1 border-gray-300 shadow-xs w-19/20 flex justify-start items-center pt-1 mt-1 rounded-t-3xl">
          <div className="h-10 m-3 px-4 flex items-center justify-between border-1 border-gray-300 shadow-xs rounded-2xl">
            <div className="h-4 w-4 rounded-full bg-blue-100 mr-1"></div> {userData?.data?.organizationName}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center px-10 font-extrabold text-2xl p-5 mx-[38px] border-l-1 border-r-1 border-gray-200">
        <div className="flex justify-center items-center border-l-8 border-gray-200">
          <img src={boat} className="h-10 px-3" alt="boat icon" /> Shipments
        </div>
        <div className="flex justify-center items-center font-light text-lg pr-[210px] border-l-8 border-gray-200">
          <img src={severity} className="h-8 px-3" alt="severity icon" /> Country Wise Item Export
        </div>
      </div>

      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-lg text-red-600">{error}</p>
      ) : (
        <div className="flex justify-between px-14 items-start mx-[38px] pt-2 border border-gray-300">
          <div className="max-h-[400px] overflow-y-auto overflow-x-auto rounded-t-md border-gray-300">
            <table className="border-collapse border border-gray-300 w-full">
              <thead>
                <tr>
                  <th className="border-t border-l border-b border-gray-300 px-4 py-2">Container</th>
                  <th className="border-t border-b border-gray-300 px-4 py-2">Shipment ID</th>
                  <th className="border-t border-b border-gray-300 px-4 py-2">Source</th>
                  <th className="border-t border-b border-gray-300 px-4 py-2">Destination</th>
                  <th className="border-t border-b border-gray-300 px-4 py-2">Total Items</th>
                  <th className="border-t border-b border-gray-300 px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody className="bg-gray-50">
                {shipments.map((shipment) => (
                  <tr key={shipment._id} className="hover:bg-gray-200 transition duration-500 cursor-pointer">
                    <td className="text-center border-t border-b border-gray-300">
                      <img src={cube} alt="cube icon" className="h-[40px] pl-[30px]" />
                    </td>
                    <td className="border-t border-b border-gray-300 px-4 text-center">{shipment._id}</td>
                    <td className="border-t border-b border-gray-300 px-4 text-center">{shipment.sourceAddress.country}</td>
                    <td className="border-t border-b border-gray-300 px-4 text-center">{shipment.destinationAddress.country}</td>
                    <td className="border-t border-b border-gray-300 px-4 text-center">
                      {shipment.boxes.reduce((total, box) => total + box.items.length, 0)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {shipment.status === "compliant" ? (
                        <img src={green} className="h-[30px]" alt="compliant status" />
                      ) : (
                        <img src={info} className="h-[30px]" alt="problematic status" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col items-center ml-8">
            <Chart shipments={exportCounts} />
            <div className="grid grid-cols-2 gap-6 mt-6 text-center">
              <div className="p-4 shadow-lg rounded-lg bg-blue-100">
                <h3 className="text-lg font-bold text-gray-700">Total Shipments</h3>
                <p className="text-3xl font-extrabold text-blue-600">{statistics.totalShipments}</p>
              </div>
              <div className="p-4 shadow-lg rounded-lg bg-green-100">
                <h3 className="text-lg font-bold text-gray-700">Compliant Shipments</h3>
                <p className="text-3xl font-extrabold text-green-600">{statistics.compliantShipments}</p>
              </div>
              <div className="p-4 shadow-lg rounded-lg bg-red-100">
                <h3 className="text-lg font-bold text-gray-700">Problematic Shipments</h3>
                <p className="text-3xl font-extrabold text-red-600">{statistics.problematicShipments}</p>
              </div>
              <div className="p-4 shadow-lg rounded-lg bg-purple-100">
                <h3 className="text-lg font-bold text-gray-700">Total Items</h3>
                <p className="text-3xl font-extrabold text-purple-600">{statistics.totalItems}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;