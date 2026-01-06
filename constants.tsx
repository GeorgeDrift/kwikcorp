
import React from 'react';
import { LayoutGrid, BarChart3, Info, ClipboardCheck, Zap, ShieldCheck, TrendingUp, Leaf, Users, ShoppingCart, Truck } from 'lucide-react';
import { Service, Value } from './types';

export const IMAGES = {
  hero: "https://scontent.fblz1-1.fna.fbcdn.net/v/t39.30808-6/603059749_122094201393187259_5574990911414127814_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&oh=00_AfozxBJ-mrF2SfrURWYOhjc3iSN1XmfInVk1E9C2D5z50Q&oe=69618A02",
  about: "https://scontent.fllw1-1.fna.fbcdn.net/v/t39.30808-6/597929091_122111674929110076_2631308179868286230_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=107&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEhVpdv_qC6Ln4XLpmAc17j220IMLzEDWXbbQgwvMQNZaOuLQEVne9nYIySIGc0xTTt0kRa-XVHLiQWsEZF0H9l&_nc_ohc=fKnq0Y4M1wYQ7kNvwHI1RW6&_nc_oc=Adn7MRAgJ6oeG-xNBsTeaWMUZ_f-y-Hkgrb90K-RhGntGdAP1lbzaI9tGg5SGHV4R-E&_nc_zt=23&_nc_ht=scontent.fllw1-1.fna&_nc_gid=gctzsYlFf7Qq5LxBPsXgpw&oh=00_AfoXmUdB75lpfk8oofLgX1R-A5xbqagMSsON1T13epDTYw&oe=6962FFF7",
  logo: "https://scontent.fllw1-1.fna.fbcdn.net/v/t39.30808-1/603906831_122112186855110076_4671615196328986640_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=111&ccb=1-7&_nc_sid=2d3e12&_nc_eui2=AeFcQ6u2oNVvDjzK00lyVDOlkVwnLkR8UVaRXCcuRHxRVuWqPg4dev2bNTnIV1hVKbyFxsTO1erYQ41ExtWDeMOA&_nc_ohc=a747Sr1UE6MQ7kNvwGB7OmF&_nc_oc=AdmYjvTI-PEEhp4tUiQa4yk-aUyUZgVVkoZI7JYdv-rVzS_Ui0tDSaPy5z5rDVeVX3Y&_nc_zt=24&_nc_ht=scontent.fllw1-1.fna&_nc_gid=o8diduZ4ssfRqiAWRoh_Cg&oh=00_AfrHzcYu1VQc4oDCzaODk9IPX1GG9pB8TURlDx9j4p65jw&oe=6963174A"
};

export const CORE_VALUES: Value[] = [
  { title: "Innovation", description: "Leveraging modern digital tools to solve real agricultural challenges.", icon: "Zap" },
  { title: "Integrity", description: "Building trust through transparency, reliability, and ethical conduct.", icon: "ShieldCheck" },
  { title: "Efficiency", description: "Delivering solutions that save time, reduce costs, and improve outcomes.", icon: "TrendingUp" },
  { title: "Sustainability", description: "Supporting environmentally and economically sustainable agriculture.", icon: "Leaf" },
  { title: "Collaboration", description: "Working closely with farmers, partners, and institutions.", icon: "Users" }
];

export const SERVICES: Service[] = [
  {
    id: "agri-ecommerce",
    title: "Agri Ecommerce",
    shortDescription: "A specialized digital marketplace providing farmers with direct access to high-quality inputs, seeds, and equipment.",
    whoItsFor: "Farmers, input suppliers, and agricultural retail agribusinesses.",
    keyBenefits: ["Lower input costs", "Direct access to suppliers", "Secure digital payments"],
    icon: "ShoppingCart"
  },
  {
    id: "agri-courier",
    title: "Agri Courier & Logistics",
    shortDescription: "Efficient logistics solutions designed to move farm produce from rural areas to urban and regional markets rapidly.",
    whoItsFor: "Commercial farmers, cooperatives, and produce wholesalers.",
    keyBenefits: ["Reduced post-harvest loss", "Timely delivery", "Real-time tracking"],
    icon: "Truck"
  },
  {
    id: "farm-mgmt",
    title: "Digital Farm Management",
    shortDescription: "Digital tools to help manage operations such as crop planning, input usage, and record-keeping.",
    whoItsFor: "Smallholder farmers and commercial operators.",
    keyBenefits: ["Improved planning", "Tracking of inputs", "Operational efficiency"],
    icon: "LayoutGrid"
  },
  {
    id: "data-analytics",
    title: "Data Collection & Analytics",
    shortDescription: "Analysis of agricultural data to support informed decision-making and performance monitoring.",
    whoItsFor: "Farmers, cooperatives, NGOs, and development projects.",
    keyBenefits: ["Data-driven insights", "Productivity assessment", "Evidence-based planning"],
    icon: "BarChart3"
  }
];
