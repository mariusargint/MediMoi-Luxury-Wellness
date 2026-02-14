
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, CreditCard, Clock, Download, ArrowUpRight, Search } from 'lucide-react';
import { formatCurrency } from '../../lib/payments';
import { Transaction } from '../../types';

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'tx1', bookingId: 'bk-502', date: '2024-06-18', clientName: 'Eleanor Vance', clinicName: 'Mayfair Wellness', totalAmount: 140, depositAmount: 28, status: 'completed' },
  { id: 'tx2', bookingId: 'bk-503', date: '2024-06-18', clientName: 'James Sterling', clinicName: 'Chelsea Ritual Lab', totalAmount: 80, depositAmount: 16, status: 'completed' },
  { id: 'tx3', bookingId: 'bk-504', date: '2024-06-17', clientName: 'Olivia Thorne', clinicName: 'The Recovery Lounge', totalAmount: 120, depositAmount: 24, status: 'completed' },
  { id: 'tx4', bookingId: 'bk-505', date: '2024-06-17', clientName: 'Julian Thorne', clinicName: 'Mayfair Wellness', totalAmount: 200, depositAmount: 40, status: 'pending' },
];

const AdminFinance: React.FC = () => {
  const stats = [
    { label: 'Gross Volume', value: formatCurrency(92250), icon: TrendingUp, trend: '+14%' },
    { label: 'Medimoi Revenue (20%)', value: formatCurrency(18450), icon: CreditCard, trend: '+12%', highlight: true },
    { label: 'Pending Payouts', value: formatCurrency(4200), icon: Clock, trend: 'Due Friday' },
  ];

  return (
    <div className="flex-1 p-12 overflow-y-auto no-scrollbar bg-medimoi-bg">
      <header className="mb-16 flex justify-between items-end">
        <div>
          <h1 className="font-serif text-5xl italic mb-4">Financial Ledger.</h1>
          <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-400">Commission tracking & platform performance</p>
        </div>
        <button className="flex items-center space-x-3 text-[10px] uppercase tracking-widest font-bold border border-medimoi-black px-6 py-3 hover:bg-medimoi-black hover:text-white transition-all">
          <Download size={14} />
          <span>Export Report</span>
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {stats.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label} 
            className={`p-10 border border-medimoi-black/5 ${stat.highlight ? 'bg-medimoi-black text-white' : 'bg-white'}`}
          >
            <stat.icon className={`${stat.highlight ? 'text-medimoi-gold' : 'text-neutral-300'} mb-8`} size={24} />
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-2">{stat.label}</p>
            <div className="flex items-baseline space-x-4">
              <p className="font-serif text-4xl">{stat.value}</p>
              <span className={`text-[10px] font-bold tracking-widest ${stat.highlight ? 'text-medimoi-gold' : 'text-green-600'}`}>
                {stat.trend}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart Placeholder */}
      <section className="bg-white border border-medimoi-black/5 p-10 mb-16">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-serif text-2xl italic">Monthly Performance</h2>
          <div className="flex space-x-4">
            {['Weekly', 'Monthly', 'Yearly'].map(t => (
              <button key={t} className={`text-[9px] uppercase tracking-widest font-bold ${t === 'Monthly' ? 'text-medimoi-gold border-b border-medimoi-gold' : 'text-neutral-300'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="h-48 flex items-end justify-between px-4">
          {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 95, 100].map((h, i) => (
            <motion.div 
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: i * 0.05, duration: 1 }}
              className="w-8 bg-medimoi-bg border-t-2 border-medimoi-gold relative group"
            >
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-medimoi-black text-white px-2 py-1 text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">
                £{h * 100}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-between mt-6 px-4">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
            <span key={m} className="text-[9px] uppercase tracking-widest text-neutral-300">{m}</span>
          ))}
        </div>
      </section>

      {/* Transactions Table */}
      <section className="bg-white border border-medimoi-black/5 p-10">
        <div className="flex items-center justify-between mb-10 border-b border-neutral-100 pb-8">
          <h2 className="font-serif text-3xl italic">Recent Transactions</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-neutral-100 px-4 py-2 bg-neutral-50/50">
              <Search size={14} className="text-neutral-300 mr-3" />
              <input type="text" placeholder="FILTER BY CLINIC..." className="bg-transparent text-[9px] uppercase tracking-widest focus:outline-none w-48" />
            </div>
          </div>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-neutral-100">
              <th className="pb-6 text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">Date</th>
              <th className="pb-6 text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">Client</th>
              <th className="pb-6 text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">Clinic</th>
              <th className="pb-6 text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">Total</th>
              <th className="pb-6 text-[10px] uppercase tracking-[0.2em] text-medimoi-gold font-bold">Medimoi Fee (20%)</th>
              <th className="pb-6 text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-50">
            {MOCK_TRANSACTIONS.map((tx) => (
              <tr key={tx.id} className="group hover:bg-neutral-50/50 transition-colors">
                <td className="py-6 text-[11px] tracking-widest">{tx.date}</td>
                <td className="py-6 text-[11px] font-bold uppercase tracking-widest">{tx.clientName}</td>
                <td className="py-6 text-[11px] uppercase tracking-widest italic text-neutral-500">{tx.clinicName}</td>
                <td className="py-6 text-[12px] font-serif">{formatCurrency(tx.totalAmount)}</td>
                <td className="py-6 text-[12px] font-serif font-bold text-green-600">{formatCurrency(tx.depositAmount)}</td>
                <td className="py-6 text-right">
                  <span className={`text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-none border ${
                    tx.status === 'completed' ? 'text-green-600 border-green-100 bg-green-50/30' : 'text-amber-600 border-amber-100 bg-amber-50/30'
                  }`}>
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminFinance;
