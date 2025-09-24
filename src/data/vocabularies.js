/**
 * Predefined vocabulary collections for repository creation
 * Each vocabulary has collectionUri, description, and title
 */
export const vocabularies = [
  {
    collectionUri: "http://vocab.nerc.ac.uk/collection/P02/current/",
    title: "SeaDataNet Parameter Discovery Vocabulary",
    description:
      "P02 - Standardized parameter names for oceanographic and marine data discovery and interoperability",
  },
  {
    collectionUri: "http://vocab.nerc.ac.uk/collection/P01/current/",
    title: "BODC Parameter Usage Vocabulary",
    description:
      "P01 - Comprehensive vocabulary for describing measured parameters in oceanographic data",
  },
  {
    collectionUri: "http://vocab.nerc.ac.uk/collection/L05/current/",
    title: "SeaDataNet Device Category Vocabulary",
    description:
      "L05 - Classification of instruments and devices used in marine and oceanographic observations",
  },
  {
    collectionUri: "http://vocab.nerc.ac.uk/collection/C35/current/",
    title: "SeaDataNet Data Transport Format",
    description:
      "C35 - Vocabulary for describing data transport and exchange formats in marine data systems",
  },
  {
    collectionUri: "http://vocab.nerc.ac.uk/collection/L22/current/",
    title: "SeaDataNet Device Details",
    description:
      "L22 - Detailed specifications and characteristics of marine measurement devices",
  },
  {
    collectionUri: "http://vocab.nerc.ac.uk/collection/P06/current/",
    title: "BODC-approved data storage units",
    description:
      "P06 - Terms approved for use by BODC to describe the measurement units for data held in its repositories",
  },
  {
    collectionUri: "http://vocab.nerc.ac.uk/collection/P07/current/",
    title: "Climate and Forecast Standard Names",
    description:
      "P07 - Standard names for physical quantities used in climate and forecast data",
  },
  {
    collectionUri: "http://vocab.nerc.ac.uk/collection/L06/current/",
    title: "SeaDataNet Platform Category",
    description:
      "L06 - Classification vocabulary for marine observation platforms and vessels",
  },
  {
    collectionUri: "http://vocab.nerc.ac.uk/collection/C77/current/",
    title: "SeaDataNet Quality Control Procedures",
    description:
      "C77 - Standardized quality control and quality assurance procedures for marine data",
  },
  {
    collectionUri: "http://vocab.nerc.ac.uk/collection/P03/current/",
    title: "SeaDataNet Agreed Parameter Groups",
    description:
      "P03 - Groupings of related parameters for data discovery and thematic organization",
  },
  {
    collectionUri: "http://vocab.nerc.ac.uk/collection/L18/current/",
    title: "SeaDataNet Cruise Summary Report Data Categories",
    description:
      "L18 - Categories for organizing and reporting cruise summary information",
  },
];

/**
 * Extract vocabulary tag from collection URI
 * Example: http://vocab.nerc.ac.uk/collection/C35/current/ → C35
 */
export const extractVocabTag = (collectionUri) => {
  const match = collectionUri.match(/\/collection\/([^/]+)\//);
  return match ? match[1] : null;
};
