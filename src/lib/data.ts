export type ProjectFilter = "all" | "ny" | "nj" | "airport" | "bridge" | "residential";

export type Project = {
  id: string;
  name: string;
  location: string;
  filters: ProjectFilter[];
};

export const SERVICES = [
  {
    title: "Rebar Fabrication",
    description:
      "Full-service fabrication to spec with speedy turnaround and competitive pricing.",
  },
  {
    title: "Benders & Cranes",
    description:
      "Precision bending and crane-supported handling for complex jobsite requirements.",
  },
  {
    title: "Quality Assurance",
    description:
      "Owner’s quality assurance and control requirements met with documented shop standards.",
  },
  {
    title: "Transportation",
    description:
      "Efficient delivery across New York, New Jersey, and the tri-state area.",
  },
  {
    title: "Epoxy Coating & Galvanizing",
    description:
      "Protective epoxy coating or galvanizing for corrosion-resistant reinforcing steel.",
  },
  {
    title: "Painting, Dipping & Coating",
    description:
      "Specialty finishing options including painting, dipping, and custom coatings.",
  },
] as const;

export const FABRICATION_CAPABILITIES = [
  "Bar threading and/or mechanical splices",
  "Special bundling and tagging",
  "Overlength and overwidth bars",
  "Welding",
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
      "ASTM A615 Grades: 40, 60, 75 and 80",
      "ASTM A706",
      "Plain Rebar",
      "Epoxy Coated Rebar",
      "Hot Dipped Galvanized Rebar",
      "Stainless Steel Rebar",
      "Fiberglass Rebar",
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

export const GALLERY_IMAGES = [
  {
    id: "g1",
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80",
    alt: "Steel reinforcement and construction site framework",
  },
  {
    id: "g2",
    src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80",
    alt: "Industrial construction crane over steel structure",
  },
  {
    id: "g3",
    src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=80",
    alt: "Fabrication floor with workers handling steel materials",
  },
  {
    id: "g4",
    src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80",
    alt: "Metal workshop and industrial fabrication equipment",
  },
  {
    id: "g5",
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
    alt: "Urban high-rise construction with rebar cages",
  },
  {
    id: "g6",
    src: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1600&q=80",
    alt: "Concrete pour preparation with reinforcing steel",
  },
  {
    id: "g7",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    alt: "Modern steel and glass building under construction",
  },
  {
    id: "g8",
    src: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1600&q=80",
    alt: "Stacked steel materials in an industrial yard",
  },
  {
    id: "g9",
    src: "https://images.unsplash.com/photo-1513828583688-c526ac7c6e0e?auto=format&fit=crop&w=1600&q=80",
    alt: "Bridge and infrastructure construction site",
  },
] as const;

export const PROJECT_FILTERS: { id: ProjectFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ny", label: "NY" },
  { id: "nj", label: "NJ" },
  { id: "airport", label: "Airport" },
  { id: "bridge", label: "Bridge" },
  { id: "residential", label: "Residential" },
];
