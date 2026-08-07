import { siteAsset } from "@/lib/siteAssets";

export type ProjectFilter = "all" | "ny" | "nj" | "airport" | "bridge" | "residential";

export type Project = {
  id: string;
  name: string;
  location: string;
  filters: ProjectFilter[];
};

/** Services copy aligned with https://www.primerebar.com/ */
export const SERVICES = [
  {
    title: "Rebar Fabrication",
    description:
      "Full-service fabrication to spec with speedy turnaround and competitive pricing.",
  },
  {
    title: "Benders, Cranes",
    description:
      "Precision bending and crane-supported handling for complex jobsite requirements.",
  },
  {
    title: "Owner's quality assurance/control requirements",
    description:
      "Owner’s quality assurance and control requirements met with documented shop standards.",
  },
  {
    title: "Transportation",
    description:
      "Efficient delivery across New York, New Jersey, and the tri-state area.",
  },
  {
    title: "Epoxy coating or galvanizing",
    description:
      "Protective epoxy coating or galvanizing for corrosion-resistant reinforcing steel.",
  },
  {
    title: "Painting, dipping or coating",
    description:
      "Specialty finishing options including painting, dipping, and custom coatings.",
  },
] as const;

/** Shop / services stills shown on the live site. */
export const SERVICE_IMAGES = [
  {
    src: siteAsset("DSC_0224.JPG"),
    alt: "Prime Rebar fabrication shop floor",
  },
  {
    src: siteAsset("WhatsApp Image 2024-07-24 at 9.42.54 AM.jpeg"),
    alt: "Rebar fabrication and handling on site",
  },
  {
    src: siteAsset("DSC_0225.JPG"),
    alt: "Reinforcing steel staged in the shop",
  },
] as const;

/** Fabrication capabilities from https://www.primerebar.com/ */
export const FABRICATION_CAPABILITIES = [
  "bar threading and/or mechanical splices",
  "special bundling and tagging",
  "overlength and overwidth bars",
  "welding",
  "Spirals, spiral spacers and continuous loops",
  "Shearing or bending to special tolerances",
  "Square (saw-cut) ends of reinforcing bars",
  "Beveled ends on bars or ends not otherwise defined",
  "Rebar Detailing",
  "Rebar Takeoff",
  "Quick Turnaround",
  "Quality Shop drawings",
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
    id: "mechanical-couplers",
    label: "Mechanical Couplers",
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
] as const;

export const PROJECTS: Project[] = [
  {
    id: "jfk-t6",
    name: "JFK International Airport Terminal 6",
    location: "Queens, NY",
    filters: ["ny", "airport"],
  },
  {
    id: "jfk-substation",
    name: "JFK Central Substation #2",
    location: "Queens, NY",
    filters: ["ny", "airport"],
  },
  {
    id: "5th-ave-bridge",
    name: "Reconstruction of 5th Avenue Bridge",
    location: "New York, NY",
    filters: ["ny", "bridge"],
  },
  {
    id: "jfk-t5",
    name: "JFK International Airport T5 Gate 30",
    location: "Queens, NY",
    filters: ["ny", "airport"],
  },
  {
    id: "626-newark",
    name: "626 Newark Avenue",
    location: "Jersey City, NJ",
    filters: ["nj", "residential"],
  },
  {
    id: "622-summit",
    name: "622-628 Summit Avenue",
    location: "Jersey City, NJ",
    filters: ["nj", "residential"],
  },
  {
    id: "147-35-95th",
    name: "147-35 95th Avenue",
    location: "New York, NY",
    filters: ["ny", "residential"],
  },
  {
    id: "240-willoughby",
    name: "240 Willoughby Street",
    location: "Brooklyn, NY",
    filters: ["ny", "residential"],
  },
  {
    id: "334-wallabout",
    name: "334 Wallabout St",
    location: "Brooklyn, NY",
    filters: ["ny", "residential"],
  },
  {
    id: "1634-flatbush",
    name: "1634 Flatbush",
    location: "Brooklyn, NY",
    filters: ["ny", "residential"],
  },
  {
    id: "321-main",
    name: "321 Main Street",
    location: "Hackensack, NJ",
    filters: ["nj", "residential"],
  },
  {
    id: "711-montgomery",
    name: "711 Montgomery",
    location: "Jersey City, NJ",
    filters: ["nj", "residential"],
  },
  {
    id: "620-w-153rd",
    name: "620 W 153rd Street",
    location: "New York, NY",
    filters: ["ny", "residential"],
  },
  {
    id: "625-fulton",
    name: "625 Fulton Street",
    location: "Brooklyn, NY",
    filters: ["ny", "residential"],
  },
  {
    id: "69-adams",
    name: "69 Adams Street",
    location: "Brooklyn, NY",
    filters: ["ny", "residential"],
  },
  {
    id: "509-3rd",
    name: "509 3rd Avenue",
    location: "New York, NY",
    filters: ["ny", "residential"],
  },
  {
    id: "249-east-62",
    name: "249 East 62nd Street",
    location: "New York, NY",
    filters: ["ny", "residential"],
  },
  {
    id: "347-flushing",
    name: "347-363 Flushing Ave",
    location: "Brooklyn, NY",
    filters: ["ny", "residential"],
  },
  {
    id: "310-grand",
    name: "310-322 Grand Concourse",
    location: "Bronx, NY",
    filters: ["ny", "residential"],
  },
  {
    id: "200-montague",
    name: "200 Montague Street",
    location: "Brooklyn, NY",
    filters: ["ny", "residential"],
  },
  {
    id: "46-10-70th",
    name: "46-10 70th Street",
    location: "Queens, NY",
    filters: ["ny", "residential"],
  },
  {
    id: "1850-jerome",
    name: "1850 Jerome Ave",
    location: "Bronx, NY",
    filters: ["ny", "residential"],
  },
  {
    id: "113-w-24th",
    name: "113 West 24th Street",
    location: "New York, NY",
    filters: ["ny", "residential"],
  },
  {
    id: "98-08-queens",
    name: "98-08 Queens Boulevard",
    location: "New York, NY",
    filters: ["ny", "residential"],
  },
  {
    id: "198-135th",
    name: "198-200 135th Street",
    location: "Bronx, NY",
    filters: ["ny", "residential"],
  },
  {
    id: "virgin-hotels",
    name: "Virgin Hotels",
    location: "New York, NY",
    filters: ["ny"],
  },
  {
    id: "200-kent",
    name: "200 Kent Avenue",
    location: "Brooklyn, NY",
    filters: ["ny", "residential"],
  },
];

/** Gallery photos from the live site asset pack (public/images/site-files). */
export const GALLERY_IMAGES = [
  { id: "dsc-0003", file: "DSC_0003.JPG", alt: "Rebar fabrication shop" },
  { id: "dsc-0022", file: "DSC_0022.JPG", alt: "Shop floor fabrication" },
  { id: "dsc-0024", file: "DSC_0024.JPG", alt: "Reinforcing steel in process" },
  { id: "dsc-0025", file: "DSC_0025.JPG", alt: "Fabrication equipment and steel" },
  { id: "dsc-0027", file: "DSC_0027.JPG", alt: "Rebar staging and bundling" },
  { id: "dsc-0031", file: "DSC_0031.JPG", alt: "Detail of fabricated rebar" },
  { id: "dsc-0039", file: "DSC_0039.JPG", alt: "Shop production floor" },
  { id: "dsc-0059", file: "DSC_0059.JPG", alt: "Steel reinforcement inventory" },
  { id: "dsc-0060", file: "DSC_0060.JPG", alt: "Fabricated rebar assemblies" },
  { id: "dsc-0066", file: "DSC_0066.JPG", alt: "Bending and cutting work" },
  { id: "dsc-0067", file: "DSC_0067.JPG", alt: "Prime Rebar shop operations" },
  { id: "dsc-0078", file: "DSC_0078.JPG", alt: "Reinforcing bars prepared for delivery" },
  { id: "dsc-0080", file: "DSC_0080.JPG", alt: "Industrial fabrication environment" },
  { id: "dsc-0112", file: "DSC_0112.JPG", alt: "Shop floor steel handling" },
  { id: "dsc-0122", file: "DSC_0122.JPG", alt: "Rebar fabrication detail" },
  { id: "dsc-0132", file: "DSC_0132.JPG", alt: "Fabrication and bundling" },
  { id: "dsc-0133", file: "DSC_0133.JPG", alt: "Close-up reinforcing steel" },
  { id: "dsc-0137", file: "DSC_0137.JPG", alt: "Shop crane and steel stock" },
  { id: "dsc-0138", file: "DSC_0138.JPG", alt: "Rebar production line" },
  { id: "dsc-0142", file: "DSC_0142.JPG", alt: "Finished rebar bundles" },
  { id: "dsc-0156", file: "DSC_0156.JPG", alt: "Fabrication facility interior" },
  { id: "dsc-0168", file: "DSC_0168.JPG", alt: "Steel reinforcement work" },
  { id: "dsc-0175", file: "DSC_0175.JPG", alt: "Shop floor operations" },
  { id: "dsc-0182", file: "DSC_0182.JPG", alt: "Rebar staging area" },
  { id: "dsc-0184", file: "DSC_0184.JPG", alt: "Industrial rebar fabrication" },
  { id: "dsc-0193", file: "DSC_0193.JPG", alt: "Fabricated reinforcing steel" },
  { id: "dsc-0198", file: "DSC_0198.JPG", alt: "Prime Rebar production" },
  { id: "dsc-0206", file: "DSC_0206.JPG", alt: "Shop equipment and steel" },
  { id: "dsc-0219", file: "DSC_0219.JPG", alt: "Rebar ready for transport" },
  { id: "dsc-0224", file: "DSC_0224.JPG", alt: "Prime Rebar fabrication shop floor" },
  { id: "dsc-0225", file: "DSC_0225.JPG", alt: "Reinforcing steel in the shop" },
  { id: "dsc-0227", file: "DSC_0227.JPG", alt: "Full-service fabrication facility" },
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
  {
    id: "wa-942",
    file: "WhatsApp Image 2024-07-24 at 9.42.54 AM.jpeg",
    alt: "Fabrication and delivery staging",
  },
  {
    id: "wa-942-1",
    file: "WhatsApp Image 2024-07-24 at 9.42.54 AM (1).jpeg",
    alt: "Prime Rebar project photo",
  },
  {
    id: "wa-943",
    file: "WhatsApp Image 2024-07-24 at 9.42.55 AM.jpeg",
    alt: "Shop and project atmosphere",
  },
  {
    id: "slab",
    file: "Suspended-Slab-Residential-Block.png",
    alt: "Suspended slab residential rebar detailing",
  },
].map((item) => ({
  id: item.id,
  src: siteAsset(item.file),
  alt: item.alt,
}));

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
