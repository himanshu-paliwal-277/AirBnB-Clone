import garden_icon from "../assets/icons/facilities/garden-view-icon.svg";
import Kitchen_icon from "../assets/icons/facilities/kitchen-icon.svg";
import wifi_icon from "../assets/icons/facilities/wifi-icon.svg";
import workspace_icon from "../assets/icons/facilities/workspace-icon.svg";
import car from "../assets/icons/facilities/car.svg";
import pool from "../assets/icons/facilities/pool.svg";
import pet from "../assets/icons/facilities/pet.svg";
import camera from "../assets/icons/facilities/camera.svg";
import alarm_1 from "../assets/icons/facilities/alarm-1.svg";
import alarm_2 from "../assets/icons/facilities/alarm-2.svg";


export const facilities = [
  { name: "Garden view", icon: garden_icon, available: true },
  { name: "Kitchen", icon: Kitchen_icon, available: true },
  { name: "Wifi", icon: wifi_icon, available: true },
  { name: "Dedicated workspace", icon: workspace_icon, available: true },
  { name: "Free parking on premises", icon: car, available: true },
  {
    name: "Private outdoor pool – available all year, open specific hours",
    icon: pool,
    available: true,
  },
  { name: "Pets allowed", icon: pet, available: true },
  { name: "Exterior security cameras on property", icon: camera, available: true },
  { name: "Carbon monoxide alarm", icon: alarm_1, available: false },
  { name: "Smoke alarm", icon: alarm_2, available: false },
];
