export const eplData = {
  school: "Ecole Polytechnique de Lomé (EPL)",
  campus: "Université de Lomé, Togo",
  parcours: [
    {
      name: "Licence Professionnelle",
      filieres: [
        {
          name: "Génie Logiciel",
          years: [
            {
              year: "Année 1",
              semesters: [
                {
                  name: "Harmattan",
                  courses: [
                    {
                      title: "Algorithmique",
                      description: "Introduction aux bases de l'algorithmique",
                      resources: [
                        { type: "Cours", pdf: "/assets/pdfs/algorithmique-cours.pdf" },
                        { type: "Exercices", pdf: "/assets/pdfs/algorithmique-exos.pdf" },
                        { type: "TD", pdf: "/assets/pdfs/algorithmique-td.pdf" },
                      ],
                    },
                    {
                      title: "Programmation C",
                      description: "Fondements de la programmation en C",
                      resources: [
                        { type: "Cours", pdf: "/assets/pdfs/c-cours.pdf" },
                        { type: "TP", pdf: "/assets/pdfs/c-tp.pdf" },
                      ],
                    },
                    {
                      title: "Programmation Java",
                      description: "Fondements de la programmation en Java",
                      resources: [
                        { type: "Cours", pdf: "/assets/pdfs/c-cours.pdf" },
                        { type: "TP", pdf: "/assets/pdfs/c-tp.pdf" },
                      ],
                    },
                    {
                      title: "Programmation PHP",
                      description: "Fondements de la programmation en PHP",
                      resources: [
                        { type: "Cours", pdf: "/assets/pdfs/c-cours.pdf" },
                        { type: "TP", pdf: "/assets/pdfs/c-tp.pdf" },
                      ],
                    },
                  ],
                },
                {
                  name: "Mousson",
                  courses: [
                    {
                      title: "Structures de Données",
                      description: "Concepts avancés des structures",
                      resources: [
                        { type: "Cours", pdf: "/assets/pdfs/structures-cours.pdf" },
                        { type: "Exercices", pdf: "/assets/pdfs/structures-exos.pdf" },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Licence Fondamentale",
      filieres: [],
    },
  ],
};
