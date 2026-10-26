import {
  galleryJpg,
  galleryVideo,
  galleryWebp,
  projectPhoto,
  siteAsset,
} from "@/lib/siteAssets";

export type ProjectFilter = "all" | "ny" | "nj" | "airport" | "bridge" | "residential";

export type Project = {
  id: string;
  name: string;
  location: string;
  filters: ProjectFilter[];
  year?: number;
  scope?: string;
  tons?: number;
  barSizes?: string;
  coatings?: string;
  services?: string[];
  photo?: string;
};

/** Services copy aligned with https://www.primerebar.com/ */
export const SERVICES = [
  {
    title: "Rebar Fabrication",
    description:
      "Full-service fabrication to spec with speedy turnaround and competitive pricing.",
  },
  {
    title: "Benders and Cranes",
    description:
      "Precision bending and crane-supported handling for complex jobsite requirements.",
  },
  {
    title: "Owner's Quality Assurance/Control Requirements",
    description:
      "Owner's quality assurance and control requirements met with documented shop standards.",
  },
  {
    title: "Transportation",
    description:
      "Efficient delivery across New York, New Jersey, and the tri-state area.",
  },
  {
    title: "Epoxy Coating or Galvanizing",
    description:
      "Protective epoxy coating or galvanizing for corrosion-resistant reinforcing steel.",
  },
  {
    title: "Painting, Dipping, or Coating",
    description:
      "Specialty finishing options including painting, dipping, and custom coatings.",
  },
] as const;

/** Shop / services stills shown on the live site. */
export const SERVICE_IMAGES = [
  {
    src: siteAsset("DSC_0225.JPG"),
    alt: "Reinforcing steel staged in the shop",
  },
] as const;

/** Fabrication capabilities from https://www.primerebar.com/ */
export const FABRICATION_CAPABILITIES = [
  "Bar threading and/or mechanical splices",
  "Special bundling and tagging",
  "Overlength and overwidth bars",
  "Welding",
  "Spirals, spiral spacers, and continuous loops",
  "Shearing or bending to special tolerances",
  "Square (saw-cut) ends of reinforcing bars",
  "Beveled ends on bars or ends not otherwise defined",
  "Rebar Detailing",
  "Rebar Takeoff",
  "Quick Turnaround",
  "Quality Shop Drawings",
] as const;

export const PRODUCT_CATEGORIES = [
  {
    id: "reinforcing-steel",
    label: "Reinforcing Steel",
    items: [
      "ASTM A615 Grades: 60, 80 and 100",
      "ASTM A706",
      "Epoxy Coated Rebar",
      "Hot Dipped Galvanized Rebar",
    ],
  },
  {
    id: "bar-supports",
    label: "Bar Supports",
    items: [
      "Plain Steel",
      "All Plastic",
      "Epoxy Coated",
      "Plastic Tipped",
      "Individual Chairs",
      "Continuous",
    ],
  },
  {
    id: "rebar-assemblies",
    label: "Rebar Assemblies",
    items: ["Flat Mats", "Radius Mats", "Cages"],
  },
  {
    id: "couplers",
    label: "Couplers",
    items: [
      "Standard Threaded Couplers",
      "Form Saver Couplers with Flange",
      "End Anchors",
      "Positional Couplers",
      "Weldable Couplers",
      "Bar Lock Couplers",
    ],
  },
  {
    id: "wire-mesh",
    label: "Wire Mesh",
    items: [
      "Standard Building Mesh W1.4 (10 ga)",
      "Epoxy Coated Mesh",
      "Galvanized Mesh",
      "Structural Welded Wire Mesh available upon request",
    ],
  },
  {
    id: "chairs",
    label: "Chairs",
    items: [
      "Individual Chairs",
      "Continuous",
      "Plain Steel",
      "All Plastic",
      "Epoxy Coated",
      "Plastic Tipped",
    ],
  },
] as const;

export const PROJECTS: Project[] = [
  {
    id: "jfk-t6",
    name: "JFK International Airport Terminal 6",
    location: "Queens, NY",
    filters: ["ny", "airport"],
    photo: projectPhoto("jfk-t6"),
    tons: 3245,
  },
  {
    id: "jfk-substation",
    name: "JFK Central Substation #2",
    location: "Queens, NY",
    filters: ["ny", "airport"],
    photo: projectPhoto("jfk-substation"),
    tons: 76,
  },
  {
    id: "5th-ave-bridge",
    name: "Reconstruction of 5th Avenue Bridge",
    location: "New York, NY",
    filters: ["ny", "bridge"],
    photo: projectPhoto("5th-ave-bridge"),
    tons: 115,
  },
  {
    id: "jfk-t5",
    name: "JFK International Airport T5 Gate 30",
    location: "Queens, NY",
    filters: ["ny", "airport"],
    photo: projectPhoto("jfk-t5"),
  },
  {
    id: "626-newark",
    name: "626 Newark Avenue",
    location: "Jersey City, NJ",
    filters: ["nj", "residential"],
    tons: 2069,
    photo: projectPhoto("626-newark"),
  },
  {
    id: "622-summit",
    name: "622-628 Summit Avenue",
    location: "Jersey City, NJ",
    filters: ["nj", "residential"],
    tons: 1200,
    photo: projectPhoto("622-summit"),
  },
  {
    id: "147-35-95th",
    name: "147-35 95th Avenue",
    location: "New York, NY",
    filters: ["ny", "residential"],
    tons: 2594,
    photo: projectPhoto("147-35-95th"),
  },
  {
    id: "240-willoughby",
    name: "240 Willoughby Street",
    location: "Brooklyn, NY",
    filters: ["ny", "residential"],
    tons: 1426,
    photo: projectPhoto("240-willoughby"),
  },
  {
    id: "334-wallabout",
    name: "334 Wallabout St",
    location: "Brooklyn, NY",
    filters: ["ny", "residential"],
    tons: 1303,
    photo: projectPhoto("334-wallabout"),
  },
  {
    id: "1634-flatbush",
    name: "1634 Flatbush",
    location: "Brooklyn, NY",
    filters: ["ny", "residential"],
    tons: 1018,
    photo: projectPhoto("1634-flatbush"),
  },
  {
    id: "321-main",
    name: "321 Main Street",
    location: "Hackensack, NJ",
    filters: ["nj", "residential"],
    tons: 1116,
    photo: projectPhoto("321-main"),
  },
  {
    id: "711-montgomery",
    name: "711 Montgomery",
    location: "Jersey City, NJ",
    filters: ["nj", "residential"],
    tons: 1880,
    photo: projectPhoto("711-montgomery"),
  },
  {
    id: "620-w-153rd",
    name: "620 W 153rd Street",
    location: "New York, NY",
    filters: ["ny", "residential"],
    tons: 1203,
    photo: projectPhoto("620-w-153rd"),
  },
  {
    id: "625-fulton",
    name: "625 Fulton Street",
    location: "Brooklyn, NY",
    filters: ["ny", "residential"],
    tons: 5909,
    photo: projectPhoto("625-fulton"),
  },
  {
    id: "69-adams",
    name: "69 Adams Street",
    location: "Brooklyn, NY",
    filters: ["ny", "residential"],
    tons: 1383,
    photo: projectPhoto("69-adams"),
  },
  {
    id: "509-3rd",
    name: "509 3rd Avenue",
    location: "New York, NY",
    filters: ["ny", "residential"],
    tons: 1466,
    photo: projectPhoto("509-3rd"),
  },
  {
    id: "249-east-62",
    name: "249 East 62nd Street",
    location: "New York, NY",
    filters: ["ny", "residential"],
    tons: 1028,
    photo: projectPhoto("249-east-62"),
  },
  {
    id: "347-flushing",
    name: "347-363 Flushing Ave",
    location: "Brooklyn, NY",
    filters: ["ny", "residential"],
    tons: 1816,
    photo: projectPhoto("347-flushing"),
  },
  {
    id: "310-grand",
    name: "310-322 Grand Concourse",
    location: "Bronx, NY",
    filters: ["ny", "residential"],
    tons: 1973,
    photo: projectPhoto("310-grand"),
  },
  {
    id: "200-montague",
    name: "200 Montague Street",
    location: "Brooklyn, NY",
    filters: ["ny", "residential"],
    tons: 1008,
    photo: projectPhoto("200-montague"),
  },
  {
    id: "46-10-70th",
    name: "46-10 70th Street",
    location: "Queens, NY",
    filters: ["ny", "residential"],
    tons: 2214,
    photo: projectPhoto("46-10-70th"),
  },
  {
    id: "1850-jerome",
    name: "1850 Jerome Ave",
    location: "Bronx, NY",
    filters: ["ny", "residential"],
    tons: 1907,
    photo: projectPhoto("1850-jerome"),
  },
  {
    id: "113-w-24th",
    name: "113 West 24th Street",
    location: "New York, NY",
    filters: ["ny", "residential"],
    tons: 1037,
    photo: projectPhoto("113-w-24th"),
  },
  {
    id: "98-08-queens",
    name: "98-08 Queens Boulevard",
    location: "New York, NY",
    filters: ["ny", "residential"],
    tons: 1246,
    photo: projectPhoto("98-08-queens"),
  },
  {
    id: "198-135th",
    name: "198-200 135th Street",
    location: "Bronx, NY",
    filters: ["ny", "residential"],
    tons: 2663,
    photo: projectPhoto("198-135th"),
  },
  {
    id: "virgin-hotels",
    name: "Virgin Hotels",
    location: "New York, NY",
    filters: ["ny"],
    tons: 1678,
    photo: projectPhoto("virgin-hotels"),
  },
  {
    id: "200-kent",
    name: "200 Kent Avenue",
    location: "Brooklyn, NY",
    filters: ["ny", "residential"],
    tons: 1236,
    photo: projectPhoto("200-kent"),
  },
];

export type GalleryItem = {
  id: string;
  alt: string;
  src: string;
  kind: "image" | "video";
  webp?: string;
  poster?: string;
};

const GALLERY_STILLS_HEAD: { id: string; file: string; alt: string }[] = [
  { id: "dsc-0003", file: "DSC_0003.JPG", alt: "Rebar fabrication shop" },
  { id: "dsc-0022", file: "DSC_0022.JPG", alt: "Shop floor fabrication" },
  { id: "dsc-0024", file: "DSC_0024.JPG", alt: "Reinforcing steel in process" },
];

const GALLERY_STILLS_REST: { id: string; file: string; alt: string }[] = [
  { id: "dsc-0025", file: "DSC_0025.JPG", alt: "Fabrication equipment and steel" },
  { id: "dsc-0027", file: "DSC_0027.JPG", alt: "Rebar staging and bundling" },
  { id: "dsc-0132", file: "DSC_0132.JPG", alt: "Fabrication and bundling" },
  { id: "dsc-0138", file: "DSC_0138.JPG", alt: "Rebar production line" },
  { id: "dsc-0142", file: "DSC_0142.JPG", alt: "Finished rebar bundles" },
  { id: "dsc-0156", file: "DSC_0156.JPG", alt: "Fabrication facility interior" },
  { id: "dsc-0168", file: "DSC_0168.JPG", alt: "Steel reinforcement work" },
  { id: "dsc-0175", file: "DSC_0175.JPG", alt: "Shop floor operations" },
  { id: "dsc-0182", file: "DSC_0182.JPG", alt: "Rebar staging area" },
  { id: "dsc-0184", file: "DSC_0184.JPG", alt: "Industrial rebar fabrication" },
  { id: "dsc-0193", file: "DSC_0193.JPG", alt: "Fabricated reinforcing steel" },
  {
    id: "wa-939-1",
    file: "WhatsApp Image 2024-07-24 at 9.39.46 AM (1).jpeg",
    alt: "Jobsite rebar installation",
  },
  {
    id: "wa-939-2",
    file: "WhatsApp Image 2024-07-24 at 9.39.46 AM (2).jpeg",
    alt: "Construction site reinforcing steel",
  },
  {
    id: "wa-939-3",
    file: "WhatsApp Image 2024-07-24 at 9.39.46 AM (3).jpeg",
    alt: "Rebar cage on site",
  },
  {
    id: "wa-939-4",
    file: "WhatsApp Image 2024-07-24 at 9.39.46 AM (4).jpeg",
    alt: "Urban construction reinforcing work",
  },
  {
    id: "wa-939-5",
    file: "WhatsApp Image 2024-07-24 at 9.39.46 AM (5).jpeg",
    alt: "Jobsite steel reinforcement",
  },
  {
    id: "wa-939-6",
    file: "WhatsApp Image 2024-07-24 at 9.39.46 AM (6).jpeg",
    alt: "Rebar placement on project",
  },
  {
    id: "wa-939-8",
    file: "WhatsApp Image 2024-07-24 at 9.39.46 AM (8).jpeg",
    alt: "Field reinforcing steel",
  },
];

function galleryStill(item: { id: string; file: string; alt: string }): GalleryItem {
  return {
    id: item.id,
    alt: item.alt,
    kind: "image",
    src: siteAsset(item.file),
    webp: galleryWebp(item.id),
  };
}

const YARD_STILLS: { id: string; alt: string }[] = [
  {
    id: "yard-docks-3-4",
    alt: "Prime Rebar Swedesboro yard, docks 3–4",
  },
  {
    id: "yard-docks-1-3",
    alt: "Prime Rebar fabrication docks 1–3",
  },
];

const SERVICE_GALLERY_STILLS: { id: string; file: string; alt: string }[] = [
  {
    id: "dsc-0224",
    file: "DSC_0224.JPG",
    alt: "Coiled fabricated rebar",
  },
];

/** Gallery media: looping yard demo, then shop/jobsite stills. */
export const GALLERY_IMAGES: GalleryItem[] = [
  {
    id: "yard-demo",
    alt: "Prime Rebar Swedesboro fabrication yard",
    kind: "video",
    src: galleryVideo("prime-rebar-9-28-26.mp4"),
    poster: galleryJpg("yard-docks-3-4"),
  },
  ...GALLERY_STILLS_HEAD.map(galleryStill),
  ...YARD_STILLS.map((item) => ({
    id: item.id,
    alt: item.alt,
    kind: "image" as const,
    src: galleryJpg(item.id),
    webp: galleryWebp(item.id),
  })),
  ...GALLERY_STILLS_REST.map(galleryStill),
  ...SERVICE_GALLERY_STILLS.map(galleryStill),
];

/** Atmospheric stills for the fabrication reel (from site-files). */
export const FABRICATION_FRAMES = [
  {
    src: siteAsset("DSC_0224.JPG"),
    alt: "Prime Rebar fabrication shop floor",
  },
  {
    src: siteAsset("DSC_0225.JPG"),
    alt: "Reinforcing steel staged in the shop",
  },
  {
    src: siteAsset("DSC_0137.JPG"),
    alt: "Shop crane and steel stock",
  },
  {
    src: siteAsset("DSC_0003.JPG"),
    alt: "Rebar fabrication operations",
  },
  {
    src: siteAsset("WhatsApp Image 2024-07-24 at 9.39.46 AM (3).jpeg"),
    alt: "Jobsite rebar cage",
  },
] as const;

export const ABOUT_IMAGES = {
  primary: siteAsset("DSC_0224.JPG"),
  secondary: siteAsset("DSC_0031.JPG"),
  stats: siteAsset("DSC_0227.JPG"),
  detailing: siteAsset("Suspended-Slab-Residential-Block.png"),
} as const;

export const PROJECT_FILTERS: { id: ProjectFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ny", label: "NY" },
  { id: "nj", label: "NJ" },
  { id: "airport", label: "Airport" },
  { id: "bridge", label: "Bridge" },
  { id: "residential", label: "Residential" },
];
