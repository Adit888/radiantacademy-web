import React from "react";
import BrimstoneImg from "../assets/BrimstoneImg.jpg";
import StimBeaconImg from "../assets/StimBeaconImg.jpg";
import IncendiaryImg from "../assets/IncendiaryImg.jpg";
import SkySmokeImg from "../assets/SkySmokeImg.jpg";
import OrbitalStrikeImg from "../assets/OrbitalStrikeImg.jpg";

export default function BrimstonePage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <button
        className="mb-6 text-[#ff4654] hover:underline text-sm font-medium"
        onClick={() => window.history.back()}
      >
        ← Back to Agents
      </button>

      <div className="flex flex-col md:flex-row gap-10 items-start">
        <div className="md:w-1/3 w-full">
          <img
            src={BrimstoneImg}
            alt="Brimstone"
            className="rounded-xl shadow-2xl border border-[#ff4654]/40"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-5xl font-extrabold mb-4 uppercase tracking-wide text-[#ff4654]">
            Brimstone
          </h1>

          <p className="mb-6 text-gray-300 text-lg leading-relaxed">
            Brimstone's orbital arsenal ensures his squad always has the advantage. His
            ability to deliver utility precisely and safely makes him a powerful support
            on the battlefield.
          </p>

          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 text-[#ff4654]">Role</h2>
            <span className="inline-block bg-[#ff4654]/10 text-[#ff4654] px-4 py-1 rounded-full text-sm font-medium border border-[#ff4654]/40">
              Controller
            </span>
            <p className="text-gray-400 mt-2 text-sm">
              Controllers are experts in slicing up dangerous territory to set their team up
              for success.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-[#ff4654]">Abilities</h2>
            <ul className="space-y-4">
              <li className="bg-zinc-900 p-4 rounded-lg border border-[#ff4654]/20">
                <div className="flex items-center gap-4 mb-1">
                  <img src={StimBeaconImg} alt="Stim Beacon" className="w-8 h-8" />
                  <strong className="text-[#ff4654] text-lg">Stim Beacon</strong>
                </div>
                <p className="text-gray-400 text-sm">Tosses a beacon that grants RapidFire to allies.</p>
              </li>
              <li className="bg-zinc-900 p-4 rounded-lg border border-[#ff4654]/20">
                <div className="flex items-center gap-4 mb-1">
                  <img src={IncendiaryImg} alt="Incendiary" className="w-8 h-8" />
                  <strong className="text-[#ff4654] text-lg">Incendiary</strong>
                </div>
                <p className="text-gray-400 text-sm">Launches a grenade that deploys a damaging fire zone.</p>
              </li>
              <li className="bg-zinc-900 p-4 rounded-lg border border-[#ff4654]/20">
                <div className="flex items-center gap-4 mb-1">
                  <img src={SkySmokeImg} alt="Sky Smoke" className="w-8 h-8" />
                  <strong className="text-[#ff4654] text-lg">Sky Smoke</strong>
                </div>
                <p className="text-gray-400 text-sm">Deploys long-lasting smoke clouds on targeted areas.</p>
              </li>
              <li className="bg-zinc-900 p-4 rounded-lg border border-[#ff4654]/20">
                <div className="flex items-center gap-4 mb-1">
                  <img src={OrbitalStrikeImg} alt="Orbital Strike" className="w-8 h-8" />
                  <strong className="text-[#ff4654] text-lg">Orbital Strike (Ultimate)</strong>
                </div>
                <p className="text-gray-400 text-sm">Calls in a laser strike that deals massive damage over time.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
