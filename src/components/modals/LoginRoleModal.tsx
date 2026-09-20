import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  Shield,
  Radio,
  Users,
  Building2,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Waves,
  MapPin,
  Sparkles,
  PhoneCall,
  Activity,
  X
} from 'lucide-react';

export const LoginRoleModal: React.FC = () => {
  const {
    isLoginModalOpen,
    setIsLoginModalOpen,
    userProfile,
    loginAs,
    t
  } = useApp();

  const [selectedRole, setSelectedRole] = useState<UserRole>(userProfile.role || 'citizen');

  // Citizen Form state
  const [citizenName, setCitizenName] = useState('Priya Sharma');
  const [citizenPhone, setCitizenPhone] = useState('+91 94190 44821');
  const [citizenLocality, setCitizenLocality] = useState('Rajbagh, Srinagar');

  // Authority Form state
  const [officialName, setOfficialName] = useState('Cmdr. Rajesh Verma');
  const [officialId, setOfficialId] = useState('NDRF-HQ-04');
  const [department, setDepartment] = useState('NDRF / SDMA Incident Command');
  const [designation, setDesignation] = useState('Chief Disaster Response Commander');

  if (!isLoginModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'citizen') {
      loginAs('citizen', {
        name: citizenName.trim() || 'Citizen User',
        phone: citizenPhone.trim() || '+91 98000 00000',
        locality: citizenLocality.trim() || 'Local Area',
        designation: 'Citizen / Resident'
      });
    } else {
      loginAs('authority', {
        name: officialName.trim() || 'Official Commander',
        officialId: officialId.trim() || 'AUTH-OFFICER-01',
        department: department,
        designation: designation
      });
    }
  };

  const handleQuickPreset = (role: UserRole) => {
    if (role === 'citizen') {
      loginAs('citizen', {
        name: 'Priya Sharma',
        phone: '+91 94190 44821',
        locality: 'Rajbagh, Srinagar (Zone 3)',
        designation: 'Citizen / Resident'
      });
    } else {
      loginAs('authority', {
        name: 'Cmdr. Rajesh Verma',
        officialId: 'NDRF-HQ-04',
        department: 'National Disaster Management Authority (NDMA)',
        designation: 'Incident Commander & Chief Hydro-Officer'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div
        id="login-role-modal-card"
        className="w-full max-w-3xl bg-slate-900 border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden my-auto relative animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close button only if already logged in */}
        {userProfile.isLoggedIn && (
          <button
            id="close-login-modal-btn"
            onClick={() => setIsLoginModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors z-20"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="p-5 sm:p-8 relative z-10 space-y-6">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Waves className="w-3.5 h-3.5" />
              <span>Smart India Hackathon • Dual-Role Early Warning Platform</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Select Your <span className="text-cyan-400">Dashboard Role</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-400">
              AquaSense provides two specialized command experiences. Choose your identity to enter the tailored early-warning portal.
            </p>
          </div>

          {/* Role Cards Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Citizen Role Card */}
            <div
              id="select-citizen-role-card"
              onClick={() => setSelectedRole('citizen')}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                selectedRole === 'citizen'
                  ? 'bg-gradient-to-b from-cyan-950/50 to-slate-900 border-cyan-400 shadow-xl shadow-cyan-500/15 ring-2 ring-cyan-400/20'
                  : 'bg-slate-800/50 border-slate-700/80 hover:border-slate-600 hover:bg-slate-800/80'
              }`}
            >
              {selectedRole === 'citizen' && (
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-bold text-[10px]">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>SELECTED</span>
                </div>
              )}

              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Users className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>Citizen Dashboard</span>
                  </h3>
                  <p className="text-xs text-cyan-300/90 font-medium mt-0.5">
                    For Residents, Families & Communities
                  </p>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-700/60">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span>Hyperlocal Neighborhood Flood Danger Radar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span>One-Tap SOS Rescue Beacon & Live GPS Link</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span>Nearest Relief Camps & Safe Walking Routes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span>Official Bulletins in 22 Indian Languages</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuickPreset('citizen');
                  }}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 underline underline-offset-2"
                >
                  <span>Quick Login as Citizen</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* 2. Authority Role Card */}
            <div
              id="select-authority-role-card"
              onClick={() => setSelectedRole('authority')}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                selectedRole === 'authority'
                  ? 'bg-gradient-to-b from-blue-950/50 to-slate-900 border-blue-400 shadow-xl shadow-blue-500/15 ring-2 ring-blue-400/20'
                  : 'bg-slate-800/50 border-slate-700/80 hover:border-slate-600 hover:bg-slate-800/80'
              }`}
            >
              {selectedRole === 'authority' && (
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500 text-white font-bold text-[10px]">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>SELECTED</span>
                </div>
              )}

              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Radio className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>Authority Dashboard</span>
                  </h3>
                  <p className="text-xs text-blue-300/90 font-medium mt-0.5">
                    For NDMA, SDMA, NDRF & CWC Incident Officers
                  </p>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-700/60">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                    <span>National & River Basin Multi-Gauge Matrix</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                    <span>Common Alerting Protocol (CAP) Broadcaster</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                    <span>Live Citizen SOS Triage & Boat Unit Dispatch</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                    <span>Saint-Venant Hydro & Radar Nowcast Engine</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuickPreset('authority');
                  }}
                  className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 underline underline-offset-2"
                >
                  <span>Quick Login as Authority</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Detailed Form based on selected role */}
          <form onSubmit={handleLoginSubmit} className="space-y-4 pt-2">
            {selectedRole === 'citizen' ? (
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    <Users className="w-4 h-4" />
                    <span>Citizen Profile Details</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Customizable for Simulation</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={citizenName}
                      onChange={e => setCitizenName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                      placeholder="e.g. Priya Sharma"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Mobile Number (SOS Contact)
                    </label>
                    <input
                      type="text"
                      value={citizenPhone}
                      onChange={e => setCitizenPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 font-mono"
                      placeholder="+91 94190 44821"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Locality / Ward
                    </label>
                    <input
                      type="text"
                      value={citizenLocality}
                      onChange={e => setCitizenLocality(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                      placeholder="e.g. Rajbagh, Srinagar"
                      required
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
                    <Radio className="w-4 h-4" />
                    <span>Emergency Official Credentials</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Secure Access
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Commander / Officer Name
                    </label>
                    <input
                      type="text"
                      value={officialName}
                      onChange={e => setOfficialName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Official Service ID
                    </label>
                    <input
                      type="text"
                      value={officialId}
                      onChange={e => setOfficialId(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-400 font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Agency / Department
                    </label>
                    <select
                      value={department}
                      onChange={e => setDepartment(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-400"
                    >
                      <option value="NDRF / National Disaster Management Authority">NDRF Headquarters</option>
                      <option value="State Disaster Management Authority (SDMA)">State SDMA Command</option>
                      <option value="District Emergency Operations Center (DEOC)">District DEOC</option>
                      <option value="Central Water Commission (CWC)">CWC River Basin Cell</option>
                      <option value="Municipal Corporation Disaster Cell">Municipal Disaster Cell</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Role / Designation
                    </label>
                    <input
                      type="text"
                      value={designation}
                      onChange={e => setDesignation(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-400"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>You can switch between Citizen & Authority roles at any time from the top bar.</span>
              </div>

              <button
                type="submit"
                id="submit-role-login-btn"
                className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                  selectedRole === 'citizen'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold shadow-cyan-500/25'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold shadow-blue-500/25'
                }`}
              >
                <span>Enter {selectedRole === 'citizen' ? 'Citizen Safety Portal' : 'Authority Command Center'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
