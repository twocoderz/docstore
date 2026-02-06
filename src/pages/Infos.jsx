import React from "react";
import { FaUsers, FaSitemap, FaMobileAlt, FaHeart } from "react-icons/fa";

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
            <h1 className="text-3xl md:text-5xl font-bold">À propos du site</h1>
          </div>
          <p className="text-indigo-100 text-base md:text-lg max-w-3xl leading-relaxed">
            Cette plateforme aide les visiteurs à découvrir les écoles, les filières et les ressources
            disponibles. Tout est pensé pour une navigation claire et rapide, sans jargon technique.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      {/* Ce qui peut intéresser les visiteurs */}
      <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <FaHeart className="w-6 h-6 text-pink-500" />
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Ce qui peut vous intéresser</h2>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <li className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            • Accès rapide aux concours et aux informations des écoles.
          </li>
          <li className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            • Ressources classées par filière et par UE.
          </li>
          <li className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            • Navigation simple, pensée pour les étudiants et les visiteurs.
          </li>
          <li className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            • Contenus mis à jour pour rester utiles au quotidien.
          </li>
        </ul>
      </section>

      {/* Organisation */}
      <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <FaSitemap className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Comment tout est organisé</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
            <h3 className="font-semibold text-gray-900 mb-2">Écoles</h3>
            <p>Découvrez les écoles disponibles et leurs filières associées.</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-5 border border-orange-100">
            <h3 className="font-semibold text-gray-900 mb-2">Concours</h3>
            <p>Accédez aux concours d’entrée et aux documents officiels.</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
            <h3 className="font-semibold text-gray-900 mb-2">Filières</h3>
            <p>Explorez les filières et leurs unités d’enseignement (UE).</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
            <h3 className="font-semibold text-gray-900 mb-2">Ressources</h3>
            <p>Chaque UE propose ses ressources à consulter ou télécharger.</p>
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <FaUsers className="w-6 h-6 text-green-600" />
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Développé par</h2>
        </div>
        <p className="text-gray-700 leading-relaxed">
          Cette plateforme a été conçue et développée par l’équipe DocStore, avec une attention
          particulière à la clarté des informations et à l’expérience des visiteurs.
        </p>
      </section>

      {/* Version mobile */}
      <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <FaMobileAlt className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Version mobile</h2>
        </div>
        <p className="text-gray-700 mb-4">
          Accédez à une version optimisée pour smartphone en cliquant sur le lien ci-dessous.
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
          Si le lien ne correspond pas à votre version mobile, vous pourrez le mettre à jour facilement.
        </p>
      </section>
    </div>
  );
};

export default Infos;
