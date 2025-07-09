import React from "react";
import { useNavigate } from "react-router-dom";
import BrimstoneImg from "../assets/BrimstoneImg.jpg";
import PhoenixImg from "../assets/PhoenixImg.jpg";
import SageImg from "../assets/SageImg.jpg";
import SovaImg from "../assets/SovaImg.jpg";
import OmenImg from "../assets/OmenImg.jpg";
import KilljoyImg from "../assets/KilljoyImg.jpg";
import NeonImg from "../assets/NeonImg.jpg";
import KayoImg from "../assets/KayoImg.jpg";
import YoruImg from "../assets/YoruImg.jpg";
import ViperImg from "../assets/ViperImg.jpg";
import SkyeImg from "../assets/SkyeImg.jpg";
import RazeImg from "../assets/RazeImg.jpg";
import JettImg from "../assets/JettImg.jpg";
import GekkoImg from "../assets/GekkoImg.jpg";
import FadeImg from "../assets/FadeImg.jpg";
import ChyperImg from "../assets/ChyperImg.jpg";
import ChamberImg from "../assets/ChamberImg.jpg";
import BreachImg from "../assets/BreachImg.jpg";
import AstraImg from "../assets/AstraImg.jpg";

const agents = [
  { id: "brimstone", name: "BRIMSTONE", image: BrimstoneImg },
  { id: "phoenix", name: "PHOENIX", image: PhoenixImg },
  { id: "sage", name: "SAGE", image: SageImg },
  { id: "sova", name: "SOVA", image: SovaImg },
  { id: "killjoy", name: "KILLJOY", image: KilljoyImg },
  { id: "neon", name: "NEON", image: NeonImg },
  { id: "kayo", name: "KAYO", image: KayoImg },
  { id: "omen", name: "OMEN", image: OmenImg },
  { id: "yoru", name: "YORU", image: YoruImg },
  { id: "viper", name: "VIPER", image: ViperImg },
  { id: "skye", name: "SKYE", image: SkyeImg },
  { id: "raze", name: "RAZE", image: RazeImg },
  { id: "jett", name: "JETT", image: JettImg },
  { id: "gekko", name: "GEKKO", image: GekkoImg },
  { id: "fade", name: "FADE", image: FadeImg },
  { id: "chyper", name: "CHYPER", image: ChyperImg },
  { id: "chamber", name: "CHAMBER", image: ChamberImg },
  { id: "breach", name: "BREACH", image: BreachImg },
  { id: "astra", name: "ASTRA", image: AstraImg }
];

export default function AgentsPage() {
  const navigate = useNavigate();

  const handleClick = (id) => {
    if (id) {
      navigate(`/agents/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="p-6 text-center text-4xl font-extrabold uppercase tracking-widest border-b border-[#ff4654]">
        Valorant <span className="text-[#ff4654]">Agents</span>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8">
        {agents.map((agent, index) => (
          <div
            key={index}
            className="bg-[#111] border border-[#ff4654] border-opacity-30 p-4 rounded-lg shadow-lg hover:shadow-red-600/30 hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => handleClick(agent.id)}
          >
            <img
              src={agent.image}
              alt={agent.name}
              className="w-full h-70 object-cover rounded-md mb-4 border border-[#ff4654] border-opacity-20"
            />
            <h2 className="text-center font-bold text-xl text-[#ff4654] tracking-wide">
              {agent.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
