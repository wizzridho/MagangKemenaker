"use client";

import { User2, Mail, Phone, MapPin, Calendar, IdCard, RefreshCw, Cake, Globe, Venus, Mars } from "lucide-react";
import { useEffect, useState } from "react";

export const dynamic = 'force-dynamic'

export default function Home() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshCount, setRefreshCount] = useState(0);

  const getDataUser = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      setUser(data.results);
      setRefreshCount(prev => prev + 1);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataUser();
  }, []);

  const funFacts = [
    "Setiap kali refresh, kamu dapat profil orang random dari seluruh dunia!",
    "Data ini berasal dari Random User Generator API",
    "Foto profil yang ditampilkan adalah dari https://randomuser.me/",
    `Sudah generate ${refreshCount} kali nih!`
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-5 font-sans">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 mb-2">Loading data user...</p>
          <p className="text-gray-400 text-sm">
            {funFacts[refreshCount % funFacts.length]}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-5 font-sans">
      <div className="max-w-4xl mx-auto">
        
      
        <div className="text-center mb-8 py-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <User2 className="text-white text-4xl" />
            <h1 className="text-white text-4xl font-bold drop-shadow-lg">
              Random User Finder
            </h1>
          </div>
          <p className="text-white/80 text-lg mb-6">
            Temukan profil menarik dari berbagai belahan dunia
          </p>
          <button
            onClick={getDataUser}
            className="bg-white/20 border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-purple-600 backdrop-blur-sm flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-5 h-5" />
            User Baru
          </button>
          <div className="text-white/70 text-sm mt-3">
            Generated: {refreshCount} kali
          </div>
        </div>

        {user.map((item, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8 transition-transform duration-300 hover:scale-[1.02]">
            
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-8 text-center">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg mx-auto overflow-hidden">
                <img
                  src={item.picture.large}
                  alt={`${item.name.first} ${item.name.last}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="mt-6">
                <h2 className="text-white text-3xl font-bold mb-2">
                  {item.name.first} {item.name.last}
                </h2>
                <div className="flex items-center justify-center gap-2 text-white/90 text-lg mb-4">
                  <Mail className="w-5 h-5" />
                  {item.email}
                </div>
                
                <div className="flex justify-center gap-3 mt-4 flex-wrap">
                  <span className="bg-white/20 px-4 py-2 rounded-full text-white text-sm backdrop-blur-sm flex items-center gap-2">
                    <Cake className="w-4 h-4" />
                    {item.dob.age} tahun
                  </span>
                  <span className="bg-white/20 px-4 py-2 rounded-full text-white text-sm backdrop-blur-sm flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    {item.location.country}
                  </span>
                  <span className="bg-white/20 px-4 py-2 rounded-full text-white text-sm backdrop-blur-sm flex items-center gap-2">
                    {item.gender === 'female' ? 
                      <Venus className="w-4 h-4" /> : 
                      <Mars className="w-4 h-4" />
                    }
                    {item.gender}
                  </span>
                </div>
              </div>
            </div>

           
            <div className="p-8">
              <div className="grid gap-8">  
              
                <div>
                  <h3 className="text-gray-800 text-xl font-semibold mb-4 border-b-2 border-blue-500 pb-2 inline-flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Kontak
                  </h3>
                  <div className="grid gap-4">
                    <div>
                      <div className="text-gray-600 text-sm mb-1">Telepon</div>
                      <div className="text-gray-800 font-semibold text-lg flex items-center gap-2">
                        <Phone className="w-4 h-4 text-blue-500" />
                        {item.phone}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600 text-sm mb-1">Seluler</div>
                      <div className="text-gray-800 font-semibold text-lg flex items-center gap-2">
                        <Phone className="w-4 h-4 text-blue-500" />
                        {item.cell}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-gray-800 text-xl font-semibold mb-4 border-b-2 border-blue-500 pb-2 inline-flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Alamat
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-blue-500">
                    <div className="text-gray-800 font-semibold text-lg mb-1 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      {item.location.street.number} {item.location.street.name}
                    </div>
                    <div className="text-gray-600 text-base">
                      {item.location.city}, {item.location.state}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {item.location.country} - {item.location.postcode}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-gray-800 text-xl font-semibold mb-4 border-b-2 border-blue-500 pb-2 inline-flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Registrasi
                    </h3>
                    <div className="text-gray-600 text-sm">
                      Terdaftar sejak
                      <div className="text-gray-800 font-semibold text-lg mt-1 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        {new Date(item.registered.date).toLocaleDateString('id-ID')}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-gray-800 text-xl font-semibold mb-4 border-b-2 border-blue-500 pb-2 inline-flex items-center gap-2">
                      <IdCard className="w-5 h-5" />
                      ID
                    </h3>
                    <div className="text-gray-600 text-sm">
                      {item.id.name}
                      <div className="text-gray-800 font-semibold text-lg mt-1 flex items-center gap-2">
                        <IdCard className="w-4 h-4 text-blue-500" />
                        {item.id.value}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            
          </div>
        ))}
      </div>
    </div>
  );
}