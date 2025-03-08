import React from "react";
import { ChevronDown, MoreHorizontal, AlertTriangle, CheckCircle, Clock, FileText, AlertCircle } from "lucide-react";

export const ShipmentTable = () => {
  // Sample shipment data
  const shipments = [
    {
      id: "#12345",
      destination: "USA",
      value: "$500",
      status: "Compliant",
      statusType: "success",
      issues: "-",
      actions: ["View"]
    },
    {
      id: "#12346",
      destination: "Germany",
      value: "$5,000",
      status: "Flagged",
      statusType: "error",
      issues: "Value exceeds threshold",
      actions: ["Resolve"]
    },
    {
      id: "#12347",
      destination: "China",
      value: "-",
      status: "Pending",
      statusType: "warning",
      issues: "Restricted Item",
      actions: ["Review"]
    },
    {
      id: "#12348",
      destination: "Canada",
      value: "$1,200",
      status: "Compliant",
      statusType: "success",
      issues: "-",
      actions: ["View"]
    },
    {
      id: "#12349",
      destination: "Mexico",
      value: "$750",
      status: "Delayed",
      statusType: "warning",
      issues: "Missing documentation",
      actions: ["Resolve"]
    }
  ];

  // Status badge component with shadcn styling
  const StatusBadge = ({ type, text }) => {
    const styles = {
      success: "bg-emerald-50 text-emerald-700 border-emerald-100",
      error: "bg-red-50 text-red-700 border-red-100",
      warning: "bg-amber-50 text-amber-700 border-amber-100"
    };

    const icons = {
      success: <CheckCircle className="w-3 h-3 mr-1" />,
      error: <AlertCircle className="w-3 h-3 mr-1" />,
      warning: <Clock className="w-3 h-3 mr-1" />
    };

    return (
      <div className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${styles[type]}`}>
        {icons[type]} {text}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* MacBook-style frame */}
      <div className="rounded-xl overflow-hidden border border-gray-200 shadow-xl bg-gray-800">
        {/* MacBook top bar */}
        <div className="bg-gray-800 px-4 py-2 flex items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-gray-400 text-xs mx-auto">Shipment Monitoring System</div>
        </div>
        
        {/* Content container with MacBook style screen */}
        <div className="bg-gray-50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              Real-Time Shipment Status
            </h2>
            <div className="flex items-center space-x-2">
              <button className="inline-flex items-center justify-center text-sm font-medium h-9 px-4 py-2 rounded-md border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50">
                Export
              </button>
              <button className="inline-flex items-center justify-center text-sm font-medium h-9 px-4 py-2 rounded-md bg-black text-white shadow-sm hover:bg-gray-800">
                + New Shipment
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-md border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Shipment ID
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Destination
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Issues
                    </th>
                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {shipments.map((shipment, index) => (
                    <tr 
                      key={shipment.id} 
                      className={`hover:bg-gray-50 ${index !== shipments.length - 1 ? 'border-b border-gray-100' : ''}`}
                    >
                      <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-700">
                        {shipment.id}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                        {shipment.destination}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                        {shipment.value}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <StatusBadge type={shipment.statusType} text={shipment.status} />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                        {shipment.issues}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        <button className="inline-flex items-center justify-center h-8 w-8 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Table footer with pagination - shadcn style */}
            <div className="border-t border-gray-100 px-4 py-2 flex items-center justify-between">
              <div className="text-xs text-gray-500">
                Showing 5 of 24 shipments
              </div>
              <div className="flex items-center space-x-2">
                <button className="inline-flex items-center justify-center h-8 w-8 rounded-md border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">
                  <ChevronDown className="w-4 h-4 rotate-90" />
                </button>
                <button className="inline-flex items-center justify-center h-8 w-8 rounded-md border border-gray-200 bg-black text-white">
                  1
                </button>
                <button className="inline-flex items-center justify-center h-8 w-8 rounded-md border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">
                  2
                </button>
                <button className="inline-flex items-center justify-center h-8 w-8 rounded-md border border-gray-200 bg-white text-gray-600 hover:bg-gray-50">
                  <ChevronDown className="w-4 h-4 -rotate-90" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};