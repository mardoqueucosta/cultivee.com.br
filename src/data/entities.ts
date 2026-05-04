export interface KnownEntity {
  type: "Organization" | "GovernmentOrganization" | "EducationalOrganization" | "Product" | "SoftwareApplication" | "Thing";
  name: string;
  url: string;
  sameAs?: string[];
}

export const knownEntities: Record<string, KnownEntity> = {
  embrapa: {
    type: "GovernmentOrganization",
    name: "Embrapa",
    url: "https://www.embrapa.br",
    sameAs: ["https://en.wikipedia.org/wiki/Embrapa", "https://www.wikidata.org/wiki/Q2351989"],
  },
  anvisa: {
    type: "GovernmentOrganization",
    name: "ANVISA",
    url: "https://www.gov.br/anvisa",
    sameAs: ["https://en.wikipedia.org/wiki/Anvisa"],
  },
  abnt: {
    type: "Organization",
    name: "ABNT",
    url: "https://www.abnt.org.br",
    sameAs: ["https://en.wikipedia.org/wiki/Brazilian_National_Standards_Organization"],
  },
  inep: {
    type: "GovernmentOrganization",
    name: "INEP",
    url: "https://www.gov.br/inep",
  },
  capes: {
    type: "GovernmentOrganization",
    name: "CAPES",
    url: "https://www.gov.br/capes",
  },
  scielo: {
    type: "Organization",
    name: "SciELO",
    url: "https://www.scielo.br",
  },
  scopus: {
    type: "Product",
    name: "Scopus",
    url: "https://www.scopus.com",
  },
  zotero: {
    type: "SoftwareApplication",
    name: "Zotero",
    url: "https://www.zotero.org",
  },
  mendeley: {
    type: "SoftwareApplication",
    name: "Mendeley",
    url: "https://www.mendeley.com",
  },
  elicit: {
    type: "SoftwareApplication",
    name: "Elicit",
    url: "https://elicit.com",
  },
  rayyan: {
    type: "SoftwareApplication",
    name: "Rayyan",
    url: "https://www.rayyan.ai",
  },
  arduino: {
    type: "Product",
    name: "Arduino",
    url: "https://www.arduino.cc",
    sameAs: ["https://en.wikipedia.org/wiki/Arduino"],
  },
  esp32: {
    type: "Product",
    name: "ESP32",
    url: "https://www.espressif.com/en/products/socs/esp32",
    sameAs: ["https://en.wikipedia.org/wiki/ESP32"],
  },
  lorawan: {
    type: "Thing",
    name: "LoRaWAN",
    url: "https://lora-alliance.org/about-lorawan",
    sameAs: ["https://en.wikipedia.org/wiki/LoRa"],
  },
  thingsboard: {
    type: "SoftwareApplication",
    name: "ThingsBoard",
    url: "https://thingsboard.io",
  },
  "home assistant": {
    type: "SoftwareApplication",
    name: "Home Assistant",
    url: "https://www.home-assistant.io",
  },
  "penn state extension": {
    type: "EducationalOrganization",
    name: "Penn State Extension",
    url: "https://extension.psu.edu",
  },
  "ematter-mg": {
    type: "GovernmentOrganization",
    name: "EMATER-MG",
    url: "https://www.emater.mg.gov.br",
  },
};
