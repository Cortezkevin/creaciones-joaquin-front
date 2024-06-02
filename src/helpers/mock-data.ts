import { ICategoryTableCell, ISubCategoryTableCell } from "@/declarations";
import { ICollectionTableCell } from "@/declarations/collection";
import { IProductTableCell } from "@/declarations/product";

export const categories: ICategoryTableCell[] = [
  {
    id: "1",
    name: "Dormitorios",
    url_image: "https://editorialtelevisa.brightspotcdn.com/dims4/default/c1d173f/2147483647/strip/true/crop/1200x676+0+22/resize/1000x563!/quality/90/?url=https%3A%2F%2Fk2-prod-editorial-televisa.s3.us-east-1.amazonaws.com%2Fbrightspot%2Fbf%2F72%2F8fa616b543bc913a0c08a7bb4c40%2Ftendencias-decoracion-de-dormitorio.jpg"
  },
  {
    id: "2",
    name: "Comedores",
    url_image: "https://colineal.pe/cdn/shop/articles/comedor-moderno_800x.jpg?v=1687876226"
  },
  {
    id: "3",
    name: "Salas",
    url_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfgjUuyf7VUt7oLN81TvnjEG2Jv_UTlcWXY7ABcVA0CA&s"
  },
  {
    id: "4",
    name: "GAGAGA",
    url_image: "https://editorialtelevisa.brightspotcdn.com/dims4/default/c1d173f/2147483647/strip/true/crop/1200x676+0+22/resize/1000x563!/quality/90/?url=https%3A%2F%2Fk2-prod-editorial-televisa.s3.us-east-1.amazonaws.com%2Fbrightspot%2Fbf%2F72%2F8fa616b543bc913a0c08a7bb4c40%2Ftendencias-decoracion-de-dormitorio.jpg"
  }
];

export const subcategories: ISubCategoryTableCell[] = [
  {
    id: "1",
    name: "Camas",
    description: "Las camas son el lugar ideal para el descanso. Descubre aquí variedad de tamaños y diseños",
    url_image: "https://editorialtelevisa.brightspotcdn.com/dims4/default/c1d173f/2147483647/strip/true/crop/1200x676+0+22/resize/1000x563!/quality/90/?url=https%3A%2F%2Fk2-prod-editorial-televisa.s3.us-east-1.amazonaws.com%2Fbrightspot%2Fbf%2F72%2F8fa616b543bc913a0c08a7bb4c40%2Ftendencias-decoracion-de-dormitorio.jpg"
  },
  {
    id: "2",
    name: "Almohadas",
    description: "Las almohadas son el lugar ideal para el descanso. Descubre aquí variedad de tamaños y diseños",
    url_image: "https://colineal.pe/cdn/shop/articles/comedor-moderno_800x.jpg?v=1687876226"
  },
  {
    id: "3",
    name: "Colchones",
    description: "Los colchones son el lugar ideal para el descanso. Descubre aquí variedad de tamaños y diseños",
    url_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfgjUuyf7VUt7oLN81TvnjEG2Jv_UTlcWXY7ABcVA0CA&s"
  }
];

export const collections: ICollectionTableCell[] = [
  {
    id: "1",
    name: "Dormitorio",
    url_image: "https://editorialtelevisa.brightspotcdn.com/dims4/default/c1d173f/2147483647/strip/true/crop/1200x676+0+22/resize/1000x563!/quality/90/?url=https%3A%2F%2Fk2-prod-editorial-televisa.s3.us-east-1.amazonaws.com%2Fbrightspot%2Fbf%2F72%2F8fa616b543bc913a0c08a7bb4c40%2Ftendencias-decoracion-de-dormitorio.jpg"
  }
]

export const products: IProductTableCell[] = [
  {
    id: "1",
    name: "Colchon Paraiso",
    description: "Los colchones son el lugar ideal para el descanso. Descubre aquí variedad de tamaños y diseños",
    price: "10.00",
    stock: 10,
    url_images: [
      "https://editorialtelevisa.brightspotcdn.com/dims4/default/c1d173f/2147483647/strip/true/crop/1200x676+0+22/resize/1000x563!/quality/90/?url=https%3A%2F%2Fk2-prod-editorial-televisa.s3.us-east-1.amazonaws.com%2Fbrightspot%2Fbf%2F72%2F8fa616b543bc913a0c08a7bb4c40%2Ftendencias-decoracion-de-dormitorio.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfgjUuyf7VUt7oLN81TvnjEG2Jv_UTlcWXY7ABcVA0CA&s"
    ]
  }
]