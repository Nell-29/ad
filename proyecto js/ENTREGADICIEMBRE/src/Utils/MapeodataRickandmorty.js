
import { GetAll } from "../services/Rickandmorty.service";

// A través de axios, coge el servicio de la data y lo almacena en un objeto
export const MapeoData = async () => {
  const RawData = await GetAll();
  return RawData.results.map((item) => ({
    name: item.name,
    image: item.image,
  }));
};

