export interface GeoLocation {
    latitude: number;
    longitude: number;
  }
  
  export interface EducationStage {
    id: number;
    nazwa: string;
  }
  
  export interface EntityType {
    "@id"?: string;
    "@type"?: string;
    id: number;
    nazwa: string;
  }
  
  export interface VocationalEducation {
    [key: string]: string; // Key is ID, value is name of the vocational education program
  }
  
  export interface OrganizationalEntity {
    nazwa: string;
    typ: EntityType;
    regon: string | null;
  }
  
  export interface Institution {
    "@id": string;
    "@type": string;
    numerRspo: number;
    dataZalozenia: string;
    dataRozpoczecia: string;
    dataZakonczenia: string;
    nip: string | null;
    regon: string;
    liczbaUczniow: number;
    nazwaSkrocona: string | null;
    nazwa: string;
    typ: EntityType;
    dyrektorImie: string;
    dyrektorNazwisko: string;
    statusPublicznoPrawny: EntityType;
    etapyEdukacji: EducationStage[];
    dataWlaczeniaDoZespolu: string | null;
    dataWylaczeniaZZespolu: string | null;
    dataLikwidacji: string | null;
    kategoriaUczniow: EntityType;
    specyfikaSzkoly: EntityType;
    zwiazanieOrganizacyjne: EntityType;
    czyPosiadaObwod: boolean;
    czyPosiadaInternat: boolean;
    czyDotacjaWPrzyszlymRoku: boolean;
    opiekaDydaktycznoNaukowaUczelni: any[];
    ksztalcenieZawodowe: VocationalEducation | any[];
    ksztalcenieZawodoweProfilowane: any[];
    ksztalcenieZawodoweArtystyczne: any[];
    ksztalcenieNKJO: any[];
    ksztalcenieWKolegiachNauczycielskich: any[];
    ksztalcenieWkolegiachPracownikowSluzbSpolecznych: any[];
    podmiotPrzekazujacyDaneDoRSPO: OrganizationalEntity;
    podmiotProwadzacy: OrganizationalEntity[];
    podmiotNadrzedny: string | null;
    wojewodztwo: string;
    wojewodztwoKodTERYT: string;
    powiat: string;
    powiatKodTERYT: string;
    gmina: string;
    gminaKodTERYT: string;
    gminaRodzaj: string;
    gminaRodzajKod: string;
    miejscowosc: string;
    miejscowoscKodTERYT: string;
    ulica: string | null;
    ulicaKodTERYT: string | null;
    numerBudynku: string;
    numerLokalu: string;
    kodPocztowy: string;
    geolokalizacja: GeoLocation;
    telefon: string;
    email: string;
    stronaInternetowa: string;
    adresDoKorespondecjiMiejscowosc: string;
    adresDoKorespondecjiUlica: string | null;
    adresDoKorespondecjiNumerBudynku: string;
    adresDoKorespondecjiNumerLokalu: string;
    adresDoKorespondecjiKodPocztowy: string;
    placowkiPodrzedne: any[]; // Could be recursive Institution[], but simplified for now
  }
  
  export interface RspoResponse {
    "@context": string;
    "@id": string;
    "@type": string;
    "hydra:member": Institution[];
  }

  export interface School {
    name: string;
    type: string;
    lat: number;
    lon: number;
    value: number;
  }