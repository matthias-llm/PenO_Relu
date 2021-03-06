import { SVG_STRING_PER_STRUCTURE } from "../textures/AnatomySvgData.js";
import { useState } from "react";
import { dictPositions } from "../stlviewer";
import * as THREE from "three";
import { controls, scene, theline } from "../stlviewer";

import {
  TOOTH_11,
  TOOTH_12,
  TOOTH_13,
  TOOTH_14,
  TOOTH_15,
  TOOTH_16,
  TOOTH_17,
  TOOTH_18,
} from "../../util/structuresCBCT";
import { IFile } from "../../types/index.js";

type TandenProps = {
  states: any;
  onSwipe: Function;
  file: IFile;
  selectedTooth: String;
  onWisdom: Function;
};

const Tanden = ({
  states,
  onSwipe,
  file,
  selectedTooth,
  onWisdom,
}: TandenProps) => {
  const Swipe = (teeth_id) => {
    onSwipe(teeth_id);
  };

  const [wisDom, setWisdom] = useState<boolean>(true);

  return (
    <div className="pl-4 pt-2 pb-2">
      <button
        className="w-5"
        onClick={() => Swipe("Tooth_18")}
        disabled={wisDom}
      >
        <div className="flex flex-col">
          <svg
            className="h-12 w-5"
            fill="none"
            viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_18].viewbox}
            stroke="currentColor"
            strokeWidth={selectedTooth == "Tooth_18" ? 2 : 1}
            color={selectedTooth == "Tooth_18" ? "red" : "black"}
            strokeDasharray={wisDom ? "2.2" : "0"}
          >
            <path
              className="h-10 w-4"
              d={SVG_STRING_PER_STRUCTURE[TOOTH_18].path[0]}
            />
          </svg>
          <p>18</p>
        </div>
      </button>

      <button className="w-5" onClick={() => Swipe("Tooth_17")}>
        <div className="flex flex-col">
          <svg
            className="h-12 w-5"
            fill="none"
            viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_17].viewbox}
            stroke="currentColor"
            strokeWidth={selectedTooth == "Tooth_17" ? 2 : 1}
            color={selectedTooth == "Tooth_17" ? "red" : "black"}
          >
            <path
              className="h-10 w-4"
              d={SVG_STRING_PER_STRUCTURE[TOOTH_17].path[0]}
            />
          </svg>
          <p>17</p>
        </div>
      </button>

      <button className="w-5" onClick={() => Swipe("Tooth_16")}>
        <div className="flex flex-col">
          <svg
            className="h-12 w-5"
            fill="none"
            viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_16].viewbox}
            stroke="currentColor"
            strokeWidth={selectedTooth == "Tooth_16" ? 2 : 1}
            color={selectedTooth == "Tooth_16" ? "red" : "black"}
          >
            <path
              className="h-10 w-4"
              d={SVG_STRING_PER_STRUCTURE[TOOTH_16].path[0]}
            />
          </svg>
          <p>16</p>
        </div>
      </button>

      <button className="w-5" onClick={() => Swipe("Tooth_15")}>
        <div className="flex flex-col">
          <svg
            className="h-12 w-5"
            fill="none"
            viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_15].viewbox}
            stroke="currentColor"
            strokeWidth={selectedTooth == "Tooth_15" ? 2 : 1}
            color={selectedTooth == "Tooth_15" ? "red" : "black"}
          >
            <path
              className="h-10 w-4"
              d={SVG_STRING_PER_STRUCTURE[TOOTH_15].path[0]}
            />
          </svg>
          <p>15</p>
        </div>
      </button>

      <button className="w-5" onClick={() => Swipe("Tooth_14")}>
        <div className="flex flex-col">
          <svg
            className="h-12 w-5"
            fill="none"
            viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_14].viewbox}
            stroke="currentColor"
            strokeWidth={selectedTooth == "Tooth_14" ? 2 : 1}
            color={selectedTooth == "Tooth_14" ? "red" : "black"}
          >
            <path
              className="h-10 w-4"
              d={SVG_STRING_PER_STRUCTURE[TOOTH_14].path[0]}
            />
          </svg>
          <p>14</p>
        </div>
      </button>

      <button className="w-5" onClick={() => Swipe("Tooth_13")}>
        <div className="flex flex-col">
          <svg
            className="h-12 w-5"
            fill="none"
            viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_13].viewbox}
            stroke="currentColor"
            strokeWidth={selectedTooth == "Tooth_13" ? 2 : 1}
            color={selectedTooth == "Tooth_13" ? "red" : "black"}
          >
            <path
              className="h-10 w-4"
              d={SVG_STRING_PER_STRUCTURE[TOOTH_13].path[0]}
            />
          </svg>
          <p>13</p>
        </div>
      </button>

      <button className="w-5" onClick={() => Swipe("Tooth_12")}>
        <div className="flex flex-col">
          <svg
            className="h-12 w-5"
            fill="none"
            viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_12].viewbox}
            stroke="currentColor"
            strokeWidth={selectedTooth == "Tooth_12" ? 2 : 1}
            color={selectedTooth == "Tooth_12" ? "red" : "black"}
          >
            <path
              className="h-10 w-4"
              d={SVG_STRING_PER_STRUCTURE[TOOTH_12].path[0]}
            />
          </svg>
          <p>12</p>
        </div>
      </button>

      <button className="w-5" onClick={() => Swipe("Tooth_11")}>
        <div className="flex flex-col">
          <svg
            className="h-12 w-5"
            fill="none"
            viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_11].viewbox}
            stroke="currentColor"
            strokeWidth={selectedTooth == "Tooth_11" ? 2 : 1}
            color={selectedTooth == "Tooth_11" ? "red" : "black"}
          >
            <path
              className="h-10 w-4"
              d={SVG_STRING_PER_STRUCTURE[TOOTH_11].path[0]}
            />
          </svg>
          <p>11</p>
        </div>
      </button>
    </div>
  );
};

export default Tanden;
