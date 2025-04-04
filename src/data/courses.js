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
                        pdf: "/assets/pdfs/algorithmique.pdf",
                        description: "Introduction aux bases de l'algorithmique",
                      },
                      {
                        title: "Programmation C",
                        pdf: "/assets/pdfs/algorithmique.pdf",
                        description: "Fondements de la programmation en C",
                      },
                    ],
                  },
                  {
                    name: "Mousson",
                    courses: [
                      {
                        title: "Structures de Données",
                        pdf: "/assets/pdfs/structures-donnees.pdf",
                        description: "Concepts avancés des structures",
                      },
                    ],
                  },
                ],
              },
              {
                year: "Année 2",
                semesters: [
                  {
                    name: "Harmattan",
                    courses: [
                      {
                        title: "Algorithmique Numérique",
                        pdf: "/assets/pdfs/algorithmique.pdf",
                        description: "Introduction aux bases de l'algorithmique numérique",
                      },
                      {
                        title: "Programmation Java",
                        pdf: "/assets/pdfs/algorithmique.pdf",
                        description: "Fondements de la programmation en Java",
                      },
                    ],
                  },
                  {
                    name: "Mousson",
                    courses: [
                      {
                        title: "Structures de Données",
                        pdf: "/assets/pdfs/structures-donnees.pdf",
                        description: "Concepts avancés des structures",
                      },
                    ],
                  },
                ],
              },
              // Ajouter Année 2 et Année 3 de la même manière
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