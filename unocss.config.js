import { defineConfig, presetIcons, presetUno } from "unocss";

// import presetIcons from "@unocss/preset-icons";
export default defineConfig({
  shortcuts: [
    [
      "btn",
      "px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50",
    ],
    [
      "icon-btn",
      "inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600",
    ],
    ["icon-round", "border-white border rounded-full p-2 inline-block"],
  ],
  presets: [
    presetUno(),
    presetIcons({
      scale: 1,
      warn: true,
    }),
  ],
});
