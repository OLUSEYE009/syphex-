import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, MessageSquare, ShieldCheck, AlertTriangle, Clock } from 'lucide-react';

const FAQS = [
  {q: 'How do I track my order?', a: 'Go to the Order Tracking section and enter your order ID.'},
  {q: 'Can I reschedule my test drive?', a: 'Yes, use the test drive reminder section to pick a new slot.'},
  {q: 'How long does complaint resolution take?', a: 'This is a demo; real support response time depends on your dealership.'},
  {q: 'Is this system production-ready?', a: 'No, this is a demo implementation with mock workflows.'},
];

const ORDER_STATUSES: Record<string, string> = {
  'SPX123': 'Processing',
  'SPX456': 'In Transit',
  'SPX789': 'Delivered',
};

const SupportPage = () => {
  const [orderId, setOrderId] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [complaintText, setComplaintText] = useState('');
  const [complaintFeedback, setComplaintFeedback] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [reminderSet, setReminderSet] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{sender: 'user'|'agent'; message: string}[]>([]);

  useEffect(() => {
    try {
      const supportState = localStorage.getItem('syphex-support-state');
      if (supportState) {
        const saved = JSON.parse(supportState);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOrderId(saved.orderId || '');
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOrderStatus(saved.orderStatus || '');
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setComplaintText(saved.complaintText || '');
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setComplaintFeedback(saved.complaintFeedback || '');
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setReminderDate(saved.reminderDate || '');
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setReminderTime(saved.reminderTime || '');
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setReminderSet(saved.reminderSet || false);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setChatHistory(saved.chatHistory || []);
      }
    } catch (error) {
      console.warn('Failed to load support state from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    const stateToSave = {
      orderId,
      orderStatus,
      complaintText,
      complaintFeedback,
      reminderDate,
      reminderTime,
      reminderSet,
      chatHistory,
    };
    localStorage.setItem('syphex-support-state', JSON.stringify(stateToSave));
  }, [orderId, orderStatus, complaintText, complaintFeedback, reminderDate, reminderTime, reminderSet, chatHistory]);

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) {
      setOrderStatus('Please enter a valid order ID.');
      return;
    }
    const status = ORDER_STATUSES[orderId.toUpperCase()] || 'Order not found (demo).';
    setOrderStatus(`Order ${orderId.toUpperCase()}: ${status}`);
  };

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintText.trim()) {
      setComplaintFeedback('Please describe your complaint before submitting.');
      return;
    }
    setComplaintFeedback('Your complaint has been submitted (demo). Support will reach out via email in 24h.');
    setComplaintText('');
  };

  const handleSetReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reminderDate || !reminderTime) {
      return;
    }
    setReminderSet(true);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMessage = chatInput.trim();
    setChatHistory(prev => [...prev, { sender: 'user', message: userMessage }]);
    setChatInput('');
    setTimeout(() => {
      setChatHistory(prev => [...prev, { sender: 'agent', message: `Demo response: we received your message: "${userMessage}"` }]);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#0f1117] text-white">
      <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Support Center (Demo)</h1>
            <p className="text-gray-400 mt-2">Order tracking, complaints, reminders, chat and FAQ support for demo purposes.</p>
          </div>
          <Link to="/" className="text-[#3b82f6] hover:text-white">Back to Home</Link>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <section className="bg-[#121625] rounded-2xl p-6 border border-[#1f2837]">
            <div className="flex items-center space-x-2 mb-4">
              <ShieldCheck className="w-5 h-5 text-[#3b82f6]" />
              <h2 className="text-xl font-semibold">Order Tracking</h2>
            </div>
            <form onSubmit={handleTrackOrder} className="space-y-3">
              <input
                value={orderId}
                onChange={e => setOrderId(e.target.value)}
                placeholder="Enter order ID (e.g. SPX123)"
                className="w-full bg-[#1e2330] border border-[#3b82f6]/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#3b82f6]"
              />
              <button type="submit" className="w-full bg-[#3b82f6] text-black py-2 rounded-lg font-semibold">Track Order</button>
            </form>
            {orderStatus && <p className="mt-3 text-sm text-gray-300">{orderStatus}</p>}
          </section>

          <section className="bg-[#121625] rounded-2xl p-6 border border-[#1f2837]">
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-[#3b82f6]" />
              <h2 className="text-xl font-semibold">Complaints</h2>
            </div>
            <form onSubmit={handleComplaintSubmit} className="space-y-3">
              <textarea
                value={complaintText}
                onChange={e => setComplaintText(e.target.value)}
                placeholder="Describe your issue..."
                rows={4}
                className="w-full bg-[#1e2330] border border-[#3b82f6]/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#3b82f6]"
              />
              <button type="submit" className="w-full bg-[#3b82f6] text-black py-2 rounded-lg font-semibold">Submit Complaint</button>
            </form>
            {complaintFeedback && <p className="mt-3 text-sm text-gray-300">{complaintFeedback}</p>}
          </section>

          <section className="bg-[#121625] rounded-2xl p-6 border border-[#1f2837]">
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="w-5 h-5 text-[#3b82f6]" />
              <h2 className="text-xl font-semibold">Test Drive Reminder</h2>
            </div>
            <form onSubmit={handleSetReminder} className="space-y-3">
              <input
                value={reminderDate}
                onChange={e => setReminderDate(e.target.value)}
                type="date"
                className="w-full bg-[#1e2330] border border-[#3b82f6]/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#3b82f6]"
              />
              <input
                value={reminderTime}
                onChange={e => setReminderTime(e.target.value)}
                type="time"
                className="w-full bg-[#1e2330] border border-[#3b82f6]/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#3b82f6]"
              />
              <button type="submit" className="w-full bg-[#3b82f6] text-black py-2 rounded-lg font-semibold">Set Reminder</button>
            </form>
            {reminderSet && (
              <p className="mt-3 text-sm text-gray-300">Reminder set for {reminderDate} at {reminderTime}. (Demo notification only)</p>
            )}
          </section>

          <section className="bg-[#121625] rounded-2xl p-6 border border-[#1f2837] flex flex-col">
            <div className="flex items-center space-x-2 mb-4">
              <MessageSquare className="w-5 h-5 text-[#3b82f6]" />
              <h2 className="text-xl font-semibold">Customer Chat (Demo)</h2>
            </div>
            <div className="flex-1 overflow-y-auto max-h-72 bg-[#0f1117] border border-[#3b83f6]/20 rounded-lg p-3 mb-3">
              {chatHistory.length === 0 ? (
                <p className="text-gray-400">Message support in demo mode.</p>
              ) : (
                chatHistory.map((msg, i) => (
                  <div key={i} className={`mb-2 p-2 rounded-lg ${msg.sender === 'user' ? 'bg-[#21314d] text-right' : 'bg-[#18202f] text-left'}`}>
                    <p className="text-sm">{msg.message}</p>
                  </div>
                ))
              )}
            </div>
            <form onSubmit={handleSendChat} className="flex gap-2">
              <input
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-[#1e2330] border border-[#3b82f6]/20 rounded-lg px-3 py-2 focus:outline-none focus:border-[#3b82f6]"
              />
              <button type="submit" className="bg-[#3b82f6] text-black px-4 py-2 rounded-lg">Send</button>
            </form>
          </section>
        </div>

        <section className="bg-[#121625] rounded-2xl p-6 border border-[#1f2837] mt-6">
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="w-5 h-5 text-[#3b82f6]" />
            <h2 className="text-xl font-semibold">FAQ</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div key={idx}>
                <p className="font-semibold">Q: {faq.q}</p>
                <p className="text-gray-400">A: {faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center text-sm text-gray-400 mt-6">
          <p>This is a demo implementation of tracking, complaints, reminders, chat and FAQ functionality. Paid production integration with backend services is required for real support.</p>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
