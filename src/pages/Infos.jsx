import React from "react";
import Popup from "../components/Popup";

const Infos = () => {
  const [popup, setPopup] = React.useState(null);

  const openPopup = (title, message) => (e) => {
    e.preventDefault();
    setPopup({ title, message });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
      {/* Intro */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          À propos
        </h1>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
          DocStore est votre portail vers la réussite académique à l'Université
          de Lomé. La plateforme regroupe les ressources de cours, les annales
          de concours et le répertoire des écoles — tout ce dont vous avez
          besoin, accessible en quelques clics.
        </p>
      </div>

      {/* Ce que tu trouveras ici */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Ce que tu trouveras ici
        </h2>
        <ul className="space-y-3 text-gray-600 text-base">
          <li className="flex gap-3">
            <span className="text-indigo-500 mt-0.5 shrink-0">→</span>
            <span>
              Des <strong className="text-gray-800">ressources de cours</strong>{" "}
              détaillées pour chaque UE, classées par semestre et par catégorie
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-500 mt-0.5 shrink-0">→</span>
            <span>
              Les <strong className="text-gray-800">annales de concours</strong>{" "}
              et documents de préparation pour les examens d'entrée aux grandes
              écoles
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-500 mt-0.5 shrink-0">→</span>
            <span>
              Un{" "}
              <strong className="text-gray-800">répertoire des écoles</strong>{" "}
              avec leurs filières, parcours et programmes détaillés
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-500 mt-0.5 shrink-0">→</span>
            <span>
              La{" "}
              <strong className="text-gray-800">
                prévisualisation des PDF
              </strong>{" "}
              directement dans le navigateur, avant tout téléchargement
            </span>
          </li>
        </ul>
      </div>

      <hr className="border-gray-100" />

      {/* Qui a fait ça */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Qui a fait ça ?
        </h2>
        <p className="text-gray-600 text-base leading-relaxed mb-5">
          DocStore a été développé par{" "}
          <a
            href="https://twocoderz-team.vercel.app"
            onClick={openPopup(
              "Site en cours de développement",
              "Le site Twocoderz est en cours de développement. Merci pour votre intérêt, revenez bientôt.",
            )}
            className="text-indigo-600 font-medium hover:underline"
          >
            Twocoderz
          </a>
          , une équipe passionnée qui construit des outils pour simplifier le
          quotidien des étudiants. Conçu par des étudiants, pour des étudiants.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://github.com/twocoderz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a
            href="https://twocoderz-team.vercel.app"
            onClick={openPopup(
              "Site en cours de développement",
              "Le site Twocoderz est en cours de développement. Merci pour votre intérêt, revenez bientôt.",
            )}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            twocoderz-team.vercel.app
          </a>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Version mobile */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Version mobile
        </h2>
        <p className="text-gray-600 text-base mb-4">
          Vous préférez étudier en déplacement ? Une version mobile optimisée
          est disponible pour une expérience fluide sur smartphone.
        </p>
        <a
          href="https://docstore-download.vercel.app"
          onClick={openPopup(
            "Application mobile en cours de développement",
            "La version mobile de DocStore est en cours de développement. Elle sera bientôt disponible, revenez nous voir !",
          )}
          className="inline-flex items-center gap-2 text-indigo-600 text-sm font-medium hover:underline"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18h.01M8 21h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1z"
            />
          </svg>
          docstore-download.vercel.app
        </a>
      </div>

      <Popup
        open={!!popup}
        title={popup?.title}
        message={popup?.message}
        onClose={() => setPopup(null)}
      />
    </div>
  );
};

export default Infos;
