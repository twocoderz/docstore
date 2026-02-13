import React from "react";

const Infos = () => {
  const mobileUrl = typeof window !== "undefined"
    ? `https://m.${window.location.hostname}`
    : "https://m.example.com";

  return (
    <div className="space-y-10">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center space-x-3">
            <img src="/assets/icons/info.svg" alt="info" className="w-10 h-10" />
            <h1 className="text-3xl md:text-5xl font-bold">A propos du site</h1>
          </div>
          <p className="text-indigo-100 text-base md:text-lg max-w-3xl leading-relaxed">
            Votre guide essentiel pour explorer le monde educatif ! Trouvez les ecoles de vos reves,
            preparez vos concours avec confiance et accedez a des ressources de qualite.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      {/* Ce qui peut interesser les visiteurs */}
      <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <img src="/assets/icons/love.svg" alt="love" className="w-6 h-6 text-pink-500" />
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Pourquoi vous allez adorer cette plateforme</h2>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <li className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            Accedez instantanément aux concours et informations des ecoles
          </li>
          <li className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            Des ressources organisees par filiere et par UE pour apprendre efficacement
          </li>
          <li className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            Une navigation simple et intuitive, pensée pour vous
          </li>
          <li className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            Des contenus regulierement mis a jour pour vous accompagner au quotidien
          </li>
        </ul>
      </section>

      {/* Organisation */}
      <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <img src="/assets/icons/info.svg" alt="sitemap" className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Une organisation pensée pour vous</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
            <h3 className="font-semibold text-gray-900 mb-2">Ecoles</h3>
            <p>Decouvrez les ecoles qui correspondent a vos ambitions.</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-5 border border-orange-100">
            <h3 className="font-semibold text-gray-900 mb-2">Concours</h3>
            <p>Preparez-vous sereinement avec tous les documents officiels.</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
            <h3 className="font-semibold text-gray-900 mb-2">Filieres</h3>
            <p>Explorez les filieres et leurs unites d'enseignement (UE) en detail.</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
            <h3 className="font-semibold text-gray-900 mb-2">Ressources</h3>
            <p>Chaque UE met a votre disposition des ressources precieuses.</p>
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <img src="/assets/icons/team.svg" alt="team" className="w-6 h-6 text-green-600" />
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Fait avec passion par</h2>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Cette plateforme a ete concue avec amour par l'equipe DocStore pour vous offrir
          la meilleure experience possible. Votre reussite est notre motivation !
        </p>
      </section>

      {/* Version mobile */}
      <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <img src="/assets/icons/phone.svg" alt="phone" className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Restez connecte partout</h2>
        </div>
        <p className="text-gray-700 mb-4">
          Emportez toutes les informations avec vous ! Version optimisee pour smartphone,
          disponible ou que vous soyez.
        </p>
        <a
          href={mobileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
        >
          Ouvrir la version mobile
        </a>
        <p className="text-xs text-gray-500 mt-2">
          Lien direct vers la version mobile pour une navigation fluide sur votre telephone.
        </p>
      </section>
    </div>
  );
};

export default Infos;
