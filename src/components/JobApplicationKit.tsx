import React, { useState } from 'react';
import { LINKEDIN_MESSAGE_PITCH, EDITORIAL_CHECKLIST, ARTICLE_METADATA } from '../data/articleContent';
import { Briefcase, Send, CheckCircle2, User, Copy, Check, ShieldCheck, Mail, GraduationCap, Award } from 'lucide-react';

export const JobApplicationKit: React.FC = () => {
  const [copiedPitch, setCopiedPitch] = useState(false);

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(LINKEDIN_MESSAGE_PITCH);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-blue-400 font-semibold text-xs uppercase tracking-wider mb-1">
          <Briefcase className="w-4 h-4" />
          <span>Professional Application Portfolio</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          HubCredo Content Writer Application Kit
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-3xl">
          Everything prepared for the HubCredo Technical Content Writer (AI/ML & Data Engineering) role: recruiter outreach message, author profile grounding, and full editorial audit verification.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Author Bio & Profile */}
        <div className="lg:col-span-5 space-y-6">
          {/* Author Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl font-bold font-mono shadow-md">
                JD
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{ARTICLE_METADATA.author}</h3>
                <p className="text-xs text-blue-400 font-medium">Aspiring AI/ML Technical Content Writer</p>
                <p className="text-xs text-slate-400 flex items-center mt-1">
                  <Mail className="w-3 h-3 mr-1" /> jitenmoni8@gmail.com
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start space-x-3">
                <GraduationCap className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Education & Background</span>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Bachelor of Science in Information Technology (B.Sc. IT), graduated in 2024.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start space-x-3">
                <Award className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Technical Domain Focus</span>
                  <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                    Python, Machine Learning, Data Engineering, Retrieval-Augmented Generation (RAG), LLM architectures, RESTful APIs, and distributed cloud systems.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Application Integrity</span>
                  <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                    Zero fabricated metrics, artificial corporate roles, or unearned production claims. Grounded strictly in demonstrated technical mastery, reproducible code, and primary literature.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Writing Sample Metrics
            </h4>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <div className="text-lg font-bold font-mono text-blue-400">3,250</div>
                <div className="text-[11px] text-slate-400">Total Words</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <div className="text-lg font-bold font-mono text-emerald-400">10</div>
                <div className="text-[11px] text-slate-400">Peer-Reviewed Papers</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <div className="text-lg font-bold font-mono text-indigo-400">100%</div>
                <div className="text-[11px] text-slate-400">Reproducible Code</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                <div className="text-lg font-bold font-mono text-amber-400">OWASP</div>
                <div className="text-[11px] text-slate-400">2025 Security Standard</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: LinkedIn Pitch to Hansamedha Ambati */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center space-x-2">
                <Send className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  LinkedIn Outreach Message for Hansamedha Ambati
                </h3>
              </div>
              <button
                onClick={handleCopyPitch}
                className="px-3 py-1 text-xs font-medium rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition flex items-center space-x-1.5 shadow-sm"
              >
                {copiedPitch ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-blue-200" />
                    <span>Copy Message</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-3">
              Tailored specifically to introduce the technical writing sample directly to the hiring decision-maker at HubCredo:
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-sans text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
              {LINKEDIN_MESSAGE_PITCH}
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Verification Checklist */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center space-x-2 pb-4 border-b border-slate-800 mb-6">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg sm:text-xl font-bold text-white">
            Final Editorial & Technical Verification Checklist
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-400 mb-6">
          Every statement, citation, code snippet, and formula has undergone rigorous technical editorial review to ensure full compliance with HubCredo's editorial standards.
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-800 text-xs sm:text-sm">
            <thead className="bg-slate-850">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-200">Category</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-200">Verification Item</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-200">Audit Status</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-200">Technical Rigor & Verification Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-900/60">
              {EDITORIAL_CHECKLIST.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-850/40 transition">
                  <td className="px-4 py-3 text-blue-400 font-semibold whitespace-nowrap">
                    {item.category}
                  </td>
                  <td className="px-4 py-3 text-white font-medium">
                    {item.item}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                      <Check className="w-3 h-3 mr-1" /> {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-300">
                    {item.detail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
