import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { motion } from 'framer-motion';
import { FaWallet, FaChartLine, FaClock, FaCheckCircle } from 'react-icons/fa';
import SEO from '../components/SEO';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats] = useState({
    totalInvested: 12500,
    totalReturns: 16875,
    activeInvestments: 3,
    totalInvestments: 4
  });

  const recentInvestments = [
    { plan: "Growth Plan", amount: 5000, roi: "20%", date: "2024-01-15", status: "Active" },
    { plan: "Premium Plan", amount: 7500, roi: "35%", date: "2024-01-10", status: "Active" },
  ];

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <SEO 
        title="Investment Dashboard"
        description="Track your agricultural investments, view returns, and manage your portfolio on Track2311's secure investment dashboard. Monitor your farm investment performance in real-time."
        keywords="investment dashboard, track investments, portfolio management, agricultural investments, ROI tracking, Track2311 dashboard"
        robots="noindex, follow"
      />
      
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
            <p className="text-gray-600 mb-8">Here's your investment dashboard</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FaWallet className="text-blue-600 text-2xl" />
                </div>
              </div>
              <h3 className="text-gray-500 text-sm">Total Invested</h3>
              <p className="text-2xl font-bold">${stats.totalInvested.toLocaleString()}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <FaChartLine className="text-green-600 text-2xl" />
                </div>
              </div>
              <h3 className="text-gray-500 text-sm">Expected Returns</h3>
              <p className="text-2xl font-bold">${stats.totalReturns.toLocaleString()}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <FaClock className="text-yellow-600 text-2xl" />
                </div>
              </div>
              <h3 className="text-gray-500 text-sm">Active Investments</h3>
              <p className="text-2xl font-bold">{stats.activeInvestments}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <FaCheckCircle className="text-purple-600 text-2xl" />
                </div>
              </div>
              <h3 className="text-gray-500 text-sm">Total Investments</h3>
              <p className="text-2xl font-bold">{stats.totalInvestments}</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="card p-6"
          >
            <h3 className="text-xl font-semibold mb-4">Recent Investments</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4">Plan</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">ROI</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentInvestments.map((investment, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-3 px-4 font-semibold">{investment.plan}</td>
                      <td className="py-3 px-4">${investment.amount.toLocaleString()}</td>
                      <td className="py-3 px-4 text-green-600">{investment.roi}</td>
                      <td className="py-3 px-4">{investment.date}</td>
                      <td className="py-3 px-4">
                        <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm">
                          {investment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;